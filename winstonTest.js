// var express = require('express');
const router = express.Router();

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });
  
  //module.exports = logger;

router.get("/", (req, res, next) => {
  logger.log("debug", "Hello, Winston!");
  logger.log("debug","hii I'm Shivam");
  logger.debug("The is the home '/' route.");
  res.status(200).send("Logging Hello World..");
});

router.get("/event", (req, res, next) => {
  try {
    throw new Error("Not User!");
  } catch (error) {
    logger.error("Events Error: Unauthenticated user");
    res.status(500).send("Error!");
  }
});

// app.listen(3000, () => {
//   logger.info("Server Listening On Port 3000");
// });
  module.exports =router;