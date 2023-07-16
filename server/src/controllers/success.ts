import { Request, Response } from 'express';
import Success from '../models/success';

/**
 * @description Verify token
 * @access private
 * @route POST /api/v1/verify/success
 * @param { token } req
 * @returns { success,isValid } res
 */
export const verifySuccessToken = async (req: Request, res: Response) => {
  const { id } = req;

  if (!id) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthenticated!' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }

  const foundToken = await Success.findOne({ token });

  if (!foundToken) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  await Success.deleteOne({ token });

  return res.status(200).json({ success: true });
};
