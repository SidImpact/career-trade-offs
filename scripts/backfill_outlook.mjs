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

async function generateOutlookData(careerNames, retries = 3) {
  const prompt = `You are a labor market analyst. For the following careers, provide realistic future outlook data based on the US market.
Return ONLY a valid JSON object where the keys are the exact career names provided and the values match this exact schema:
{
  "ai_risk": "Low" | "Moderate" | "High" | "Extreme",
  "job_growth": "e.g. Much faster than average (+14%)",
  "market_reality": "1-2 sentence blunt summary of how hard it is to get hired right now and keep the job."
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
      await new Promise(r => setTimeout(r, 6000));
    }
  }
}

async function run() {
  // We need to parse which careers are missing market_outlook based on the file content
  const missingCareers = [];
  for (const careerName of careers) {
    const nameBlock = `"name": "${careerName}",`;
    let index = careersCode.indexOf(nameBlock);
    if (index !== -1) {
      // Check the next 8000 characters for market_outlook
      if (!careersCode.substring(index, index + 8000).includes('"market_outlook":')) {
        missingCareers.push(careerName);
      }
    }
  }

  console.log(`Found ${missingCareers.length} careers missing market_outlook.`);
  
  const batchSize = 3;
  for (let i = 0; i < missingCareers.length; i += batchSize) {
    const batch = missingCareers.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}... (${batch.join(', ')})`);
    try {
      const results = await generateOutlookData(batch);
      
      // Inject back into careersCode
      for (const [careerName, data] of Object.entries(results)) {
        const nameBlock = `"name": "${careerName}",`;
        let index = careersCode.indexOf(nameBlock);
        if (index === -1) continue;
        
        // Find the end of this career's object (approximate by looking for financial_reward block)
        const blockIndex = careersCode.indexOf('"financial_reward":', index);
        if (blockIndex !== -1) {
          // Find the closing brace
          let braceCount = 0;
          let endIndex = -1;
          for (let j = blockIndex; j < careersCode.length; j++) {
            if (careersCode[j] === '{') braceCount++;
            if (careersCode[j] === '}') {
              braceCount--;
              if (braceCount === 0) {
                endIndex = j + 1;
                break;
              }
            }
          }
          
          if (endIndex !== -1 && !careersCode.substring(index, endIndex + 50).includes('"market_outlook":')) {
            const insertion = `,\n    "market_outlook": {\n      "ai_risk": "${data.ai_risk}",\n      "job_growth": "${data.job_growth.replace(/"/g, '\\"')}",\n      "market_reality": "${data.market_reality.replace(/"/g, '\\"')}"\n    }`;
            careersCode = careersCode.slice(0, endIndex) + insertion + careersCode.slice(endIndex);
          }
        }
      }
      
      fs.writeFileSync(careersFilePath, careersCode);
      console.log(`Batch ${Math.floor(i / batchSize) + 1} saved.`);
      
      await new Promise(r => setTimeout(r, 8000));
    } catch (err) {
      console.error(`Error processing batch:`, err);
    }
  }
  
  console.log('All done!');
}

run();
