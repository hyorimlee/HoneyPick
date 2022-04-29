const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/item', require('./item'))
router.use('/collection', require('./collection'))
module.exports = router