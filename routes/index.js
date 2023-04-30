const router = require('express').Router();
const apiRoutes = require('./api');

const cwd = process.cwd();
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
