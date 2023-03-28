const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    },
})
module.exports=mongoose.model('recipes',UserSchema);