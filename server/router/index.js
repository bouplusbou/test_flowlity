const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => { console.log('route is OK'); })

module.exports = router;