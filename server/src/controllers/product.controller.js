import { Product } from '../models/product.model.js';

const createProduct = async (req, res) => {
  try {
    const reqData = req.body;

    const product = await Product.create({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discountPercentage: reqData.discountPercentage,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      size: reqData.size,
      quantity: reqData.quantity,
      category: reqData.category,
    });

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Something went Wrong while creating the product',
      });
    }

    return res.status(201).json({
      data: product,
      success: true,
      message: 'Product Created Succesfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while cresting the product',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = findProductById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product is not found so can not be deleted',
      });
    }
    await Product.findByIdAndDelete(product);
    return res
      .status(201)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      suucess: false,
      message: 'Something went wrong while deleting the product',
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const reqData = req.body;
  await Product.findByIdAndUpdate(productId, reqData);
  return res
    .status(200)
    .json({ success: true, message: 'Product updated successfully' });
};

const findProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).exec();
  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: 'Product not found' });
  }
  return res.status(201).json({
    data: product,
    success: true,
    message: 'Product Found successfully',
  });
};

const getAllProducts = async (req, res) => {
  try {
    const reqQuery = req.query;
    let {
      color,
      size,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;

    pageSize = parseInt(pageSize) || 10;
    pageNumber = parseInt(pageNumber) || 1;

    let query = await Product.find();

    // if (category) {
    //   const existsCategory = await Category.findOne({ name: category });
    //   if (existsCategory) {  
    //     query = query.where('category').equals(existsCategory._id);
    //   } else {
    //     return res.status(201).json({
    //       data: { content: [], currentPage: 1, totalPages: 0 },
    //       message: 'No Product Found With this selected Category',
    //       success: true,
    //     });
    //   }
    // }

    if (color) {
      const colorSet = new Set(
        color.split(',').map((color) => color.trim().toLowerCase())
      );
      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join('|'), 'i') : null;

      query = query.where('color').regex(colorRegex);
    }

    if (size) {
      const sizeSet = new Set(size);
      query = query.where('size.name').in([...sizeSet]);
    }

    if (minPrice && maxPrice) {
      query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
      query = query.where('discountPercentage').gte(minDiscount);
    }

    if (stock) {
      if (stock === 'in_stock') {
        query = query.where('quantity').gt(0);
      } else if (stock === 'out_of_stock') {
        query = query.where('quantity').gt(1);
      }
    }

    if (sort) {
      const sortDirection = sort === 'price_high' ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);
    console.log('TOTAL PRODUCTS', totalProducts);

    const skip = (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    console.log('SECOND', products);

    const totalPages = Math.ceil(totalProducts / pageSize);

    return res.status(201).json({
      data: { content: products, currentPage: pageNumber, totalPages },
      message: 'Products Filtered Successfully!!!',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the products',
    });
  }
};

const createMultipleProducts = async (req, res) => {
  const products = req.body;
  for (let product of products) {
    createProduct(product);
  }
  return res
    .status(200)
    .json({ success: true, message: 'Multiple Products Created Successfully' });
};

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    });
    return res
      .status(200)
      .json({ products, success: true, message: 'Searched products' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Search products error',
    });
  }
};

const categorySearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      category: { $regex: keyword, $options: 'i' },
    });

    return res.status(200).json({
      products,
      success: true,
      message: 'products found according to category',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Category products error',
    });
  }
};

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProducts,
  searchProducts,
  categorySearch,
};
