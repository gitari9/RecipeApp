import jwt from 'jsonwebtoken'
import creatorModel from '../../models/creatorModel.js'

const creatorCheckAuth = (req, res, next) => {
    const { authorization } = req.headers
    // bearer nvfknvfklniednrienefeofnoe
    if( !authorization ) {
        res.send({
            message: 'You must be logged in'
        })
    }else {
        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, 'MY_SECRET_KEY', async(err, data) => {
            if(err) {
                res.send({
                    message: 'You must be logged in'
                })
            }else {
                const creator = await creatorModel.findOne({_id: data.creatorId})
                req.creator = creator
                next()
            }
        })
    }
}
export default creatorCheckAuth
// before a creator creates a recipe they must be logged in
// and to check that is by using jwt token
// creatorCheckAuth.js purpose is to check if the jwt token is valid and to return the id of the creator