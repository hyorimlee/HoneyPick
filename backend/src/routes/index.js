var router = require('express').Router()

<<<<<<< HEAD
router.use('/api/auth', require('./auth'));
=======
// router.use('/api', require('./api'))
>>>>>>> ea63f03a648f4256bc6235f7870619aeaf0269e7

router.use('/item', require('./item'))

module.exports = router