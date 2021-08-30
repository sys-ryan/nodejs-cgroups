const { createSecretKey } = require('crypto');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
// const shell = require('shelljs');

const util = require('./cgUtil');
const processUtil = require('./processUtil.js')
const {performance} = require("perf_hooks")


if(process.argv.length !== 5) {
    console.log(`node ${path.basename(__filename)} [cgroupName] [period] [savePath]`)
    process.exit();
}

const cgName = process.argv[2];
const period = process.argv[3];
const savePath = process.argv[4];

addData(savePath, `
============================================================
    cgName: ${cgName}
    period: ${period}
    timestamp: ${new Date().toString()}
============================================================

`)

// const service = createService('./memory_controller.js');
// processUtil.spawnChildProcess(pName)
// .then(childProcess => {
//     pid = childProcess.pid;
//     console.log(`[SYSTEM] ${pName}(${pid}) activate`);
//     processUtil.setSIGINTHandler(childProcess);
//     console.log(`[SYSTEM] SIGINT handler has been added.`);

//     util.createNewCgrop('memory', cgName);
//     util.setMemoryLimit(cgName, 999999999999);
//     util.addProcessToCgrop(pid, cgName)
//     console.log("[SYSTEM] Preparing for execution...")
// });

function setCallback() {
    // let cnt = 0;
    let memory_usage;
    let memory_limit;
    let tasks;
    let data;
    let cnt=0;
    let end;
    
    return function cb() {
        data = util.getCgroupInfo(cgName);
        memory_usage = data.memory_usage;
        memory_limit = data.memory_limit;
        tasks = data.tasks;


        // addData('./evaluation_data/app-limit/0819_db_limit_100_x16.txt', `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
        addData(savePath, `${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)
        console.log(`${cnt}:${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`);

        if(data.tasks.length < 2) {
            console.log('[ERROR] Terminated - The process was killed');
            process.exit();
        }
        cnt++;
    }
}

        


setTimeout(() => {
    setInterval(setCallback(),  period)
}, 10000)




// append data to a file
function addData (savePath, data) {
    fs.appendFile(savePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}
