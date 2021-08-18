const fs = require('fs');
const shell = require('shelljs');

const util = require('./util');

const cgName = 'app-free';
const period = 100;

let cnt = 0;

function setCallback() {

    let data;
    
    return function cb() {
        // memory_usage = parseInt(util.getCgroupInfo(cgName).memory_usage)
        // memory_limit = parseInt(memory_usage + 4096);
        // util.setMemoryLimit(cgName, memory_limit);

        data = util.getCgroupInfo(cgName);

        addData('./evaluation_data/0730/app_free_100.txt', `${data.memory_usage}\n`)
        console.log(`${data.memory_usage}:${data.tasks}\n`);

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
