const fs = require('fs');

const isManual = process.argv[2];

const data = {
    "manualControl": isManual === "true"
}

fs.writeFile('./env.conf', JSON.stringify(data))

