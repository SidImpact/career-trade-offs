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

async function generateCareers() {
  const generatedCareers = [];
  
  for (let i = 0; i < careersList.length; i++) {
    const jobTitle = careersList[i];
    console.log(`[${i+1}/${careersList.length}] Generating profile for: ${jobTitle}...`);
    
    try {
      const res = await fetch("http://localhost:3000/api/generate-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: jobTitle })
      });
      
      if (!res.ok) {
        console.error(`Failed to generate ${jobTitle}: ${res.statusText}`);
        continue;
      }
      
      const careerData = await res.json();
      
      // Override category from 'Generated' to something more appropriate if possible, 
      // but for now keeping the exact structure the API returns.
      // We will ensure the id is unique.
      generatedCareers.push(careerData);
      
      // Wait a little to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.error(`Error generating ${jobTitle}:`, e);
    }
  }

  const fileContent = `import { Career } from "./types";

export const careers: Career[] = ${JSON.stringify(generatedCareers, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/careers.ts'), fileContent, 'utf-8');
  console.log("Successfully wrote all careers to src/data/careers.ts");
}

generateCareers();
