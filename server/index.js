import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './routes/users.js'
import questionsRouter from './routes/Questions.js'
import answerRouter from './routes/Answers.js'
import path from 'node:path'
import { fileURLToPath } from 'url';


const app = express();
dotenv.config();
app.use(express.json({limit:"30mb", extended:true }));
app.use(express.urlencoded({limit:"30mb", extended:true }));
app.use(cors());

// app.get('/', (req,res)=>{
//     res.send("This is a stack overflow")
// })

app.use('/user',userRouter)
app.use('/questions',questionsRouter)
app.use('/answer',answerRouter)

const PORT = process.env.PORT || 5000

const DB_URL =  process.env.CONNECTION_URL

mongoose.connect(DB_URL,{ useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{ app.listen(PORT,()=>{ console.log(`server running on port ${PORT}`) })})
    .catch((err)=> console.log(err.message))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", function (_, res) {res.sendFile(path.join(__dirname, "../build/index.html"),function (err) {res.status(500).send(err);});});  


console.log('directory-name', __dirname);
console.log(path.join(__dirname, '../build', 'index.html'));