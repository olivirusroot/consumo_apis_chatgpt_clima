import express from 'express'
import { createUser, getUser } from '../controllers/users.controllers.js'

const router = express.Router()

router.post('/createUsers', createUser)

router.get('/getUsers', getUser)
export default router