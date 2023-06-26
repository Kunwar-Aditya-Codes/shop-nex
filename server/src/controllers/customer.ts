import Customer from '../models/customer';
import { Request, Response } from 'express';

/**
 * @description Get profile of a customer
 * @access private
 * @route GET /api/v1/customer/profile
 * @param { userId } req
 * @returns { success , customer } res
 */
export const getProfile = async (req: Request, res: Response) => {
  const { id } = req;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request',
    });
  }

  const foundCustomer = await Customer.findById(id)
    .select('-password')
    .lean()
    .exec();

  if (!foundCustomer) {
    return res.status(404).json({
      success: false,
      message: 'Customer not found',
    });
  }

  return res.status(200).json({
    success: true,
    customer: foundCustomer,
  });
};

/**
 * @description Update profile of a customer
 * @access private
 * @route PATCH /api/v1/customer/profile
 * @param { userId , firstName , lastName , email } req
 * @returns { success , customer } res
 */
export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request',
    });
  }

  // const updatedCustomer = await Customer.update(
  //   { ...req.body },
  //   { where: { userId: id } }
  // );

  const updatedCustomer = await Customer.findByIdAndUpdate(id, {
    ...req.body,
  });

  return res.status(200).json({
    success: true,
    customer: updatedCustomer,
  });
};

/**
 * @description Delete profile of a customer
 * @access private
 * @route DELETE /api/v1/customer/profile
 * @param { userId } req
 * @returns { success  } res
 */
export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request',
    });
  }

  const deletedCustomer = await Customer.findByIdAndDelete(id);

  if (!deletedCustomer) {
    return res.status(404).json({
      success: false,
      message: 'Customer not found',
    });
  }

  return res.status(200).json({
    success: true,
  });
};
