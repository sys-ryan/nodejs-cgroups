const fs = require('fs');

// const targetFilePath = `/home/syscore-ubuntu/evaluation/evaluation_data/app-free/free_mem_usage_0811_1000p.txt`
const targetFilePath = "/home/syscore-ubuntu/evaluation/evaluation_data/app-free/free_db_mem_usage_0817_1000p.txt"
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
        
        addData('./app_db_free_usage_0817.txt', `${memUsage}\n`)
    })
})