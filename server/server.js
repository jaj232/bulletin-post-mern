const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = 4000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

const routes = require('./routes');
app.use(routes);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});