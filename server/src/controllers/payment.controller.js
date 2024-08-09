import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  try {
    const { product } = req.body;
    const lineItems = product?.cartItem.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product?.product?.title,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/failed',
    });

    return res.status(200).json({
      id: session.id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while making payment',
      });
  }
};

export { payment };
