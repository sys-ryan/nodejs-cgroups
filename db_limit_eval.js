const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const util = require('./cgUtil');
const processUtil = require('./processUtil.js')

console.log(process.argv);

if(process.argv.length !== 5) {
    console.log(`node ${path.basename(__filename)} [cgroupName] [processName] [period]`)
    process.exit();
}


const cgName = process.argv[2];
const pName = process.argv[3];
const period = process.argv[4];


let cnt = 0;

function setCallback() {
    let cnt = 0;
    let memory_usage;
    let memory_limit;
    let data;
    
    return function cb() {
        memory_usage = parseInt(util.getCgroupInfo(cgName).memory_usage)
        memory_limit = parseInt(memory_usage + 1024*4);
        util.setMemoryLimit(cgName, memory_limit);

        data = util.getCgroupInfo(cgName);

        addData('./evaluation_data/app-limit/0818_db_limit_100.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
        console.log(`${cnt}:${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`);

        if(data.tasks.length < 2) {
            console.log('Terminated - The process was killed');
            process.exit();
        }

        if(!(data.memory_usage < data.memory_limit)) {
            console.log('triggered!');
            util.setMemoryLimit(cgName, data.memory_usage + 1024 * 1024)
            data = util.getCgroupInfo(cgName);
            addData('./evaluation_data/app-limit/0818_db_limit_100.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
            console.log(`${cnt}:${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`);
        }
        cnt++;
    }
}


setInterval(setCallback(),  period)



// append data to a file
function addData (savePath, data) {
    fs.appendFile(savePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}
