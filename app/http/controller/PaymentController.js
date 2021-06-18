

const  {paymentModel} = require("../../models/University");
const _ = require("lodash");
const {validateCreatePayment ,validateUpdatePayment } = require ("../validator/PaymentValidator")
const bcrypt =require("bcrypt");

class PaymentController {
    async getPaymentList(req , res){
       const list = await paymentModel.find() 
       .select("amount  description  payDate payId" ).limit(20);
       res.send(list);
         }

    async getOne(req , res){
       const id = req.params.id;
       const data = await paymentModel.findById(id)
       .select("amount  description  payDate payId" );
       if(!data) return res.status(404).send("not found");
       res.send(data);
        }
    async create(req , res){
          const {error} = validateCreatePayment(req.body);
          if(error) return res.status(400).send(error.message);
          let Payment = new paymentModel(_.pick (req.body ,[
              "payId" ,
              "amount" ,
              "description", 
              "payDate", 
              "courseId" , 
              "userId" 
            ])
          );
          Payment= await Payment.save();
          res.send(Payment);
         }

async update(req , res){
       const id = req.params.id;
       const {error} = validateUpdatePayment(req.body);
       if(error) return res.status(400).send(error.message);
       const result = await  paymentModel.findByIdAndUpdate(id , {
           $set : _.pick (req.body ,[
          "payId" ,
          "amount" ,
          "description", 
          "payDate", 
          "courseId" , 
          "userId" 
         ])
           },{new :true});
           if (!result) return res.status(404).send("not found!")
           res.send(_.pick (result ,[
              "payId" ,
              "amount" ,
              "description", 
              "payDate" ,
              "courseId" , 
              "userId" 
             ])
              );
           }
async delete(req , res){
        const id = req.params.id;
        const result = await paymentModel.findByIdAndRemove (id);
        res.status(200).send();
        }
}

module.exports= new PaymentController;