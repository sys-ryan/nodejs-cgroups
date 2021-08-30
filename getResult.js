const fs = require('fs');
const path = require('path')
const srcPath = `./${process.argv[2]}`
const destPath = `./${process.argv[3]}`

// const targetFilePath = "/home/syscore-ubuntu/evaluation/evaluation_data/app-limit/0818_db_limit_100_x16.txt"
const encoding = 'utf8'`

const addData = (destPath, data) => {
    fs.appendFile(destPath, data, (err) => {
        if(err) {
            throw err;
        }
    })
};

fs.readFile(srcPath, encoding, function(err, data) {
    let dataArray = data.split('\n')
    dataArray.forEach(el => {
        let data = el.split(':');
        let memUsage = data[0];
        let memLimit = data[1];

        addData(`./${destPath}-usage.txt`, `${memUsage}\n`)
        addData(`./${destPath}-limit.txt`, `${memLimit}\n`)
    })
})