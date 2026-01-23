const stripe = require("../config/stripe");

const initPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(403).json("Amount required");
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Payment failed",
            error: err.message,
        });
    }
};

module.exports = { initPayment };
