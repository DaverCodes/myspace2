const { connect, connection } = require('mongoose');
// establishes a connection to a MongoDB database using Mongoose and exports the connection object

connect('mongodb://127.0.0.1:27017/myspace2');

module.exports = connection;
