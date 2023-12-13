import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import classRoutes from './routes/classRoutes.js'
import enquiryRoutes from './routes/enqiuryRoutes.js' 
import creatorRoutes from './routes/creatorRoutes.js'
import userRoutes from './routes/userRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express()
const PORT = 5000
app.use(bodyParser.json());
app.use(express.static('uploads'))

app.use(cors());
app.use('/', classRoutes)
app.use('/',enquiryRoutes)
app.use('/',userRoutes)
app.use('/',creatorRoutes)
app.use('/',recipeRoutes)
app.use('/',commentRoutes)

const mongoURI = 'mongodb+srv://gitariveronica968:smSOgWELaC2YldHb@cluster0.pbysyiu.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI)
  .then(() => console.log('connected to mongo DB'))
  .catch((error) =>console.log(error))

app.listen(PORT, ()=>{
    console.log('listening on PORT ' + PORT);
})

// smSOgWELaC2YldHb
// Q1xEdPnGjeBbAaA2