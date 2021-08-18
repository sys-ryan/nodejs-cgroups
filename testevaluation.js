const fs = require('fs');

const addData = (savePath, data) => {
    fs.appendFile(savePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}

fs.readFile('./evaluation_data/0730/app_limit_1000.txt', 'utf8', function(err, data){
    let dataArray = data.split('\n');
    dataArray.forEach(el => {
        let data = el.split(':');
        memUsage = data[0];
        let memLimit = data[1];
        
        addData('./res_usage.txt', `${memUsage}\n`);
        addData('./res_limit.txt', `${memLimit}\n`);
    })
  });

