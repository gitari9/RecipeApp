import express from 'express';
import multer from 'multer';
import fs from 'fs'
import recipeModel from '../models/recipeModel.js'
import creatorCheckAuth from './auth/creatorCheckAuth.js';
const router = express.Router();

const upload = multer({dest: 'uploads'})
const uploadRecipeImage = upload.fields([
    {name: 'image',maxCount: 1}
])
    
router.post('/recipe', creatorCheckAuth, uploadRecipeImage, async(req, res) => {
    let image = req.files.image[0]
    console.log(image); //object: extension: mimetype:'image/png', filename, size
    let extension = image.mimetype.split('/')[1]
    let newImageName =image.filename + '.' + extension
    fs.rename(`./uploads/${image.filename}`, `./uploads/${newImageName}`, () => {
        console.log('image has been renamed')
    })
    console.log(req.creator)
    let newRecipe = new recipeModel({
        title: req.body.title,
        image: newImageName,
        ingredients: JSON.parse(req.body.ingredients),
        directions: JSON.parse(req.body.directions),
        creatorId: req.creator._id
    })
    let recipe = await newRecipe.save()
    res.send({
        message: 'Successfully created recipe',
        data: recipe
    })
})

router.get('/recipe', async(req, res) => {
    try {
        const recipes = await recipeModel.find()
        res.send({
            message: 'Successfully fetched recipe',
            data: recipes
        })
    }catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
 
})

router.get('/recipe/get/:id', async(req, res) => {
    try{
        const recipe = await recipeModel.findOne({_id: req.params.id})
        res.send({
            message: 'Succsessfully fetched recipe',
            data: recipe
        })
    }catch (error) {
        res.send({
            message: 'Error occured',
            data: error.message
        })
    }
    
})
router.put('/recipe/:id', creatorCheckAuth, uploadRecipeImage, async(req, res)=> {
    // find the recipe that is being edited or updated
    // check if there's a new 
    // if thre's a new image, delete the image we saved, get the new image rename it and store it
    // make changes to the recipe in the database

    try {
        const recipe = await recipeModel.findOne({_id: req.params.id})
        if(JSON.stringify(req.creator._id) === JSON.stringify(req.recipe.creatorId)){
            recipe.title = req.body.title,
            recipe.ingredients = JSON.parse(req.body.ingredients),
            recipe.directions = JSON.parse(req.body.directions)
    
            if(req.files.image){
                // delete image
                fs.unlink(`/uploads/${recipe.image}`, (err) => {
                    if(err){
                        console.log(err)
                    }else {
                        console.log('deleted file successfuly')
                    }
                })
    
                let image = req.files.image[0];
                let extension = image.mimetype.split('/')[1];
                let newImageName = image.fileName + ',' + extension;
                fs.rename(`./uploads/${image.fileName}`, `./uploads/${newImageName}`, () => {
                    console.log('image has been renamed successfully')
                })
                recipe.image = newImageName;
                const newRecipe = await recipe.save();
                res.send({
                    message: 'Successfully edited the recipe',
                    data: newRecipe
                })
            }else {
                const newRecipe = await recipe.save()
                res.send({
                    message: 'Successfully edited the recipe',
                    data: newRecipe
                })
            }
        }else {
            res.send({
                message: 'Permission denied'
            })
        }
    }catch (error) {
        res.send({
            message: 'error occured',
            data: error.message
        })
    }
})

// create a route for deleting a recipe

router.delete('/recipe/:id', creatorCheckAuth, async(req, res) => {
    try {
        const recipe = await recipeModel.findOne({_id: req.params.id})
         // req.creator.id , recipe.creatorId
        if(JSON.stringify(req.creator._id) === JSON.stringify(recipe.creatorId)){
            fs.unlink(`/uploads/${recipe.image}`, (err) => {
                if(err){
                    console.log(err)
                }else {
                    console.log('deleted file successfuly')
                }
            })
            await recipeModel.deleteOne({_id: req.params.id})
            res.send({
                message: 'Successfully deleted recipe'
            })
        }else {
            res.send({
                message: 'Permission denied'
            })
        }
          
    } catch (error){
        res.send({
            message: 'error occured',
            data: error.message
        })
    }    
})

export default router;