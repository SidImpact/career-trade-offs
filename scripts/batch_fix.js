const fs = require('fs');

async function run() {
  let fileContent = fs.readFileSync('src/data/careers.ts', 'utf8');
  const apiKey = "YOUR_API_KEY";

  // Regex to match a full career block. We look for ones containing (Simulated Analysis)
  const regex = /\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"[\s\S]*?"description":\s*"\([^)]*\)\s*.*?"[\s\S]*?"Uncertainty":\s*\d+\s*\}/g;
  
  let match;
  let replacements = [];

  while ((match = regex.exec(fileContent)) !== null) {
    const fullBlock = match[0];
    const id = match[1];
    const name = match[2];
    
    console.log(`Generating profile for: ${name} (${id})`);
    
    const prompt = `You are an expert career and labor market analyst. Analyze the career: "${name}".
Return a strictly valid JSON object representing its Trade-Off profile with realistic struggle ratings from 1 to 5 (1=Very Low, 2=Low, 3=Moderate, 4=High, 5=Very High).
Output ONLY the JSON object, without any markdown formatting, backticks, or intro/outro comments.

JSON schema:
{
  "id": "${id}",
  "name": "${name}",
  "category": "Appropriate industry category (e.g., Technology, Healthcare, Finance, Creative & Media, Engineering, Law, Education, Aviation, etc.)",
  "description": "2-3 sentences realistic overview of the career, what it involves, and its general market context.",
  "upside_summary": [
    "Compelling upside 1",
    "Compelling upside 2",
    "Compelling upside 3"
  ],
  "hidden_cost": {
    "description": "1-2 sentences explaining the major unspoken sacrifice or price of this career.",
    "struggles": [
      "Realistic specific struggle 1",
      "Realistic specific struggle 2",
      "Realistic specific struggle 3",
      "Realistic specific struggle 4"
    ]
  },
  "who_may_thrive": [
    "Personality/skill trait 1",
    "Personality/skill trait 2",
    "Personality/skill trait 3"
  ],
  "who_may_struggle": [
    "Personality/preference trait 1",
    "Personality/preference trait 2",
    "Personality/preference trait 3"
  ],
  "struggles": {
    "Mental Fatigue": 1-5,
    "Continuous Learning": 1-5,
    "Decision Pressure": 1-5,
    "Complexity": 1-5,
    "Concentration Demand": 1-5,
    "Long Hours": 1-5,
    "Irregular Schedule": 1-5,
    "Work-Life Disruption": 1-5,
    "Physical Strain": 1-5,
    "Screen Fatigue": 1-5,
    "Isolation": 1-5,
    "Public Interaction": 1-5,
    "Income Instability": 1-5,
    "Emotional Stress": 1-5,
    "Uncertainty": 1-5
  }
}`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 }
        })
      });
      
      if (!res.ok) {
         console.error(`Failed for ${name}: ${res.status}`);
         continue;
      }
      
      const data = await res.json();
      let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResponse) {
        textResponse = textResponse.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
        
        // Pretty print the JSON so it looks nice in the file
        const parsed = JSON.parse(textResponse);
        // Force the output to have the standard formatting (4 space indent to match file? file uses 2 space indent inside the object. Wait, the object is at indent level 2, so its properties should be indent level 4. Let's just indent it properly.)
        let newBlock = JSON.stringify(parsed, null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n');
        
        replacements.push({ oldBlock: fullBlock, newBlock: newBlock });
        console.log(`✅ Success for ${name}`);
      }
    } catch (e) {
      console.error(`Error processing ${name}:`, e.message);
    }
  }

  // Apply all replacements
  for (const r of replacements) {
    fileContent = fileContent.replace(r.oldBlock, r.newBlock);
  }

  fs.writeFileSync('src/data/careers.ts', fileContent, 'utf8');
  console.log(`Updated ${replacements.length} careers!`);
}

run();
