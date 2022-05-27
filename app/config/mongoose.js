"use strict";
const mongoose = require('mongoose');
const config = require("./config");

mongoose.connect(config.db.mongo.uri, config.db.mongo.options, function (err) {
    if (err) {
        console.log("Error while connecting to mongo : " + err);
    } else {
        console.log("connected to mongodb : " + config.db.mongo.uri);
    }
});

module.exports = mongoose;