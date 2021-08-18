// const shell = require("shelljs");
// const ks = require('node-key-sender');

const spawn = require("child_process").spawn;

// const processName = process.argv[2];

// let childProcess
// const childPid = childProcess.pid;
// let childProcess;

// spawnChildProcess(processName)
//     .then(childProcess => {
//         console.log(`PID of "${processName}" : ${childProcess.pid}`)
//     })

// shell.exec(`ps aux | grep ${processName}`)

module.exports = class processUtil {

    static spawnChildProcess(processName) { 
        const promise = new Promise((resolve, reject) => {
            let childProcess = spawn(processName);
            resolve(childProcess);
        });
    
        return promise;
    }
    
    static setSIGINTHandler(childProcess) {
        process.on('SIGINT', () => {
            process.kill(childProcess.pid);
            childProcess.kill();
            process.exit();
        });
    }
}


// process.on('SIGINT', () => {
//     // process.kill(childPid);
//     childProcess.kill();
//     process.exit();
// });


