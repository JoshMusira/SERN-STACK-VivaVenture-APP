import { login, Register, loginRequired, checkUser } from '../controllers/auth.js'
import { getAllUsers, deleteUser, updateAddress, createAddress, updateUser, getUser } from '../controllers/user.js';
//Users
const userRoutes = (app) => {
    app.route('/user')
        .get(loginRequired, getAllUsers)

    app.route('/check')
        .post(loginRequired, checkUser)
    app.route('/user/:user_id')
        .get(loginRequired, getUser)
        .post(loginRequired, createAddress)
        .put(loginRequired, updateUser)
        .delete(loginRequired, deleteUser)
    app.route('/user/:user_id')
        .put(loginRequired, updateAddress)
    // auth routes
    app.route('/auth/register')
        .post(Register);

    app.route('/auth/login')
        .post(login);
}
export default userRoutes;
