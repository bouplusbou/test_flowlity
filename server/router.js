const express = require('express');
const router = express.Router();
const inventoryController = require('./inventoryController')

router.route('/inventory')
    .get((req, res) => { inventoryController.allData(req, res) })

module.exports = router;