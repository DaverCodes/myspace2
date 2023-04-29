const connection = require('../config/connection');
const { thought, user } = require('../models');
const {} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');


  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
