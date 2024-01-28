import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToDb from './utils/database';

dotenv.config();
const app: Express = express();
const PORT: number = parseInt(process.env.PORT!) || 5000;
const MONGODB_URI = process.env.MONGODB_URI!;

connectToDb(MONGODB_URI);

// Global middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
