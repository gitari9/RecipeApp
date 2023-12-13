import {model, Schema} from 'mongoose'

const enquirySchema = new Schema ({

    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

})
export default model('enquiryModel',enquirySchema)