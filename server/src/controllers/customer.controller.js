import { Customer } from '../models/customer.model.js';
import jwt from 'jsonwebtoken';
import { Cart } from '../models/cart.model.js';

const generateAccessAndRefreshToken = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId);
    const accessToken = customer.generateAccessToken();
    const refreshToken = customer.generateRefreshToken();
    customer.refreshToken = refreshToken;
    await customer.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message:
          'Something went wrong while Generating Access and Refresh Token',
      });
      
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: 'Please fill all the required fields',
      });
    }

    const existedCustomer = await Customer.findOne({ email });

    if (existedCustomer) {
      return res.status(402).json({
        success: false,
        message: 'Email id already exists please provide a new email id',
      });
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password,
    });

    const cart = await Cart.create({ customer });

    if (!cart) {
      return res.status(402).json({
        success: false,
        message: 'Something went wrong while creating the cart',
      });
    }

    const createdCustomer = await Customer.findById(customer._id).select(
      '-password -refreshToken'
    );

    if (!createdCustomer) {
      return res.status(402).json({
        success: false,
        message: 'Something went wrong while registering the Customer',
      });
    }

    const createdCart = await cart.save();

    return res.status(200).json({
      data: createdCustomer,
      success: true,
      message: 'Registered Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to Register',
    });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(402).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Wrong email id',
      });
    }

    const isPasswordValid = await customer.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(402).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      customer._id
    );

    const loggedInCustomer = await Customer.findById(customer._id).select(
      '-password -refreshToken'
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json({
        customer: loggedInCustomer,
        success: true,
        message: 'Login Successfull',
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Login Failed',
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const existedCustomer = await Customer.findById(req.customer?._id)
      .select('-password -refreshToken')
      .populate('address');
    if (!existedCustomer) {
      res.status(404).json({
        success: false,
        message: 'Customer does not exits with this token',
      });
    }
    return res.status(200).json({
      data: existedCustomer,
      success: true,
      message: 'Customer details found',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while getting user details',
    });
  }
};

const logoutCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(
      req.customer._id,
      { $set: { refreshToken: undefined } },
      { new: true }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json({ success: true, message: 'Logged Out Successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while logging out',
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.body.refreshToken || req.cookies.refreshToken;

  console.log('Body:', req.body.refreshToken);
  console.log('cookies: ', req.cookies.refreshToken);

  if (!incomingRefreshToken) {
    return res.status(402).json({
      success: false,
      message: 'Unauthorized Request',
    });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log('Decoded Token :', decodedToken);

    const customer = await Customer.findById(decodedToken?._id);

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Refresh Token',
      });
    }

    if (incomingRefreshToken !== customer?.refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh Token is Expired or Used',
      });
    }

    const options = { httpOnly: true, secure: true };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(customer._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json({
        accessToken,
        success: true,
        message: 'Access Token Refreshed Successfully',
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Invalid Refresh Token',
    });
  }
};

export {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  refreshAccessToken,
  getUserDetails,
};
