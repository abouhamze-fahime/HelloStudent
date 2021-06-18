
const bcrypt = require("bcrypt");
const _ = require("lodash");
const NodeCache = require("node-cache");
const UserModel = require("../../models/UserModel");
//const jwt = require ("jsonwebtoken");

const {
    loginValidator,
    registerValidator } = require('../validator/UserVlidator');

module.exports= new (class userController {
    async registerUser(req, res) {
        const { error } = registerValidator(req.body);
        if (error) return res.status(400).send({ message: error.message });
        let user = await UserModel.findOne({ phone: req.body.phone });
        if (user) return res.status(400).send({ message: "این کاربر قبلا ثبت نام کرده است" })
        user = new UserModel(_.pick(req.body, ["fullName", "phone", "password", "email"]));
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        user.password = pass;
        user = await user.save();
        const data = {
            _id: user._id,
            fullName: user.fullName,
            role: user.role
        };
        const token = user.generateAuthToken();
      // jwt.sign(data, config.get("jwtPrivateKey"));
        res
            .header("x-auth-token", token)
            .send(_.pick(user, ["fullName", "phone", "email"]));
    };



    async loginUser(req, res) {
        const { error } = loginValidator(req.body);
        if (error) return res.status(400).send({ message: error.message });
        let user = await UserModel.findOne({ phone: req.body.phone });
        if (!user) return res.status(400).send({ message: "کاربری با این نام کاربری یا پسورد یافت نشد" })
            const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send({ message: "کاربری با این نام کاربری یا پسورد یافت نشد" })
            const data = {
            _id: user._id,
            fullName: user.fullName,
            role: user.role
        };
        const token = user.generateAuthToken();
        res.
        header("Access-Control-Expose-headers","x-auth-token").
        header("x-auth-token", token)
        .status(200)
        .send("Successfully logined");
    };

})();












    









