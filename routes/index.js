const router = require('express').Router();

router.use('/', require('./web'));
router.use('/api', require('./api'));

module.exports = router;