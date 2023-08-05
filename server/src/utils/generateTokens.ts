import jwt from 'jsonwebtoken';

export const generateTokens = ({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) => {
  const accessToken = jwt.sign(
    { id, isAdmin },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m',
    }
  );

  const refreshToken = jwt.sign(
    { id, isAdmin },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
};
