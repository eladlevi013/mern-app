import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

//MODELS
import Account from '../models/account.js';

router.get('/greeting', async(req,res) => {
    return res.status(200).json({
        message: 'Hello from the dark side of the moon'
    })
})

router.post('/signup', async(req,res) => {

    const {firstName,lastName,email,password} = req.body;
    Account.findOne({email: email})
    .then(async account => {
        if(account){
            return res.status(200).json({
                message: 'Account not available'
            })
        }

        const id = new mongoose.Types.ObjectId();
        const hash = await bcryptjs.hash(password,10);

        const _account = new Account({
            _id: id,
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hash,
            role:'User'
        })

        _account.save()
        .then(accountCreated => {
            return res.status(200).json({
                message: 'Account created',
                data: accountCreated
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.post('/signin', async(req,res) => {
    const { email,password } = req.body;
    Account.findOne({email:email})
    .then(async account => {
        if(!account){
            return res.status(200).json({
                message: 'Account not exist'
            })
        }

        const isMatch = await bcryptjs.compare(password, account.password);
        if(!isMatch){
            return res.status(200).json({
                message: 'Password not match'
            })
        }

        const token = await jwt.sign({account}, process.env.JWT_KEY, {expiresIn: '30d'});
        return res.status(200).json({
            message: 'You are logged in',
            token: token
        })

    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

export default router;