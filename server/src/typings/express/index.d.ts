declare namespace Express {
  export interface Request {
    id?: string;
    isAdmin?: boolean;
    rawBody?: Buffer;
  }
}
