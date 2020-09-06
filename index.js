process.env.UV_THREADPOOL_SIZE = 1; //so that every child has only 1 thread

const cluster = require("cluster");
const crypto = require("crypto");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // doWork(5000);
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {});
  res.send("Hi there!");
});

app.get("/fast", (req, res) => {
  res.send("Hi there fast!");
});

app.listen(3001);