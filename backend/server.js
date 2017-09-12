const express = require('express');
const url = require('url');
const fs = require('fs');
const app = express();

const mongo = require('mongodb');
const mongo_client = mongo.MongoClient;
const mongo_url = 'mongodb://localhost:27017/screenshot-app-db';

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/assets/js/index.html');
});

app.get('/api/medias', function (req, res) {
  mongo_client.connect(mongo_url, function (err, db) {
    if (err) throw err;
    db.collection('media').find({}).toArray(function (err, result) {
      res.send(result);
    });
  });
});

app.get('/api/media', function (req, res) {
  const query = url.parse(req.url, true).query;
  const id = query.id;
  mongo_client.connect(mongo_url, function (err, db) {
    if (err) throw err;
    console.log(id);
    db.collection('media').findOne({ _id: mongo.ObjectID(id) }, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.use(express.static('assets'));

app.listen(8080, function () {
  console.log('Running server..');
});

