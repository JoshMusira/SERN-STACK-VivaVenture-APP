import { login, Register, loginRequired } from '../controllers/auth.js'
import { createProduct, getAllProducts, getCategoryProducts, getProduct, updateProduct, deleteProduct } from '../controllers/products.js';
//Users
const productsRoute = (app) => {
    app.route('/product')
        .get(getAllProducts)
        .post(loginRequired, createProduct);

    app.route('/product/:category')
        .get(getCategoryProducts)

    app.route('/product/:product_id')
        .get(getCategoryProducts)
        .put(loginRequired, updateProduct)
        .delete(loginRequired, deleteProduct)

    app.route('/products/:product_id')
        .get(getProduct)
    // auth routes
    app.route('/auth/register')
        .post(Register);

    app.route('/auth/login')
        .post(login);
}
export default productsRoute;
