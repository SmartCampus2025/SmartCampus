// middlewares/cors.js

const cors = require('cors');

const corsOptions = {
  origin: '*', // Update this with specific origin for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);