import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;

// Read careers.ts
const careersFilePath = path.join(process.cwd(), 'src/data/careers.ts');
let careersCode = fs.readFileSync(careersFilePath, 'utf-8');

// We will extract the career names to process
const nameRegex = /"name":\s*"([^"]+)"/g;
const careers = [];
let match;
while ((match = nameRegex.exec(careersCode)) !== null) {
  careers.push(match[1]);
}

console.log(`Found ${careers.length} careers to process.`);

async function generateSalaryData(careerNames, retries = 3) {
  const prompt = `You are a labor market analyst. For the following careers, provide realistic financial reward data based on the US market (in USD).
Return ONLY a valid JSON object where the keys are the exact career names provided and the values match this exact schema:
{
  "tier": "Low" | "Moderate" | "High" | "Exceptional",
  "starting_salary": "e.g. $50k - $70k",
  "average_salary": "e.g. $90k - $120k",
  "highest_salary": "e.g. $250k+",
  "trajectory": "1 sentence describing the earnings growth trajectory"
}

Careers to process:
${careerNames.join(', ')}

Output ONLY the raw JSON object. Do not wrap in markdown or \`\`\`json blocks.`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]) {
        throw new Error("No candidates in response");
      }
      const text = data.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (e) {
      console.log(`Retry ${i + 1}/${retries} failed for batch: ${e.message}`);
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

async function run() {
  const batchSize = 5;
  for (let i = 0; i < careers.length; i += batchSize) {
    const batch = careers.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1}...`);
    try {
      const results = await generateSalaryData(batch);
      
      // Inject back into careersCode
      for (const [careerName, data] of Object.entries(results)) {
        // Find the block for this career
        const nameBlock = `"name": "${careerName}",`;
        let index = careersCode.indexOf(nameBlock);
        if (index === -1) continue;
        
        // Find the end of this career's object (approximate by looking for time_to_first_payment block)
        const timeToFirstPayIndex = careersCode.indexOf('"time_to_first_payment":', index);
        if (timeToFirstPayIndex !== -1) {
          // Find the closing brace of time_to_first_payment
          let braceCount = 0;
          let endIndex = -1;
          for (let j = timeToFirstPayIndex; j < careersCode.length; j++) {
            if (careersCode[j] === '{') braceCount++;
            if (careersCode[j] === '}') {
              braceCount--;
              if (braceCount === 0) {
                endIndex = j + 1;
                break;
              }
            }
          }
          
          if (endIndex !== -1 && !careersCode.substring(index, endIndex + 50).includes('"financial_reward":')) {
            const insertion = `,\n    "financial_reward": {\n      "tier": "${data.tier}",\n      "starting_salary": "${data.starting_salary}",\n      "average_salary": "${data.average_salary}",\n      "highest_salary": "${data.highest_salary}",\n      "trajectory": "${data.trajectory.replace(/"/g, '\\"')}"\n    }`;
            careersCode = careersCode.slice(0, endIndex) + insertion + careersCode.slice(endIndex);
          }
        }
      }
      
      // Save progress after each batch
      fs.writeFileSync(careersFilePath, careersCode);
      console.log(`Batch ${i / batchSize + 1} saved.`);
      
      // Rate limit wait
      await new Promise(r => setTimeout(r, 4000));
    } catch (err) {
      console.error(`Error processing batch:`, err);
    }
  }
  
  console.log('All done!');
}

run();
