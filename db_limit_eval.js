const fs = require('fs');
const shell = require('shelljs');

const util = require('./util');

const cgName = 'db-limit';
const period = 100;

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
