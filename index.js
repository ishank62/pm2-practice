// process.env.UV_THREADPOOL_SIZE = 1; //so that every child has only 1 thread

// const cluster = require("cluster");
const crypto = require("crypto");

const express = require("express");
const app = express();

const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {
  // doWork(5000);
  // crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {});
  // res.send("Hi there!");
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
    };
    postMessage(counter);
  });

  worker.onmessage = function (message) {
    console.log(message.data);
    res.send("" + message.data);
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("Hi there fast!");
});

app.listen(3001);
