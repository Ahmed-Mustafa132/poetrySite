const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/done.html", (req, res) => {
  let poetry = req.body.poetry;
  poetry = poetry.split(`\n`);
  let todo = JSON.parse(fs.readFileSync("data.json", "utf8"));
  req.body.poetry = poetry;
  todo.push(req.body);
  fs.writeFileSync("data.json", JSON.stringify(todo));
  res.sendFile(path.join(__dirname, "data.json"));
});
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
