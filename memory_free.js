const fs = require('fs');
const shell = require('shelljs');

const util = require('./util');

const cgName = 'app-free';
const period = 100;

let cnt = 0;

function setCallback() {
    let cnt = 0;
    let memory_usage;
    
    return function cb() {
        memory_usage = parseInt(util.getCgroupInfo(cgName).memory_usage)

        

        // addData('./evaluation_data/0730/app_limit_1000.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
        console.log(`${data.memory_usage}:${data.tasks}\n`);

    }
}

setInterval(setCallback(), period);