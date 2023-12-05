import express from 'express'
import { createProducts, getProducts, deleteProducts, getProductsByCategory } from '../controllers/products.controllers.js'
const router = express.Router()

router.post('/createProducts', createProducts)
router.get('/getProducts', getProducts)
router.get('/getProductsCategory/:category', getProductsByCategory)
router.delete('/deleteProducts/:id', deleteProducts)

export default router