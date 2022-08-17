import {
    addProductDB,
    deleteProductDB,
    readAllProductsDB,
    readProdDB,
    updateProdDB,
} from '../services/index.js';

/* ---------------------------------CRUD DE PRODUCTOS----------------------------------------- */
export const getProducts = async (req, res, next) => {
    try {
        const products = await readAllProductsDB();
        const cartId = req.session.cartId;
        res.status(200).render('layout/products', { products, cartId });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const dbResProduct = await readProdDB(productId);
        let flag = true;
        if (dbResProduct && dbResProduct !== null) {
            let producto = dbResProduct;
            let cartId = req.session.cartId;
            console.log(producto, cartId);
            res.render('layout/productByid', {producto, cartId,flag});
        } else {
            flag=false
            res.status(404).render('layout/productByid',{flag})
        }
    } catch (error) {
        return next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const newProduct = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            stock: req.body.stock,
            precio: req.body.precio,
            foto: req.body.foto,
        };
        const dbRes = await addProductDB(newProduct);
        if (dbRes) {
            res.send(dbRes);
        } else {
            throw dbRes;
        }
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const dbRes = await deleteProductDB(productId);
        if (dbRes) {
            res.send(`Producto con id ${productId} borrado con exito`);
        } else {
            throw dbRes;
        }
    } catch (error) {
        return next(error);
    }
};
export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const newProd = req.body;
        const dbRes = updateProdDB(productId, newProd);
        if (dbRes) {
            res.send(`Producto con id ${productId} actualizado`);
        } else {
            throw dbRes;
        }
    } catch (error) {
        return next(error);
    }
};
