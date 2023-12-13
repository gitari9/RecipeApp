import {model, Schema} from 'mongoose'

const creatorSchema = new Schema ({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        reqiured: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
export default model('creatorModel', creatorSchema);