//const http = require('http'); no need to import http while using express. express handles the call

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In middleware');
    next(); // used to go to next middleware
});

app.use((req, res, next) => {
    console.log('In next middleware');
    res.send('<h1>Hello from Express!!!</h1>'); // used to go to next middleware
});

app.listen(3000);
