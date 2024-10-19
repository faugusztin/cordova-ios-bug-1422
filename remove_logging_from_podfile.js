var fs = require('fs');

var content = fs.readFileSync('node_modules/cordova-ios/lib/Podfile.js', {encoding:'utf-8'});
// remove our logging if already present to avoid adding logging multiple times
content = content.replace(/\/\*1422\*\/(.*?)\/\*1422\*\//,"")
fs.writeFileSync('node_modules/cordova-ios/lib/Podfile.js', content, {encoding: 'utf8'});