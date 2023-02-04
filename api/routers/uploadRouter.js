const express = require('express')
const router = express.Router()
const controller = require('../controllers/uploadController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/',authMiddleware, controller.uploadFiles)
module.exports = router