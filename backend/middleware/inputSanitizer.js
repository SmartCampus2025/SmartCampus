// middlewares/inputSanitizer.js

const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const express = require('express');

const sanitizeInputs = express.Router();

sanitizeInputs.use(mongoSanitize());
sanitizeInputs.use(xssClean());

module.exports = sanitizeInputs;