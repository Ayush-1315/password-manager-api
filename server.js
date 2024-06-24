require("./db");
const express=require('express');
const cors=require('cors');
const helmet=require('helmet'); 
const bodyParser=require('body-parser')
const app=express();

const PORT=process.env.PORT;

const {userRouter}=require('./routers/auth.router');

app.listen(PORT,()=>{
 console.log(`Server is running on PORT: ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("You are developing backend api for password manager")
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(helmet());
app.use('/password-manager',userRouter);

//Global Error Handler
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({message:'Internal Server Error'});
})

//Global 404 Handler
app.use((req,res)=>{
    res.status(404).json({message:'Route not found'});
})