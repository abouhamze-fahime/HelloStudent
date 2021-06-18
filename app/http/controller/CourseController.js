const {courseModel} = require("../../models/University");
const _ = require("lodash");
const {validateCreateCourse ,validateUpdateCourse } = require ("../validator/CourseVlidator")

class CourseController {

    async getList(req , res){
        const list = await courseModel.find()
        .select("courseId  courseName unit yearNo amount" )
        .limit(20);
        res.send(list);
     }

async addone(req , res){
    console.log(req.user);
    res.send("hi")
}



async getOne(req , res){
    const id = req.params.id;
    const data = await courseModel.findById(id)
    .select("courseId  courseName unit yearNo amount " );  //   select("-adminPassword" );
    if(!data) return res.status(404).send("not found");
    
    res.send(data);
}


async create(req , res){
    const {error} = validateCreateCourse(req.body);
    if(error) return res.status(400).send(error.message);
    let Course = new courseModel(_.pick (req.body ,[
        "courseId" ,
        "courseName" ,
        "unit", 
        "yearNo", 
        "amount"
      ])
    );

    Course= await Course.save();
    res.send(Course);
   }

   async update(req , res){
    const id = req.params.id;
    const {error} = validateUpdateCourse(req.body);
    if(error) return res.status(400).send(error.message);
    const result = await  courseModel.findByIdAndUpdate(id , {
        $set : _.pick (req.body ,[
            "courseId" ,
            "courseName" ,
            "unit", 
            "yearNo", 
            "amount"

      ])
        },{new :true});
        if (!result) return res.status(404).send("not found!")
        res.send(_.pick (result ,[
            "courseId" ,
            "courseName" ,
            "unit", 
            "yearNo", 
            "amount"

          ])
           );
        }



async delete(req , res){

}

}

module.exports= new CourseController;