const cluster = require("cluster");

if (cluster.isMaster) {
  //to create children
  cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
} else {
  // Child
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there!");
  });

  app.get("/fast", (req, res) => {
    res.send("Hi there fast!");
  });

  app.listen(3000);
}
