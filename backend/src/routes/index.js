const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/item', require('./item'))
router.use('/collection', require('./collection'))
router.use('/follow', require('./follow'))
module.exports = router
