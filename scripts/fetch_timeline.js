const fs = require('fs');
const path = require('path');
const API_KEY = "YOUR_API_KEY";

async function generatePaymentData(careerName) {
  const prompt = `You are a career data expert. Provide realistic financial runway data for the career: "${careerName}".
This represents the time it takes for a beginner with zero knowledge to receive their first payment in this career.
Return ONLY valid JSON matching this schema:
{
  "estimate": "e.g. 6-12 Months, 7-10 Years",
  "runway_demand": "Low" | "Moderate" | "High" | "Extreme" | "Unpredictable",
  "gatekeeper": "The hardest hurdle before earning money (1 sentence)",
  "milestones": [
    { "phase": "Phase name", "duration": "e.g. 3-6 months" }
  ]
}
Include exactly 3-4 milestones summing up to the estimate.`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 }
        })
      });
      const data = await res.json();
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No candidates returned from API (Rate limit or Safety).");
      }
      const text = data.candidates[0].content.parts[0].text;
      const cleaned = text.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.warn(`Attempt ${attempt} failed: ${e.message}`);
      if (attempt === 3) throw e;
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

async function main() {
  const tsData = fs.readFileSync('src/data/careers.ts', 'utf8');
  const progressPath = path.join(process.cwd(), 'careers_progress.json');
  let careers = [];
  if (fs.existsSync(progressPath)) {
     careers = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
  }
  
  if (careers.length === 0) {
     const match = tsData.match(/export const careers:\s*Career\[\]\s*=\s*(\[[\s\S]*\]);/);
     if (match) {
        careers = eval(match[1]);
     }
  }

  let modified = false;
  
  // Find which ones need generation
  const needsGeneration = careers.filter(c => !c.time_to_first_payment);
  
  console.log(`Found ${needsGeneration.length} careers needing timeline data.`);
  
  // Process sequentially to avoid 429
  for (let i = 0; i < needsGeneration.length; i++) {
    const career = needsGeneration[i];
    console.log(`Generating for: ${career.name} (${i + 1}/${needsGeneration.length})...`);
    try {
      const paymentData = await generatePaymentData(career.name);
      if (paymentData) {
        career.time_to_first_payment = paymentData;
        modified = true;
        fs.writeFileSync(progressPath, JSON.stringify(careers, null, 2));
      }
    } catch (err) {
      console.error(`Failed on ${career.name}:`, err.message);
    }
    await new Promise(r => setTimeout(r, 4000)); // 4s wait
  }

  if (modified) {
    const fileContent = 'import { Career } from "./types";\n\nexport const careers: Career[] = ' + JSON.stringify(careers, null, 2) + ';\n';
    fs.writeFileSync(path.join(process.cwd(), 'src/data/careers.ts'), fileContent, 'utf-8');
    console.log("Successfully updated src/data/careers.ts");
  } else {
    console.log("No careers needed updating.");
  }
}

main();
