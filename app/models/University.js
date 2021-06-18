const mongoose = require ("mongoose");
const jwt = require ("jsonwebtoken");

const config = require ("config");
const schemaCourse = new mongoose.Schema({
    courseId:{type:Number , required: true},
    courseName:{type :String , required: true},
    unit :{type :Number , required:true},
    yearNo :Number ,
    amount:{type:Number , required:true}
});

const schemaPay = new mongoose.Schema({
    payId  :{type:Number, required: true},
    amount :{type :String , required: true},
    description :{type :String , required:true},
     courseId:[schemaCourse] ,
    userId:Number,
    payDate :String ,
});

schemaPay.methods.generateAuthToken= function (){
    const data ={
    _id :this._id , 
    username : this.name , 
    role :"admin"
};
return jwt.sign(data , config.get("jwtPrivateKey"));
};

const paymentModel= mongoose.model('StudentPayments' , schemaPay);
const courseModel= mongoose.model("courseModel" , schemaCourse);

module.exports={paymentModel , courseModel };