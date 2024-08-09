import { findProductById } from './product.controller.js';
import { Rating } from '../models/rating.model.js';

const createRating = async (req, res) => {
  try {
    const customer = req.customer;
    const reqData = req.body;

    const product = findProductById(reqData.productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: 'No product found' });
    }

    const rating = new Rating({
      customer: customer._id,
      product: product._id,
      rating: reqData.rating,
    });

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong while creating the rating',
      });
    }

    await product.save();
    await rating.save();

    return res
      .status(201)
      .json({ rating, success: true, message: 'Rating created successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the rating',
    });
  }
};

const getProductRating = async (req, res) => {
  const productId = req.params.productId;
  const ratings = await Rating.find({ product: productId });
  return res
    .status(201)
    .json({ ratings, success: true, message: 'Got all Ratings' });
};

export { createRating, getProductRating };
