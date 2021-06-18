
const mongoose = require ("mongoose");
const jwt = require ("jsonwebtoken");
const config = require ("config");
const UserSchema = new  mongoose.Schema({
     code : String ,
     fullName : {type : String , required : true}  , 
     phone :  {type : String , unique: true , required : true },
     password : {type : String , required : true} ,
     email:{type:String , required : true} , 
     role : { type :String , required : true , default :"user"} , 
     active :{type :Boolean , default:false}

});

UserSchema.methods.generateAuthToken= function (){
          const data ={
          _id :this._id , 
          fullName : this.fullName , 
          role : this.role
     };
     return jwt.sign(data , config.get("jwtPrivateKey"));
    
};

const UserModel= mongoose.model("User" , UserSchema);

module.exports=UserModel;