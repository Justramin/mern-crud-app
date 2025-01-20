import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import cors from 'cors';


const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

app.use('/api',route);


const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(()=>{
    console.log('Db Connected Successfully');
    app.listen(PORT,()=>{
        console.log(`Server is Running : ${PORT}`);  
    });
})
.catch((Error)=>console.log(Error));


