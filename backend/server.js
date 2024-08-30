require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express()


//middleware-runs always inbetween a request and respond
app.use(express.json())//what we do here is taking out information from the request like id in requests such as POST

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()//in order to run the required request after running this.
})

//routes
app.use('/api/workouts',workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{

        //listen for requets
        app.listen(process.env.PORT,()=>{//process is a global variable in node 
        console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch(()=>{
        console.log(error)
    })

