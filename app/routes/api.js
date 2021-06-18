const router = require ("express").Router();

const PaymentRoutes = require ("./PaymentRouts");
const UserRoutes = require ("./UserRoutes");
const CourseRoutes = require ("./CourseRoutes");
router.use("/student" ,PaymentRoutes ) ;
router.use("/student" ,UserRoutes ) ;
router.use("/course" ,CourseRoutes ) ;
module.exports= router;
