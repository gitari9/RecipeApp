import express from "express";
import bcrypt from 'bcrypt'
import creatorModel from '../models/creatorModel.js'
import jwt from 'jsonwebtoken';

const router = express.Router()
const saltRound = 10

router.post('/creator-login', async(req, res) => {
    if(!req.body.email || !req.body.password) {
        res.send({
            message: 'Must fill in all the details'
        })
    } else {
        const creator = await creatorModel.findOne({email: req.body.email})
        bcrypt.compare(req.body.password, creator.password, (err, response) => {
            if(err){
                res.send({
                    message: 'Wrong password or email',
                    data: err.message
                })
            }
        
            if(response === true) {
                const token = jwt.sign({creatorId: creator._id}, 'MY_SECRET_KEY')
                res.send({
                    message: 'User authenticated successfully',
                    token: token,
                    creator: creator
                })
            }else {
                console.log(response)
                res.send({
                    message: 'wrong password or email'
                })
            }
        })

    }
})


router.post('/creator-register',(req, res) => {
    if(!req.body){
        res.send({
            message: 'Ensure form is filled'
        })
    }else {
        bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
        if(err) {
            res.send ({
                message: 'Please provide password',
                data: err.message
            })
        }else{
            const creator = new creatorModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
            })
            const newCreator = await creator.save()
            res.send({
                message: 'Successfully registered creator',
                data: newCreator
            })

        }})
    }
})

export default router