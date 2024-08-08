const errorResponse = require("../utils/errorResponse")
const userModel = require("../models/userModel")
exports.sendToken = (user, statusCode, res) => {
    user.getSignedToken(res)
    res.status(statusCode).json({
        success: true,
        message: "Token sent as a cookie"
    })
}

exports.logoutController = async (req, res, next) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: "Logout success"
    });
};

exports.registerController = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body
        // check existing user
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is already registered', 500))
        }
        const user = await userModel.create({ userName, email, password })
        this.sendToken(user, 201, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.loginController = async (req, res, next) => {
    try {
        const{email, password} = req.body
        // check if the password matches or not
        if(!email || !password){
            return next(new errorResponse('Please Provide Email and Password'))
        }
        const user = await userModel.findOne({email})
        if (!user){
            return next(new errorResponse('Invalid Credential', 401))
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new errorResponse('Invalid Credential',401))
        }
        //res
        this.sendToken(user,200,res)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.logoutController = async (req,next, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: "Logout success"
    })
}