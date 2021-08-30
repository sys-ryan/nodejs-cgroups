const cgUtil = require("./cgUtil")
const processUtil = require('./processUtil');
const fs = require('fs');
const path = require('path');
const {performance} = require("perf_hooks")

const savePath = process.argv[2];
const cgName = process.argv[3];
const pName = process.argv[4];
const period = process.argv[5];

//Initialization
let pid;



processUtil.spawnChildProcess(pName)
.then(childProcess => {
    pid = childProcess.pid;
    console.log(`[SYSTEM] ${pName}(${pid}) activate`);
    processUtil.setSIGINTHandler(childProcess);
    console.log(`[SYSTEM] SIGINT handler has been added.`);

    cgUtil.createNewCgrop('memory', cgName);
    cgUtil.setMemoryLimit(cgName, 999000000000);
    cgUtil.addProcessToCgrop(pid, cgName)
    console.log("[SYSTEM] Preparing for execution...")
});


function setCallback() {
    let cnt = 0;
    let data;
    let memory_usage;
    let memory_limit;
    let start;
    let end;
    let lapse;

    return function cb() {
        start = performance.now();
        data = cgUtil.getCgroupInfo(cgName);
        memory_limit = parseInt(data.memory_limit);

        cgUtil.setMemoryLimit(cgName, memory_limit + 1024);
        end = performance.now();
        lapse = end - start;

        console.log(`${cnt} : ${lapse}`)
        cnt++;

        addData(savePath, `${lapse}\n`)
    }
}

addData(savePath, `
============================================================
    cgName: ${cgName}
    period: ${period}
    timestamp: ${new Date().toString()}
============================================================
`)

setTimeout(() => {
    console.log('[SYSTEM] Control start!')
    setInterval(setCallback(),  period)
}, 10000)



function addData(savePath, data) {
    fs.appendFile(savePath, data, (err) => {
        if(err) {
            throw err;
        }
    })
};