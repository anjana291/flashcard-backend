const express = require('express')
const questionControlleer = require('./controllers/questionController')
const userController= require('./controllers/userController')
const jwtMiddleware = require('./middleware/jwtMiddleware')

const router = new express.Router()

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post('/add-question',jwtMiddleware,questionControlleer.addQuestion)

router.post('/get-questions',questionControlleer.getQuestionsOfCategory)

module.exports = router