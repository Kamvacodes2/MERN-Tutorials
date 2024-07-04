import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());


//Middleware for handling CORS policy
// option 1 
app.use(cors())

// option 2 allowing custom origins * recommended
// app.use(cors({
//     origin: 'http://:localhost:3000',
//     methods: ['GET','POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the MERN STACK Tutorial');
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`APP is listening on port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })