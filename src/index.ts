import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import router from './routes';
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(router);
createConnection()
  .then(async (connection) => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
