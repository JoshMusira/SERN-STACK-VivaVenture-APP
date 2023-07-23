
import Stripe from 'stripe';


const stripe = Stripe('sk_test_51NVpxLKkEg3tcVG1mgy3E86JSvVXP9MrQGufkTTnjQyKxx4qMfKQv0prQpumSptCoTWcwm9RQTBjsMKtNCwZhkDT00HyLBSEtl')
const client = 'http://localhost:5173/'

export const stripeCheckout = async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {
        return {

            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image_url],
                    description: item.description,
                    // quantity: item.quantity,
                    metadata: {
                        id: item.product_id
                    }
                },
                unit_amount: item.price * 100
            },
            quantity: item.qty
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "KE"],
        },
        phone_number_collection: {
            enabled: true,
        },

        line_items,
        mode: 'payment',
        success_url: `${client}checkout`,
        cancel_url: `${client}cart`,
    });

    res.send({ url: session.url });
};
