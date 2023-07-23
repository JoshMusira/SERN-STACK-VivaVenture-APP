import { stripeCheckout } from "../controllers/StripeController.js"

const stripe = (app) => {
    app.route('/stripe').post(stripeCheckout)
}
export default stripe