const express = require("express");
const cors =require ('cors');
const mongoose = require("mongoose");
//const morgan = require("morgan");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const ErrorMiddleWare = require("../app/http/middleware/Error");
const bodyParser = require("body-parser");
const api = require ("./routes/api");
const app = express();

class Application {
    constructor() {
        this.setupExpressServer();
        this.setupMongoose();
        this.setupRoutesAndMiddlewares();
        this.setupConfigs();

    }
    setupConfigs() {
        winston.add(new winston.transports.File({ filename: "error-log.log" }));
        winston.add(new winston.transports.MongoDB({
            db: "mongodb://localhost:27017/UniDB",
            level: "error"
        }));
        process.on("uncaughtException", (err) => {
            console.log(err);
            winston.error(err.message);
        });

        process.on("unhandledRejection", (err) => {
            console.log(err);
            winston.error(err.message);
        });
    //     new promise((resolve, reject) => {
    //         reject(new Error("some error"));
    //     })();
    app.set('view engine' , 'html');
    app.set('views' , '../views');
 
 
     }
    setupRoutesAndMiddlewares() {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static('public'));
        if (app.get('env') === 'production') app.use(morgan('tiny'));

        app.use(ErrorMiddleWare);
        app.use(cors());  ///third-party middleware 
        //routers
       app.use("/api" , api);

        app.use(ErrorMiddleWare);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
    setupMongoose() {
        mongoose.connect("mongodb://localhost:27017/UniDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connect to Mongodb...");
            winston.info('db connected');
        }).catch((err) => { console.error("Can not connect to Mongodb database ...", err) });

    }
    setupExpressServer() {
        const port = process.env.myPort || 3001;
        app.listen(port, (err) => {
            if (err) console.log(err)
            else console.log(`app listen to port ${port}`)
        });

    }
};



module.exports=Application;






