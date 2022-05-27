"use strict";
let express = require('express');
let router = express.Router();

router.use('/users', require('./apis/users/index'));


module.exports = router;


