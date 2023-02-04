const express = require('express')
const router = express.Router()
const controller = require('../controllers/mailerController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/contact', controller.contact)
module.exports = router