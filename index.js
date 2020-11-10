const express = require("express");
const PORT = 3000;
const app = express();

app.get("/hello", (req, res, next) => {
  res.send("Heqqllo");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
