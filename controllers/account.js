import express from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// MODELS
import Account from '../models/account.js';

// HELPERS
const router = express.Router();

router.post('/register', async (req, res) => {
    const id = new mongoose.Types.ObjectId();
    const { email, password } = req.body;
    
    // Check if user exists
    Account.findOne({ email: email })
    .then(async account => {
        if (account) {
            return res.status(200).json({
                message: 'Account not available'
            });
        } 
        // user is not found, creating new user
        else {
            const hash = await bcryptjs.hash(password, 10);
            const _account = new Account({
                _id: id,
                email: email,
                password: hash
            })
            _account.save()
            .then(async account_created => {
                const data = { account_created };
                const token = await jwt.sign(data, 'zt43dFwBWT85abZwIGhNRaUlLs9zsQaH');

                return res.status(200).json({
                    message: account_created,
                    token: token
                });
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message
                });
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        });
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    Account.findOne({ email: email })
    .then(async account => {
        if (account) {
            const isMatch = await bcryptjs.compare(password, account.password);

            // Check if password is correct
            if(isMatch)
            {
                const data = { account };
                const token = await jwt.sign(data, 'zt43dFwBWT85abZwIGhNRaUlLs9zsQaH');
    
                return res.status(200).json({
                    message: account,
                    token: token
                });
            }
            else
            {
                return res.status(200).json({
                    message: 'Invalid password'
                });
            }
        } 
        else {
            return res.status(200).json({
                message: 'Account not exist'
            });
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        });
    })
})

export default router;