require("dotenv").config();
const express = require("express");
const app = express();
const Logger = require("./logger/logger");
const logger = Logger.getLogger("./app");
const connect = require("./utils/db");
const notFount = require("./utils/middleware/not-found");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
app.use(express.json({ extend: false }));
switch (process.env.ENVIRONMENT) {
    case 'development': {
        logger.info(`Development Morgan`);
        morgan.token('body', (req) => JSON.stringify(req.body));
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
            )
        );
        break;
    }
    case 'production': {
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] - :req[content-length]'
            )
        );
        break;
    }
    default: {
        app.use(morgan('combined', { stream: logger.stream }));
        app.use(
            morgan(
                ':method :url :status :response-time ms - :res[content-length] - :req[content-length]'
            )
        );
    }
}app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

app.use(notFount);

const start = async () => {
  try {
    logger.info(`Connecting to MONGO DB`);
    await connect(process.env.MONGO_URI);
    logger.info(`Connected to MongoDB`);
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  } catch (error) {
    logger.error(`Failed to connect to MongoDB`, error);
    process.exit(1);
  }
};

start();
