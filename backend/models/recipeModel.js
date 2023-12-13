import mongoose, {model, Schema} from 'mongoose'

const commentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

})

const recipeSchema = new Schema ({

    image: {
        type: String,
        reqiured: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    directions: {
        type: Array,
        reqiured: true
    },
    title: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        reqiured: false
    },
    comments: [commentSchema],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creatorModel'
    }
})
export default model('recipeModel', recipeSchema)