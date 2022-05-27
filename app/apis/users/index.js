"use strict";
const express = require("express");
let router = express.Router();
const validateForm = require("express-joi-validator");
const schemaRules = require("./schemaRules");
const usersController = require("./controller");
const authMiddleware = require("./../../config/authMiddleware");


router.post('/register', validateForm(schemaRules.register, {}),((req, res) => {
    usersController.register(req).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    });
}));

router.get('/get-all-users', authMiddleware.isUserLogin, (req, res) => {
    usersController.getAllUsers(req).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch(err => {
        res.status(err.statusCode).json(err);
    })
})

module.exports = router;
