import { loginRequired } from "../controllers/auth.js";
import { getLatestTransactions } from "../controllers/transaction.js"

const transactionRoute = (app) => {
    app.route('/transaction')
        .get(loginRequired, getLatestTransactions)

}

export default transactionRoute;