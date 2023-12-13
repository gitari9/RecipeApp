import express from "express";
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const saltRound = 10;

router.post('/login', async(req, res) => {
    // capture email and password from login form -> req.body.email, req.body.password
    if(!req.body.email || !req.body.password){
        res.send({
            message: 'Must fill in all details'
        })
    }else {
        // find a user using the email
        const user = await userModel.findOne({email: req.body.email})
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if(err){
                res.send({
                    message: 'Wrong password or email',
                    error: err.message
                })
            }
            if(response === true) {
                // generate a jwt token - used to check if the user is logged in or not
                const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
                res.send({
                    message: 'User authenticated successfully',
                    token: token,
                    user: user
                })
            }else {
                console.log(response)
                res.send({
                    message:'Wrong password or email'
                })
            }
        })
    }
});

router.post('/register', (req, res) => {
    if(!req.body){
        res.send({
            message: 'Ensure form is filled'
        })
    } else {
        bcrypt.hash(req.body.password, saltRound, async(err, hash) => {
            if(err) {
                res.send({
                    message: 'Please provide passsword',
                    data: err.message
                })
            } else {
                const user = new userModel({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,  
                    password: hash
                    
                })
                const newUser = await user.save();
                res.send({
                    message: 'Successfully reqistered user',
                    data: newUser
                })
            }
        })
    }
});

export default router;