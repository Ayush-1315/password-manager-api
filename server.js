require("./db");
const express=require('express');
const app=express();
const PORT=process.env.PORT;
const cors=require('cors');
const {userRouter}=require('./routers/user.router');

app.listen(PORT,()=>{
 console.log(`Server is running on PORT: ${PORT}`)
})

app.get('/',(req,res)=>{
    console.log('First request')
    res.send("You are developing backend api for password manager")
})
app.use(cors());
app.use(express.json());
app.use('/password-manager',userRouter);

