import express from 'express';
import bp from 'body-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// consts
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

// Server setup
const app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Import the routes from controllers\hello.js
import hello from './controllers/hello.js';
app.use('/hello', hello);
// Import the routes from controllers\account.js
import account from './controllers/account.js';
app.use('/account', account);

//  Connect to MongoDB and start the server
mongoose.connect(MONGODB_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        }
    );
})
.catch((error) => {
    console.log(error);
});