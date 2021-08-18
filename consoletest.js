const fs = require("fs");
const shell = require("shelljs");

const util = require("./util");

const pid = 21785;
const cgName = "app-limit";
const period = 100;
let cnt = 0;

let memUsage = parseInt(util.getCgroupMemoryUsage(cgName));
util.setMemoryLimit(cgName, memUsage + 1000);

const intervalId1 = setInterval(() => {
  let healthCheck = util.getPidByName(pid).split("\n");
  healthCheck = healthCheck.length;
  if (healthCheck < 3) {
    console.log("process ${pid} killed");
    clearInterval(intervalId1);
  }

  let memUsage = parseInt(util.getCgroupMemoryUsage(cgName));
  util.setMemoryLimit(cgName, memUsage + 1000);

  let memLimit = parseInt(util.getCgroupMemoryLimit(cgName));
  let tasks = util.getCgroupTasks(cgName)
  console.log(`memory: ${memUsage} / ${memLimit} : ${memLimit - memUsage} : ${tasks}`);
  console.log()
}, period);

// setInterval(()=> {
//     let data = util.getCgroupInfo(processName)
//     addData('./evaluation_data/app-free/free_mem_usage_0701.txt', `${cnt}:${data.memory_usage}:${data.memory_limit}:${data.tasks}\n`)

//     cnt++;
// },  period)

// append data to a file
const addData = (savePath, data) => {
  fs.appendFile(savePath, data, (err) => {
    if (err) {
      throw err;
    }
  });
};
