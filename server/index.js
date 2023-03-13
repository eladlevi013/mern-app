import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import accountRouter from './routes/account.js';
import colors from 'colors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

connectDB();

//ROUTES
app.use('/api/accounts', accountRouter);

app.listen(process.env.PORT || 3001, () => console.log(`Server is running on port ${process.env.PORT}`.yellow.underline))