const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5cf656812f996f0dd8cbb885')
    .then(user => {
      //console.log(user);
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(//No database config needed. only connect function!!!
    'mongodb+srv://mostafiz:12345@complete-nodejs-course-z4e3f.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then( result => {// gives the 1st entry in db if no parm given
      if(!result){
        user = new User({ name: 'Most', email: 'bfe', cart: { items: [] } });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
