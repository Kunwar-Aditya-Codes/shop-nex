import Customer from '../models/customer';
import { Request, Response } from 'express';
import { generateTokens } from '../utils/generateTokens';
import { hashPassword } from '../utils/hashPassword';

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

  const { accessToken, refreshToken } = generateTokens(newCustomer.userId);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/api/v1/auth/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(201).json({
    success: true,
    accessToken,
    data: newCustomer, // to be removed in production
  });
};

/**
 * @description Login a customer
 * @access public
 * @route POST /api/v1/auth/sign_in
 * @param { email , password } req
 * @returns { success , accesstoken , refreshtoken in cookie } res
 */
export const login = async (req: Request, res: Response) => {};
