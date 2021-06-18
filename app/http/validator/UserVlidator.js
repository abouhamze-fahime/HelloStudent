const Joi = require("joi");
const joiObjectid = require("joi-objectid");
 Joi.objectId = require("joi-objectid")(Joi);

const loginValidator=(data)=>{
    const schema = Joi.object({
        phone:Joi.string().length(11).required(),
        password :Joi.string().required()
    });
    return schema.validate(data);
};
const registerValidator=(data)=>{
    const schema = Joi.object({
     code : Joi.number().required(),   
     fullName :Joi.string().required().min(2).max(150),
     phone:Joi.string().required().length(11),
     password: Joi.string().required(),
     email: Joi.string().required()


    });
    return schema.validate(data);
};

module.exports={loginValidator ,registerValidator};




