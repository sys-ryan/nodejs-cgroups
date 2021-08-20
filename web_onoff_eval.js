const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const spawn = require("child_process").spawn;


const util = require('./cgUtil');
const processUtil = require('./processUtil.js')

const targetProcess = process.argv[2];
const itrCount = process.argv[3];

for(let i = 0; i < itrCount; i++) {
    // processUtil.spawnChildProcess(targetProcess);
    shell.exec(`node ${targetProcess}`);
    console.log(i);
}




