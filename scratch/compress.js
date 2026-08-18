const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../assets/alliance-logo.png');
const stats = fs.statSync(logoPath);
console.log('Original Size:', stats.size, 'bytes');
