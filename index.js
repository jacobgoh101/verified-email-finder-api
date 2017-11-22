require("dotenv").config();
const express = require("express");
const app = express();
const permute = require("email-permutator");
const helmet = require("helmet");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
const filterEmails = require('./lib/filterEmails');

app.use(helmet());

app.post("/", async (req, res) => {
  const input = req.body;
  let emails = permute(input);
  emails = await filterEmails(emails);
  res.json(emails);
});

app.listen(process.env.PORT);
