import cloundinary from '../config/cloudinary';
import Product from '../models/product';
import { Request, Response } from 'express';

/**
 * @description Create a new product
 * @access private
 * @route POST /api/v1/product/admin/create
 * @param { productName, productDescription, price, category, image } req
 * @returns { success, message, product } res
 */
export const createProduct = async (req: Request, res: Response) => {
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const {
    productName,
    productDescription,
    price = 0.0,
    category,
    productImage,
  } = req.body;

  if (!productName || !productDescription) {
    return res.status(400).json({
      success: false,
      message: 'Please provide product name and description',
    });
  }

  const uploadResponse = await cloundinary.uploader.upload(productImage, {
    upload_preset: 'shop-nex',
  });

  await Product.create({
    productName,
    productDescription,
    price,
    category,
    productImage: uploadResponse.secure_url,
  });

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
  });
};

/**
 * @description Get all products
 * @access public
 * @route GET /api/v1/product/all
 * @returns { success, message, products } res
 */
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({}).lean().exec();

  if (!products) {
    return res.status(404).json({
      success: false,
      message: 'No products found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    products,
  });
};

/**
 * @description Get a single product
 * @access public
 * @route GET /api/v1/product/:productId
 * @param { id } req
 * @returns { success, message, product } res
 */
export const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).lean().exec();

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    product,
  });
};

/**
 * @description Update a product
 * @access private
 * @route PATCH /api/v1/product/admin/:productId
 * @param { id } req
 * @returns { success, message } res
 */
export const updateProduct = async (req: Request, res: Response) => {
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const { productId } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(productId, {
    ...req.body,
  });

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
  });
};

/**
 * @description Delete a product
 * @access private
 * @route DELETE /api/v1/product/admin/:productId
 * @param { id } req
 * @returns { success, message } res
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const { isAdmin } = req;

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const { productId } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
};
