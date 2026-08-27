const fs = require('fs');
const path = require('path');
const generatedCareers = JSON.parse(fs.readFileSync('careers_progress.json', 'utf8'));

const fileContent = 'import { Career } from "./types";\n\nexport const careers: Career[] = ' + JSON.stringify(generatedCareers, null, 2) + ';\n';
fs.writeFileSync(path.join(process.cwd(), 'src/data/careers.ts'), fileContent, 'utf-8');
console.log("Successfully rescued " + generatedCareers.length + " careers into careers.ts!");
