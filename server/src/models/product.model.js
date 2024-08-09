import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    brand: {
      type: String,
      required: true,
    },
    color: { type: String },
    size: [
      {
        name: { type: String },
        quantity: { type: Number },
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
      },
    ],
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    numRatings: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
