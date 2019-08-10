const express = require('express');
const app = express();
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const config = require('./config');
//const url = 'mongodb://localhost:27017';
//const dbName = 'bulletin';
//const colName = 'posts';

//Get all Posts
router.get('/posts', (req, res) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('error', err);
        let db = client.db(config.databaseName);
        db.collection(config.collectionName).find({}).toArray((err, result) => {
            if (err) { throw err }
            res.json(result);
        });
    });
});

//Get a post
router.get('/posts/:id', (req, res) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('error', err);
        let db = client.db(config.databaseName);
        db.collection(config.collectionName).findOne({ _id: ObjectId(req.params.id)}, (err, result) => {
            if (err) { throw err }
            res.json(result);
        });
    });
});

//Create a post
router.post('/posts', (req, res) => {
    let document = req.body;
    document.dateCreated = new Date(Date.now());
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('error', err);
        let db = client.db(config.databaseName);
        db.collection(config.collectionName).insertOne(document, (err, result) => {
            if (err) { throw err }
            res.json(result);
        });
    });
});

//Edit a post
router.put('/posts/:id', (req, res) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('error', err);
        let db = client.db(config.databaseName);
        let myquery = {_id: ObjectId(req.params.id)};
        let newvalues = { $set: req.body };
        db.collection(config.collectionName).updateOne(myquery, newvalues, (err, result) => {
            if (err) { throw err }
            res.json(result);
        });
    });
});

//Delete a post
router.delete('/posts/:id', (req, res) => {
    MongoClient.connect(config.url, { useNewUrlParser: true }, (err, client) => {
        if (err) return console.log('error', err);
        let db = client.db(config.databaseName);
        db.collection(config.collectionName).deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
            if (err) { throw err }
            res.json(result);
        });
    });
});



module.exports = router;