import { login, Register, loginRequired } from '../controllers/auth.js'
import { getAllUsers, deleteUser, updateAddress, createAddress } from '../controllers/user.js';
//Users
const userRoutes = (app) => {
    app.route('/user')
        .get(loginRequired, getAllUsers)

    app.route('/user/:user_id')
        .post(loginRequired, createAddress)
        .put(loginRequired, updateAddress)
        .delete(loginRequired, deleteUser)
    // auth routes
    app.route('/auth/register')
        .post(Register);

    app.route('/auth/login')
        .post(login);
}
export default userRoutes;
