import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRote from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import cors from 'cors';
import path from 'path';


const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const __dirname = path.resolve(); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api',adminRoute);
app.use('/api/user',userRote)


const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(()=>{
    console.log('Db Connected Successfully');
    app.listen(PORT,()=>{
        console.log(`Server is Running : ${PORT}`);  
    });
})
.catch((Error)=>console.log(Error));


