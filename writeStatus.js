const fs = require('fs');
const shell = require('shelljs');

const util = require('./util');

const cgName = 'app-limit';
const period = 100;

let cnt = 0;

function setCallback() {
    let cnt = 0;
    let memory_usage;
    let memory_limit;
    let data;
    
    return function cb() {
        // memory_usage = parseInt(util.getCgroupInfo(cgName).memory_usage)
        // memory_limit = parseInt(memory_usage + 4096);
        // util.setMemoryLimit(cgName, memory_limit);

        data = util.getCgroupInfo(cgName);

        addData('./evaluation_data/0730/app_limit_1000.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
        // console.log(`${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`);

        if(!(data.memory_usage < data.memory_limit)) {
            // console.log('triggered!');
            // util.setMemoryLimit(cgName,data.memory_usage, data.memory_usage + 1024 * 1024)
            data = util.getCgroupInfo(cgName);
            addData('./evaluation_data/0730/app_limit_1000.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
            console.log(`${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`);
        }
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
