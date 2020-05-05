require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/test", (req, res) => {
  res.send("did it work?");
});

app.listen(port);
