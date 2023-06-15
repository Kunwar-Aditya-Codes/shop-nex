import jwt from 'jsonwebtoken';

export const generateTokens = ({ id, role }: { id: string; role: string }) => {
  const accessToken = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { id, role },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );

  return { accessToken, refreshToken };
};
