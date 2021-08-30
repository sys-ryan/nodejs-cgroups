const shell = require("shelljs");
const silentOpt = { silent : true }

exports.getPidByName = (pName) => {
  return (result = shell.exec(`ps aux | grep ${pName}`, {
    silent: true,
  }).stdout);
};

exports.createNewCgrop = (type, cgName) => {
  if (type === "memory" || type === "cpu") {
    shell.exec(`sudo mkdir /sys/fs/cgroup/${type}/${cgName}`, silentOpt);
    shell.exec(`sudo ls -l /sys/fs/cgroup/${type} | grep ${cgName}`, silentOpt)
    // shell.exec(`sed -i 's/oom_kill_disable 0/oom_kill_disable 1/g' /sys/fs/cgroup/memory/${cgName}/memory.oom_control`)
    console.log(`[SYSTEM] cgroup "${cgName}" created or using the eixisting one.`);
    // shell.exec(`cat /sys/fs/cgroup/memory/${cgName}/memory.oom_control`)
    
  } else {
    console.log("[ERROR] The first argument must be either 'memory' or 'cpu'");
  }
};

exports.addProcessToCgrop = (pid, cgName) => {
  shell.exec(`echo ${pid} >> /sys/fs/cgroup/memory/${cgName}/tasks`);
  shell.exec(`echo -500 >> /proc/${pid}/oom_score_adj`);
  const oom_score_adj = shell.exec(`cat /proc/${pid}/oom_score_adj`, { silent: true }).stdout;
  console.log(`[SYSTEM] Process "${pid}" has been added to cgrop "${cgName}"`);
  console.log(`[SYSTEM] oom_score_adj : ${oom_score_adj}`)
};

exports.getCgroupMemoryLimit = (cgName) => {
  return shell
    .exec(`cat /sys/fs/cgroup/memory/${cgName}/memory.limit_in_bytes`, {
      silent: true,
    })
    .stdout.split("\n")[0];
};

exports.getCgroupMemoryUsage = (cgName) => {
  return shell
    .exec(`cat /sys/fs/cgroup/memory/${cgName}/memory.usage_in_bytes`, {
      silent: true,
    })
    .stdout.split("\n")[0];
};

exports.getCgroupTasks = (cgName) => {
  return shell
    .exec(`cat /sys/fs/cgroup/memory/${cgName}/tasks`, { silent: true })
    .stdout.split("\n");
};

exports.getCgroupInfo = (cgName) => {
  return {
    memory_limit: this.getCgroupMemoryLimit(cgName),
    memory_usage: this.getCgroupMemoryUsage(cgName),
    tasks: this.getCgroupTasks(cgName),
  };
};

exports.setMemoryLimit = (cgName, size, outputLog = false) => {

  const prevSize = this.getCgroupMemoryLimit(cgName);
  shell.exec(
    `echo ${size} >> /sys/fs/cgroup/memory/${cgName}/memory.limit_in_bytes`
  );

  const setSize = this.getCgroupMemoryLimit(cgName);
  if(outputLog) {
    console.log(`${cgName} - memory limit: ${prevSize} -> ${setSize}`);
  }
};

exports.getOOMScore = (cgName) => {
  return shell
    .exec(`cat /sys/fs/cgroup/memory/${cgName}/memory.limit_in_bytes`, {
      silent: true,
    })
    .stdout.split("\n")[0];
};