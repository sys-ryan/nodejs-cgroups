const fs = require('fs');
const util = require('./util');

const cgName = 'app-free';
const period = 100;


function setCallback() {

    let data;

    return function cb() {
        data = util.getCgroupInfo(cgName);
        addData('./evaluation_data/app-free/free_mem_usage_0811_100p.txt', `${data.memory_usage}:${data.tasks}\n`)
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
