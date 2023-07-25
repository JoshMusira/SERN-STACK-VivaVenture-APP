import { loginRequired } from "../controllers/auth.js";
import { deleteOrder, getLatestTransactions, getUserOrders } from "../controllers/transaction.js"

const transactionRoute = (app) => {
    app.route('/transaction')
        .get(loginRequired, getLatestTransactions)

    app.route('/transaction/:user_id')
        .get(loginRequired, getUserOrders)
        .delete(deleteOrder)

}

export default transactionRoute;