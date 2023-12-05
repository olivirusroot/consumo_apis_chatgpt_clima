import express from 'express'
import dotenv from 'dotenv'
import { connectDatabase } from './config/db.js'
import routerProducts from './routes/products.routes.js'
import routerUsers from './routes/users.routes.js'
import routerPlan from './routes/chatgpt.routes.js'
import routerClima from './routes/clima.routes.js'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT

app.use('/api/products', routerProducts)
app.use('/api/users', routerUsers)
app.use('/api/chatgpt', routerPlan)
app.use('/api/clima',routerClima)
connectDatabase()
app.listen(PORT, () => {
    console.log("El servidor se esta ejecutando " + PORT)
})
