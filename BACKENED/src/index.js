import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connection.js';
import router from './router/staticRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({
    path: './env'
});

const app = express();

// Connect to the database
connectDB();

app.use(cors({
    origin: "https://1-mern-project-frontend.vercel.app",
    credentials: true
}))

app.use(cookieParser());  // Allows you to access and set cookies, enabling CRUD operations on cookies

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {
   return res.status(200).send("Backened Working");
});
