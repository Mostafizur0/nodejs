const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
  constructor(title, imageUrl, description, price, id, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
    this.userId = userId;
  }

  save() {
    const db = getDB();
    let dbOp;

    if (this._id) {
      dbOp = db
      .collection('products')
      .updateOne({ _id: new mongodb.ObjectID(this._id)}, {$set: this});
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.then(result => {
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    });
  }

  static deleteById(id) {
    const db = getDB();
    return db.collection('products')
    .deleteOne({ _id: new mongodb.ObjectID(id)})
    .then(result => {
      console.log('Deleted');
    })
    .catch( err => {
      console.log(err);
    });
  }

  static findAll() {
    const db = getDB();
    return db.collection('products')
    .find()
    .toArray()// toArray not recommended for more tham 100 docs
    .then(products => {
      console.log(products);
      return products;
    })
    .catch( err => {
      console.log(err);
    });
  }

  static findById(id) {
    const db = getDB();
    return db.collection('products')
    .find({ _id: new mongodb.ObjectID(id) })
    .next()// as find returns a cursor
    .then(product => {
      console.log(product);
      return product;
    })
    .catch( err => {
      console.log(err);
    });
  }
};

module.exports = Product;
