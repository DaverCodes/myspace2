const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const reactRoutes = require('./reactRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/reaction', reactRoutes);

module.exports = router;
