import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      default: 'Customer',
    },
    refreshToken: {
      type: String,
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    payment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
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
  },
  { timestamps: true }
);
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

customerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

customerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

customerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Customer = mongoose.model('Customer', customerSchema);
