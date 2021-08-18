const fs = require('fs');
const shell = require('shelljs');

const util = require('./util');

const cgName = 'tool_evaluation';
const period = 1000;

let cnt = 0;

function setCallback() {
    let cnt = 0;
    let data;

    return function cb() {
        data = util.getCgroupInfo(cgName);
        cnt++;
        addData('./evaluation_data/app-free/tool_evaluation_100.txt', `${data.memory_usage}\n`);
        console.log(`${cnt}:${data.memory_usage}:${data.tasks}`);
    }
}

setInterval(setCallback(), period)

// append data to a file
const addData = (savePath, data) => {
    fs.appendFile(savePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}
