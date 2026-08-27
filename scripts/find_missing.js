const fs = require('fs');

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

const tsData = fs.readFileSync('src/data/careers.ts', 'utf8');
const missing = careersList.filter(title => {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  return !tsData.includes('"id": "' + id + '"');
});

console.log("Missing careers:", missing);
