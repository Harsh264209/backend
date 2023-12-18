
const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({

title:{type:String,required:true.unique:true},
desc:{type:String,required:true},
price:{type:Number,required:true}

})

const MyProduct=mongoose.model('MyProduct',ProductSchema)

module.exports=MyProduct