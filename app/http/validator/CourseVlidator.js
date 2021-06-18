const Joi = require("joi");
const joiObjectid = require("joi-objectid");
 Joi.objectId = require("joi-objectid")(Joi);

const validateCreateCourse=(data)=>{
    const schema = Joi.object({
        courseId :Joi.number().required(),
        courseName :Joi.string().required(),
        unit :Joi.string().required(),
        yearNo :Joi.string().length(4).required(),
        amount :Joi.number()
    });
    return schema.validate(data);

         
};
const validateUpdateCourse=(data)=>{
    const schema = Joi.object({
        courseId :Joi.number().required(),
        courseName :Joi.string().required(),
        unit :Joi.string().required(),
        yearNo :Joi.string().length(4).required(),
        amount :Joi.number()

    });
    return schema.validate(data);
};

module.exports={validateCreateCourse ,validateUpdateCourse};




