import Customer from '../models/customer';
import { Request, Response } from 'express';
import { generateTokens } from '../utils/generateTokens';
import { hashPassword, comparePassword } from '../utils/hashPassword';

/**
 * @description Register a new customer
 * @access public
 * @route POST /api/v1/auth/sign_up
 * @param { firstName , lastName , email , password} req
 * @returns { success , accesstoken , refreshtoken in cookie } res
 */
export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const foundCustomer = await Customer.findOne({ where: { email } });

  if (foundCustomer) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const hashedPassword = await hashPassword(password);

  const newCustomer: any = await Customer.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens({
    id: newCustomer.userId,
    role: 'customer',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(201).json({
    success: true,
    accessToken,
    newCustomer, // to be removed in production
  });
};

/**
 * @description Login a customer
 * @access public
 * @route POST /api/v1/auth/sign_in
 * @param { email , password } req
 * @returns { success , accesstoken , refreshtoken in cookie } res
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all fields',
    });
  }

  const foundCustomer: any = await Customer.findOne({ where: { email } });

  if (!foundCustomer) {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const isMatch = await comparePassword(password, foundCustomer.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const { accessToken, refreshToken } = generateTokens({
    id: foundCustomer.userId,
    role: 'customer',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    accessToken,
    foundCustomer, // to be removed in production
  });
};
