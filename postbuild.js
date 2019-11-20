const path = require('path');
const fs = require('fs');

const sourceMap = path.resolve(__dirname, 'dist/assets/js/bundle.js.map');

fs.unlinkSync(sourceMap);
