const Joi = require("joi");
const joiObjectid = require("joi-objectid");
 Joi.objectId = require("joi-objectid")(Joi);

const validateCreatePayment=(data)=>{
    const schema = Joi.object({
        payId :Joi.number().required(),
        amount:Joi.number().required(),
        description :Joi.string(),
       //userId :Joi.required(),
       //courseId :Joi.required(),
        payDate :Joi.string().length(10).required(),
    });
    return schema.validate(data);
};

const validateUpdatePayment=(data)=>{
    const schema = Joi.object({
        payId :Joi.number(),
        amount:Joi.number(),
        description :Joi.string(),
       //userId :Joi.required(),
       //courseId :Joi.required(),
        payDate :Joi.string().length(10),

    });
    return schema.validate(data);
};

module.exports={validateCreatePayment,validateUpdatePayment  };




