// schema- firstName, lastName, grade, dob
import {model, Schema} from 'mongoose'

const studentSchema = new Schema ({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        reqiured: true
    },
    grade: {
        type: Number,
        required: true
    },
    dob : {
        type: String,
        required: true
    },
})
export default model('studentModel', studentSchema);