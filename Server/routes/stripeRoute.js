import { stripeCheckout, webhookHandler } from "../controllers/StripeController.js"
import express from 'express'
const stripe = (app) => {
    app.route('/stripe').post(stripeCheckout)

    app.route('/stripe_webhooks').post(express.raw({ type: 'application/json' }), webhookHandler)

}
export default stripe