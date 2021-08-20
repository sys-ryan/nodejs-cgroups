const processUtil = require('./processUtil.js');
const cgUtil = require('./cgUtil');

const shell = require('shelljs');

const targetPath = process.argv[2];
const itrCount = process.argv[3];
const saveFilePath = process.argv[4];

if(process.argv.length !== 5) {
    console.log("node db_defrost.js [targetPath] [itrCount] [saveFilePath]")
    return;
} 

for(let i=0; i<itrCount; i++) {
    shell.exec()
}

