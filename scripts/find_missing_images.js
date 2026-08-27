const fs = require('fs');
const path = require('path');

const tsData = fs.readFileSync('src/data/careers.ts', 'utf8');
const ids = [...tsData.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);

const missing = [];
for (const id of ids) {
  if (!fs.existsSync(path.join('public/images', `career_${id}.jpg`))) {
    missing.push(id);
  }
}

console.log('Missing images:', JSON.stringify(missing, null, 2));
