const inventoryModel = require('./inventoryModel'); 

function allData(req, res) {
    inventoryModel.getData(req, res)
        .then(data => res.status(200).send(data))
        .catch(error => console.log(error))
}

module.exports = { 
    allData,
}