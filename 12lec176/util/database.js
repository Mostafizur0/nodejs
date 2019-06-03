const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = cb => {
  MongoClient.connect(
    'mongodb+srv://mostafiz:12345@complete-nodejs-course-z4e3f.mongodb.net/test?retryWrites=true&w=majority',
  )
  .then( client => {
    console.log('Connected!!!');
    _db = client.db();
    cb();
  })
  .catch( err => {
    console.log(err);
    throw err;
  });
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw 'No db found';
  }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;