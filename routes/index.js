const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Define your other routes here
router.get('/', (req, res) => {
  res.send('Myspace2!');
});

router.use((req, res) => {
  res.status(404).send('Whoops thats wrong');
});

module.exports = router;
