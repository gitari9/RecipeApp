import express from "express";
import recipeModel from "../models/recipeModel.js";
import userCheckAuth from "./auth/userCheckAuth.js";

const router = express.Router()

router.get('/recipe', async(req, res) => {
    try{
        const recipe = await recipeModel.findOne({_id: req.params.id})
        res.send({
            message: 'Found comments',
            data: recipe.comments
        })
    }catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
})

router.post('/recipe/comment/:id', userCheckAuth, async(req, res) =>{
    try{
        const recipe = await recipeModel.findOne({_id: req.params.id})
        recipe.comments = [...recipe.comments, {
            userId: req.user._id,
            userName: req.user.firstName + ' ' + req.user.lastName,
            message: req.body.comment
        }
        ]
        const newRecipe = await recipe.save()
        res.send({
            message: 'Added comment',
            data: newRecipe.comments
        })
    } catch (error) {
        res.send({
            Message: 'Error occured',
            data: error.message
        })
    }
})

router.post('/recipe/comment/delete/:id', userCheckAuth, async(req, res) => {
    try{
        // check if the logged in user is the one who created the comment
        const recipe = await recipeModel.findOne({_id: req.params.id})
        const comment = recipe.comments.find((comment) => JSON.stringify(comment._id) ===  JSON.stringify(req.body.commentId))
        // findOne in model -> gets you one item in the database depending on the id
        // find in model -> gets you all the items in the model, eg all the recipes you've stored in the database
        // find -> work with arrays and only returns onne item from the array based on the condition
        if(JSON.stringify(comment.userId) === JSON.stringify(req.user._id)){
            const newComments = recipe.comments.filter((comment) => JSON.stringify(comment._id) !== JSON.stringify(req.body.commentId))
            recipe.comments = newComments;
            const newRecipe = await recipe.save();
            res.send({
                message: 'Successfully deleted comment',
                data: newRecipe.comments
            })
        }else {
            res.send({
                message: 'Permission denied'
            })
        }
    }catch (error) {
        res.send({
            message: 'Error occuered',
            data: error.message
        })
    }
})

export default router;