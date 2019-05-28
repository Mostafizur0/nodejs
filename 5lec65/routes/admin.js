const express = require('express');

const router = express.Router();
// Router provides all methods as app 
router.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

router.post('/product', (req, res, next) => {
    console.log(req.body);// express does not parse body. have to install parser
    res.redirect('/');
});

module.exports = router;