import { createAddress, deleteAddress, getAddress, updateAddress } from '../controllers/address.js';
import { login, Register, loginRequired } from '../controllers/auth.js'

const addressRoutes = (app) => {
    app.route('/address')
        .post(loginRequired, createAddress)


    app.route('/address/:user_id')
        .get(loginRequired, getAddress)
        .put(loginRequired, updateAddress)
        .delete(loginRequired, deleteAddress)
    // auth routes
    app.route('/auth/register')
        .post(Register);

    app.route('/auth/login')
        .post(login);
}
export default addressRoutes