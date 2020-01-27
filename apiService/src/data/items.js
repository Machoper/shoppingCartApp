const path = require('path');
const fs = require('fs');

var rawData = fs.readFileSync(path.join(__dirname , 'items.json'), {encoding: 'utf8'});
var items = JSON.parse(rawData);

module.exports = items;