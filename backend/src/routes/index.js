const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/item', require('./item'))
router.use('/collection', require('./collection'))
router.use('/follow', require('./follow'))
router.use('/vote', require('./vote'))
router.use('/phone', require('./phone'))
module.exports = router
