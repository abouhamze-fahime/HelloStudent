const Joi = require("joi");
const joiObjectid = require("joi-objectid");
 Joi.objectId = require("joi-objectid")(Joi);

const validateCreateStudent=(data)=>{
    const schema = Joi.object({
        code :Joi.number().required(),
        fName :Joi.string().min(2).max(100).required(),
        lName :Joi.string().min(2).max(100).required(),
        nationalCode :Joi.string().length(10).required()
    });
    return schema.validate(data);
};
const validateUpdateStudent=(data)=>{
    const schema = Joi.object({
     code : Joi.number(),   
     fName :Joi.string().min(2).max(100),
     lName :Joi.string().min(2).max(100),
     nationalCode: Joi.string().length(10),
     studentId :Joi.objectId().required()

    });
    return schema.validate(data);
};

module.exports={validateCreateStudent ,validateUpdateStudent};




