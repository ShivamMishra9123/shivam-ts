const winston = require('winston');
const mongoose = require('mongoose');
require("winston-mongodb");

// define a Mongoose schema for the log entries
const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
});

// create a Mongoose model for the log entries
const Log = mongoose.model('log', logSchema);

// define a custom transport for Winston that saves logs to MongoDB using Mongoose
const mongoTransport = new winston.transports.MongoDB({
  db: 'mongodb://localhost/Data',
  collection: 'logs',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  storeHost: true,
  capped: true,
  cappedSize: 1000000,
  cappedMax: 1000,
  tryReconnect: true,
  options: { useUnifiedTopology: true },
  metaKey: 'metadata',
});

// create a Winston logger and add the custom MongoDB transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    mongoTransport,
  ],
});

// log some messages
logger.info('This is an info message');
logger.error('This is an error message');

// retrieve logs from the database using the Mongoose model
// Log.find({}, (err, logs) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(logs);
//   }
// });