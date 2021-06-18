const StudentModel=require("../../models/University");

class PaymentController {

    async getList(req , res){
    const list = await StudentModel.find()
    .select("amount  description adminUsername payDate payId pic" )
    .limit(20);
    res.send(list);
    }

async getOne(req , res){
    const id = req.params.id;
    const data = await StudentModel.findById(id)
    .select("-adminPassword" );
    if(!data) return res.status(404).send("not found");
    
    res.send(data);
}
async create(req , res){

}
async update(req , res){

}
async delete(req , res){

}

}

module.exports= new PaymentController;