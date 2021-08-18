const fs = require('fs');
const util = require('./util');

const cgName = 'db';
const period = 1000;


function setCallback() {

    let data;

    return function cb() {
        data = util.getCgroupInfo(cgName);
        addData('./evaluation_data/app-free/free_db_mem_usage_0817_1000p.txt', `${data.memory_usage}:${data.tasks}\n`)
        console.log(`${data.memory_usage}:${data.tasks}\n`)
    }
}


setInterval(setCallback(),  period)



// append data to a file
const addData = (savePath, data) => {
    fs.appendFile(savePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}
