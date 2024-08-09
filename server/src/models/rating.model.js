import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Rating = mongoose.model('Rating', ratingSchema);
