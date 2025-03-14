const express = require('express')
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
//routes

const userRoute = require('./routes/userRouter')
app.use('/user' , userRoute);

const clientBankRoute = require('./routes/client.routes');
app.use('/bankclient' , clientBankRoute);

const propertyRoute = require('./routes/property.Routes');
app.use('/property' , propertyRoute);

//end of routes

mongoose.connect(process.env.DB_URL).then(()=>{
   app.listen(port , ()=>{
        console.log(`http://localhost:${port}`);
    })
}).catch((err) =>{
    console.log(err)
})


