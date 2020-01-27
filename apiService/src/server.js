const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(session({
  secret: 'machoper',
  resave: false,
  saveUninitialized: true
}));
app.use(cors({
	origin: ["http://localhost:4200"], 
	credentials: true
}));

app.get('/', (req, res) => {
	res.send('Welcome to the shopping cart api!');
});

app.use('/api', routes);

// handle all other requests by sending 404
app.use(function(req, res) {
  res.status(404).send('Not Found');
});

app.listen(8080, () => {
	console.log('Server started!');
});

module.exports = app;