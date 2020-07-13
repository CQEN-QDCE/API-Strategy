var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

const mongoUri = process.env.uri;
const mongoUsername = process.env.username || process.env.MONGODB_USER;
const mongoPassword = process.env.password || process.env.MONGODB_PASSWORD;
const dbName = process.env.database_name || 
			   process.env.MONGODB_DBNAME || 
			   process.env.MONGODB_DATABASE ||
			   'Tododb';
const dbServiceName = process.env.DATABASE_SERVICE_NAME || 'localhost';

var dbConnectionUrl;

// If the monogo secret has been attached, modify the provided URI to include
// authentication credentials
if (mongoUri) {
	var auth = mongoUsername + ':' + mongoPassword + '@'
	var pieces = mongoUri.split('//');
	dbConnectionUrl = pieces[0] + '//' + auth + pieces[1] + '/' + dbName;
}
else if (process.env.MONGODB_URL){
	dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/Tododb';
} else {
	dbConnectionUrl = 'mongodb://localhost:27017/' + dbName;
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConnectionUrl, {useUnifiedTopology: true, useNewUrlParser: true}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
