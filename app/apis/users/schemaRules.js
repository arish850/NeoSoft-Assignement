"use strict";
const Joi = require('joi');

const register = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        token: Joi.string().optional().allow("")
    }
}
module.exports = register