const fs = require('fs');
const path = require('path');

const careersList = [
  "Doctor", "Software Engineer", "Lawyer", "Entrepreneur", "Teacher",
  "Chartered Accountant", "Civil Servant", "Police Officer",
  "Engineer", "Data Scientist", "Financial Analyst", "Investment Banker",
  "Banker", "Accountant", "Architect", "Commercial Airline Pilot", "Nurse",
  "Psychologist", "Scientist", "Professor", "Journalist", "Graphic Designer",
  "UX/UI Designer", "Product Manager", "Marketing Manager", "Sales Manager",
  "Consultant", "Business Manager", "Economist", "Researcher", "Pharmacist",
  "Dentist", "Veterinarian", "Physiotherapist", "Content Creator",
  "Author", "Photographer", "Filmmaker", "Actor", "Musician",
  "Professional Athlete", "Chef", "News Anchor", "Air Traffic Controller",
  "Cybersecurity Specialist", "AI Engineer", "Cloud Engineer",
  "Web Developer", "Game Developer"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateCareers() {
  let generatedCareers = [];
  const progressFile = path.join(process.cwd(), 'careers_progress.json');
  
  if (fs.existsSync(progressFile)) {
    generatedCareers = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    console.log('Resuming from ' + generatedCareers.length + ' careers...');
  }

  const apiKey = "YOUR_API_KEY";
  
  // Use models in a round-robin to avoid rate limit if they have separate quotas
  const models = ['gemini-3.5-flash', 'gemini-2.5-flash'];
  let currentModelIdx = 0;

  for (let i = generatedCareers.length; i < careersList.length; i++) {
    const jobTitle = careersList[i];
    const id = jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const prompt = `You are an expert career and labor market analyst. Analyze the career: "${jobTitle}".
Return a strictly valid JSON object representing its Trade-Off profile with realistic struggle ratings from 1 to 5 (1=Very Low, 2=Low, 3=Moderate, 4=High, 5=Very High).
Output ONLY the JSON object, without any markdown formatting, backticks, or intro/outro comments.

JSON schema:
{
  "id": "${id}",
  "name": "${jobTitle}",
  "category": "Appropriate industry category",
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

    let success = false;
    let retries = 0;
    
    while (!success) {
      const model = models[currentModelIdx % models.length];
      console.log('Generating ' + jobTitle + ' using ' + model + '...');
      
      try {
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4 }
          })
        });
        
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        
        const data = await res.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        text = text.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
        
        const parsed = JSON.parse(text);
        generatedCareers.push(parsed);
        fs.writeFileSync(progressFile, JSON.stringify(generatedCareers, null, 2));
        success = true;
        
        // Slight delay to be nice
        await sleep(2000);
        currentModelIdx++;
        
      } catch (e) {
        console.error('Error on ' + jobTitle + ' with ' + model + ': ' + e.message);
        retries++;
        currentModelIdx++;
        
        if (e.message.includes('429')) {
           console.log('Rate limit hit. Waiting 15 seconds...');
           await sleep(15000);
        } else {
           console.log('Waiting 5 seconds...');
           await sleep(5000);
        }
      }
    }
  }

  const fileContent = 'import { Career } from "./types";\n\nexport const careers: Career[] = ' + JSON.stringify(generatedCareers, null, 2) + ';\n';
  fs.writeFileSync(path.join(process.cwd(), 'src/data/careers.ts'), fileContent, 'utf-8');
  console.log("Successfully rebuilt all careers!");
}

generateCareers();
