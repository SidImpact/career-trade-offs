const fs = require('fs');
const tsData = fs.readFileSync('src/data/careers.ts', 'utf8');
const tsCount = (tsData.match(/"id":/g) || []).length;
console.log('careers.ts count:', tsCount);

const jsonData = JSON.parse(fs.readFileSync('careers_progress.json', 'utf8'));
console.log('progress JSON count:', jsonData.length);
