import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Happy:Happy1234@cluster0.spdfyze.mongodb.net/cluster0"
);

app.listen(3001, () => {
  console.log('Server started');
})