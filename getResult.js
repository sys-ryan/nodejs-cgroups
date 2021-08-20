const fs = require('fs');

// const targetFilePath = `/home/syscore-ubuntu/evaluation/evaluation_data/app-free/free_mem_usage_0811_1000p.txt`
const targetFilePath = "/home/syscore-ubuntu/evaluation/evaluation_data/app-limit/0818_db_limit_100_x16.txt"
const encoding = 'utf8'

const addData = (savePath, data) => {
    fs.appendFile(savePath, data, (err) => {
        if(err) {
            throw err;
        }
    })
};

fs.readFile(targetFilePath, encoding, function(err, data) {
    let dataArray = data.split('\n')
    dataArray.forEach(el => {
        let data = el.split(':');
        let memUsage = data[0];
        let memLimit = data[1];

        addData('./0818_db_limit_100_x16_usage.txt', `${memUsage}\n`)
        addData('./0818_db_limit_100_x16_limit.txt', `${memLimit}\n`)
    })
})