var fs = require('fs');

var content = fs.readFileSync('node_modules/cordova-ios/lib/Podfile.js', {encoding:'utf-8'});
// remove our logging if already present to avoid adding logging multiple times
content = content.replace(/\/\*1422\*\/(.*?)\/\*1422\*\//,"")
content = content.replace(
    "fs.writeFileSync(this.path, text, 'utf8');", 
    "/*1422*/console.log('------ Podfile content at this point');console.log(text);console.log('------');/*1422*/fs.writeFileSync(this.path, text, 'utf8');"
);
fs.writeFileSync('node_modules/cordova-ios/lib/Podfile.js', content, {encoding: 'utf8'});