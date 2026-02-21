import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { usersRouter } from './users/users.route';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

const dbInit = async () => {
  await mongoose.connect(process.env.MONGO_URI!)
}

const appInit = async () => {
  app.use(express.json());
  app.use(cors());

  await dbInit();

  app.use('/users', usersRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

appInit();