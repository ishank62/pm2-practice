process.env.UV_THREADPOOL_SIZE = 1; //so that every child has only 1 thread

const cluster = require("cluster");
const crypto = require("crypto");

if (cluster.isMaster) {
  //to create children (keep them equal to no. of physical/logical cores)
  cluster.fork();
  cluster.fork();
} else {
  // Child
  const express = require("express");
  const app = express();

  // function doWork(duration) {
  //   const start = Date.now();
  //   while (Date.now() - start < duration) {}
  // }

  app.get("/", (req, res) => {
    // doWork(5000);
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {});
    res.send("Hi there!");
  });

  app.get("/fast", (req, res) => {
    res.send("Hi there fast!");
  });

  app.listen(3001);
}