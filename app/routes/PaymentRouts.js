const router = require ("express").Router();
const Auth = require ("../http/middleware/Auth");
const admin= require("../http/middleware/UniversityAdmin");
const controller = require("../http/controller/PaymentController");
router.get('/' ,controller.getPaymentList);
router.get('/:id' , controller.getOne);
router.post('/' , controller.create);
router.put('/:id' ,controller.update );
router.delete('/:id' , controller.delete);

module.exports= router;
