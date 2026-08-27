const fs = require('fs');
const path = require('path');

const categoryMap = {
  "doctor": "Healthcare",
  "software-engineer": "Technology",
  "lawyer": "Legal",
  "entrepreneur": "Business",
  "teacher": "Education",
  "chartered-accountant": "Finance",
  "civil-servant": "Government & Public Service",
  "police-officer": "Public Service & Defense",
  "engineer": "Engineering",
  "data-scientist": "Technology",
  "financial-analyst": "Finance",
  "investment-banker": "Finance",
  "banker": "Finance",
  "accountant": "Finance",
  "architect": "Design & Architecture",
  "commercial-airline-pilot": "Aviation",
  "nurse": "Healthcare",
  "psychologist": "Healthcare",
  "scientist": "Science & Research",
  "professor": "Education & Academia",
  "journalist": "Media & Journalism",
  "graphic-designer": "Creative & Design",
  "uxui-designer": "Technology & Design",
  "product-manager": "Technology & Business",
  "marketing-manager": "Marketing & Business",
  "sales-manager": "Sales & Business",
  "consultant": "Business & Strategy",
  "business-manager": "Business",
  "economist": "Economics & Finance",
  "researcher": "Science & Research",
  "pharmacist": "Healthcare",
  "dentist": "Healthcare",
  "veterinarian": "Healthcare",
  "physiotherapist": "Healthcare",
  "content-creator": "Media & Entertainment",
  "author": "Creative Writing & Media",
  "photographer": "Creative Arts",
  "filmmaker": "Media & Entertainment",
  "actor": "Performing Arts",
  "musician": "Performing Arts",
  "professional-athlete": "Sports & Athletics",
  "chef": "Culinary Arts",
  "news-anchor": "Media & Journalism",
  "air-traffic-controller": "Aviation",
  "cybersecurity-specialist": "Technology",
  "ai-engineer": "Technology",
  "cloud-engineer": "Technology",
  "web-developer": "Technology",
  "game-developer": "Technology & Gaming"
};

const careersPath = path.join(process.cwd(), 'src/data/careers.ts');
let content = fs.readFileSync(careersPath, 'utf8');

// Extract JSON array
const match = content.match(/export const careers: Career\[\] = (\[[\s\S]*\]);/);
if (match) {
  let careers = JSON.parse(match[1]);
  careers = careers.map(c => {
    return {
      ...c,
      category: categoryMap[c.id] || "General"
    };
  });

  const updatedFile = `import { Career } from "./types";

export const careers: Career[] = ${JSON.stringify(careers, null, 2)};
`;
  fs.writeFileSync(careersPath, updatedFile, 'utf8');
  console.log("Updated categories for all careers successfully!");
} else {
  console.error("Could not parse careers.ts");
}
