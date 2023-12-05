import express from 'express'
import { createPlan } from '../controllers/chatgpt.controllers.js'

const router = express.Router()

router.post('/crearplan',createPlan)

export default router