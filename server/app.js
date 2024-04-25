// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const app = express();

const router = require("./routes");
const cors = require("cors");

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors());

app.use(express.json());

app.use(router);

module.exports = app;
