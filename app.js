const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const config = require('./config');

const app = express();
mongoose.connect(`mongodb://${config.dbServer}/${config.dbName}`, { useMongoClient: true });

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running with ${numCPUs} workers...`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('listening', (worker, address) => {
    console.log(`A worker ${worker.process.pid} is now connected ${address.port}`);
  });

  cluster.on('disconnect', (worker) => {
    console.log(`The worker #${worker.id} has disconnected`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server


  app.use('/', routes);

  app.listen(3000, () => console.log('Example app listening on port 3000!'));

  console.log(`Worker ${process.pid} started`);
}
