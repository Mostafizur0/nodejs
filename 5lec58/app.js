const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// middleware always executes top to bottom. so '/' must be at the end if needed.
app.use(bodyParser.urlencoded({extended: false}));
// use different persr for different file types. always install parser manualy.
app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body);// express does not parse body. have to install parser
    res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
