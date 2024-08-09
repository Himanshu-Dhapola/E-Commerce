import { findProductById } from './product.controller.js';
import { Review } from '../models/review.model.js';

const createReview = async (req, res) => {
  try {
    const customer = req.customer;
    const reqData = req.body;
    const product = findProductById(reqData.productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: 'No product found' });
    }

    const review = new Review({
      customer: customer._id,
      product: product._id,
      review: reqData.review,
    });

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong while creating the review',
      });
    }

    await product.save();
    await review.save();

    return res
      .status(201)
      .json({ rating, success: true, message: 'Review created successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the review',
    });
  }
};

const getAllReviews = async (req, res) => {
  const productId = req.params.productId;
  const product = await findProductById(productId);
  const reviews = await Review.find({ product: product._id }).populate(
    'customer'
  );
  return res
    .status(201)
    .json({ reviews, success: true, message: 'Got all Reviews' });
};

export { createReview, getAllReviews };
