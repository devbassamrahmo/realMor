const express = require('express')
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors')

//cors 
app.use(
    cors({
      origin: ["http://localhost:5173", "https://ecommerce3-ahmd.netlify.app"], 
      credentials: true, 
    })
  );
//routes

const userRoute = require('./routes/userRouter')
app.use('/user' , userRoute);

const clientBankRoute = require('./routes/client.routes');
app.use('/bankclient' , clientBankRoute);

const propertyRoutes = require('./routes/property.routes');
app.use('/property' , propertyRoutes);

const calendarRouter = require('./routes/calendar.routes');
app.use('/calendar' , calendarRouter);

//end of routes

//new
mongoose.connect(process.env.DB_URL).then(()=>{
   app.listen(port , ()=>{
        console.log(`http://localhost:${port}`);
    })
}).catch((err) =>{
    console.log(err)
})


