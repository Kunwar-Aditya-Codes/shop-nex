declare namespace Express {
  export interface Request {
    id?: string;
    role?: string;
    rawBody?: Buffer;
  }
}
