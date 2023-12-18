
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const userRoutes = require('./Routes/UserRoutes');
const dbConnect=process.env.Db_String
const port=process.env.port || 5000

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


mongoose.connect("mongodb+srv://harsh:harsh45@cluster0.niwycbg.mongodb.net/").then(()=>{console.log("Mongodb connected success")})

app.get('/',(req,res)=>{
    res.send("Hi I am working properly")
})


app.use('/api/user', userRoutes);



app.listen(5000,()=>{
   console.log("app is running on port 5000")
})



