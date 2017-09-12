const mongo = require('mongodb');
const mongo_client = mongo.MongoClient;
const mongo_url = 'mongodb://localhost:27017/screenshot-app-db';
const data = require('./mongo.data.sample.json');

mongo_client.connect(mongo_url, function(err, db) {
    if (err) throw err;
    console.log('Connected to database!');

    db.dropCollection('media', function(err, result) {
        if (err) throw err;
        db.createCollection('media', function(err, collection) {
            if (err) throw err;
            collection.insertMany(data, function(err, res) {
                if (err) throw err;
                console.log('Setting Mongo data finished!');
            });
        });
    })
  });