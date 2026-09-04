// backend/config/db.js
const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
  }
};

const query = async (sql) => {
  console.log('Executing SQL query stub:', sql);
  return [[]];
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.query = query;
