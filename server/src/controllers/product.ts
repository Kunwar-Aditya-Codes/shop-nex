import Product from '../models/product';
import { Request, Response } from 'express';

/**
 * @description Create a new product
 * @access private
 * @route POST /api/v1/product/admin/create
 * @param { productName, productDescription, price, stock, variants, category, image } req
 * @returns { success, message, product } res
 */
export const createProduct = async (req: Request, res: Response) => {
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const {
    productName,
    productDescription,
    price = 0.0,
    stock = 0,
    variants = [],
    category = [],
  } = req.body;

  if (!productName || !productDescription) {
    return res.status(400).json({
      success: false,
      message: 'Please provide product name and description',
    });
  }

  const product = await Product.create({
    productName,
    productDescription,
    price,
    stock,
    variants,
    category,
  });

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product, // remove this in production
  });
};

/**
 * @description Get all products
 * @access public
 * @route GET /api/v1/product/all
 * @returns { success, message, products } res
 */
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();

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

  const product = await Product.findOne({
    where: {
      productId,
    },
  });

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
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const { productId } = req.params;

  const updatedProduct = await Product.update(
    { ...req.body },
    { where: { productId } }
  );

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
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const { productId } = req.params;

  const deletedProduct = await Product.destroy({
    where: {
      productId,
    },
  });

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
