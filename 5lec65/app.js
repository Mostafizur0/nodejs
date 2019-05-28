const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
// middleware always executes top to bottom. so '/' must be at the end if needed.
app.use(bodyParser.urlencoded({extended: false}));
// use different persr for different file types. always install parser manualy.

app.use(adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not Found!!!</h1>');
});

app.listen(3000);
