import express from 'express'

import {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
} from '../controllers/index.js'
import { isAuth } from '../middlewares/isAuth.js'

export const productRouter = express.Router()

productRouter.get('/products',isAuth,getProducts)
productRouter.get('/products/:id',getProductById)
productRouter.post('/products',addProduct)
productRouter.put('/products/:id',updateProduct)
productRouter.delete('/products/:id',deleteProduct)
