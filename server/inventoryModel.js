const fs = require('fs');

async function getData() {
    let data = fs.readFileSync('./data.json','utf8');
    return data;
}

module.exports = {
    getData,
}