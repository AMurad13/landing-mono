import 'dotenv/config';
import express from 'express';
import { usersRouter } from './users/users.route';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

const dbInit = async () => {
  await mongoose.connect(process.env.MONGO_URI!)
}

const appInit = async () => {
  app.use(express.json());

  await dbInit();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.use('/users', usersRouter);
};

appInit();