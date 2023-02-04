const express = require('express')
const router = express.Router()
const controller = require('../controllers/projectsController')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/getCategories', controller.getCategories)
router.get('/getProjects', controller.getProjects)
router.post('/add',authMiddleware, controller.add)
router.post('/update',authMiddleware, controller.update)
module.exports = router