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
productRouter.get('/products/:id',isAuth,getProductById)
productRouter.post('/products',isAuth,addProduct)
productRouter.put('/products/:id',isAuth,updateProduct)
productRouter.delete('/products/:id',isAuth,deleteProduct)
