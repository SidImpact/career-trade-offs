const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/data/careers.ts', 'utf8');
const progressPath = path.join(process.cwd(), 'careers_progress.json');
let careers = [];
if (fs.existsSync(progressPath)) {
   careers = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
} else {
   const match = tsData.match(/export const careers:\s*Career\[\]\s*=\s*(\[[\s\S]*\]);/);
   if (match) {
      careers = eval(match[1]);
   }
}

const batchDataPath = path.join(process.cwd(), 'batch_data.json');
if (fs.existsSync(batchDataPath)) {
  const batchData = JSON.parse(fs.readFileSync(batchDataPath, 'utf8'));
  
  let modified = false;
  for (let c of careers) {
    if (!c.time_to_first_payment && batchData[c.name]) {
      c.time_to_first_payment = batchData[c.name];
      modified = true;
    }
  }

  if (modified) {
    const fileContent = 'import { Career } from "./types";\n\nexport const careers: Career[] = ' + JSON.stringify(careers, null, 2) + ';\n';
    fs.writeFileSync(path.join(process.cwd(), 'src/data/careers.ts'), fileContent, 'utf-8');
    fs.writeFileSync(progressPath, JSON.stringify(careers, null, 2));
    console.log("Successfully updated src/data/careers.ts");
  } else {
    console.log("No missing careers were found in batch_data.");
  }
} else {
  console.log("batch_data.json not found yet.");
}
