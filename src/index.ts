import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToDb from './utils/database';
import userRouter from './routes/user.route';

dotenv.config();
const app: Express = express();
const PORT: number = parseInt(process.env.PORT!) || 5000;
const MONGODB_URI = process.env.MONGODB_URI!;

connectToDb(MONGODB_URI);

const corsOptions = {
  origin: ['*'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

// Global middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
