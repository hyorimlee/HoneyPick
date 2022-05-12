const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/item', require('./item'))
router.use('/collection', require('./collection'))
router.use('/follow', require('./follow'))
router.use('/vote', require('./vote'))
router.use('/phone', require('./phone'))
router.use('/profile',require('./profile'))
router.use('/like', require('./like'))
<<<<<<< HEAD
router.use('/search', require('./search'))
=======
router.use('/recommend', require('./recommend'))
>>>>>>> 67dbb8c3187b5f2ae74bbb6ab55a338803227d58
module.exports = router
