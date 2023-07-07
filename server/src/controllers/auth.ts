import Customer from "../models/customer";
import Verification from "../models/verification";
import { Request, Response } from "express";
import { generateTokens } from "../utils/generateTokens";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import optGenerator from "otp-generator";
import { sendVerificationEmailToUser } from "../utils/sendMail";
import jwt from "jsonwebtoken";

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
      message: "Please fill all fields",
    });
  }

  const foundCustomer = await Customer.findOne({ email }).lean().exec();

  if (foundCustomer) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newCustomer = await Customer.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens({
    id: newCustomer._id.toString(),
    role: "customer",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
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
      message: "Please fill all fields",
    });
  }

  const foundCustomer = await Customer.findOne({ email }).lean().exec();

  if (!foundCustomer) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await comparePassword(password, foundCustomer.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const { accessToken, refreshToken } = generateTokens({
    id: foundCustomer._id.toString(),
    role: "customer",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    accessToken,
    foundCustomer, // to be removed in production
  });
};

/**
 * @description Send verification email to customer
 * @access private
 * @route POST /api/v1/auth/send_verification_email
 * @param { email } req
 * @returns { success } res
 */
export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  const foundCustomer = await Customer.findOne({
    email,
  })
    .lean()
    .exec();

  if (!foundCustomer) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const otp = optGenerator.generate(6);

  await Verification.create({
    email,
    otp,
  });

  const info = await sendVerificationEmailToUser({ email, otp });

  return res.status(200).json({
    success: true,
    message: "Verification email sent",
    info, // to be removed in production
  });
};

/**
 * @description Verify customer email
 * @access private
 * @route POST /api/v1/auth/verify_email
 * @param { email , otp } req
 * @returns { success } res
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  const foundVerification = await Verification.findOne({
    email,
    otp,
  });

  if (!foundVerification) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isExpired = new Date(Date.now()) > foundVerification.expiresAt;

  if (isExpired) {
    await Verification.deleteOne({
      email,
      otp,
    });

    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  await Customer.findOneAndUpdate(
    {
      email,
    },
    { isVerified: true },
    { new: true }
  );

  await Verification.deleteOne({
    email,
    otp,
  });

  return res.status(200).json({
    success: true,
    message: "Email verified",
  });
};

/**
 * @description Login admin
 * @access public
 * @route POST /api/v1/auth/admin/sign_in
 * @param { email , password } req
 * @returns { success , accesstoken , refreshtoken in cookie } res
 */
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const { accessToken, refreshToken } = generateTokens({
    id: "39f0432c-b949-438c-aed6-e4d759f19a76",
    role: "admin",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

/**
 * @description Refresh Token
 * @access private
 * @route POST /api/v1/auth/refresh_token
 * @param { cookie } req
 * @returns { success , accesstoken , refreshtoken in cookie } res
 */
export const refreshToken = async (req: Request, res: Response) => {
  const cookie = req.cookies;

  const refreshToken = cookie?.refreshToken;

  if (!refreshToken) {
    return res.status(203).json({ message: "Unauthenticated!" });
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  const { id, role } = decoded as { id: string; role: string };

  let foundUser;

  if (role === "customer") {
    foundUser = await Customer.findOne({
      _id: id,
    })
      .lean()
      .exec();
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens({
    id,
    role,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    accessToken,
  });
};
