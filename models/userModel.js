const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const cookie = require("cookie")
//models
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'UserName is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'Password length should be more than 6 char']
    },
    customerId: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        default: ""
    }
})

// Function to hash password
userSchema.pre('save', async function (next) {
    // update the password
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Sing in token
userSchema.methods.getSignedToken = function (res) {
    const accessToken = JWT.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE })
    const refreshToken = JWT.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JET_REFRESH_EXIPREIN })
    res.cookie('refreshToken', `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
    });
}

const User = mongoose.model("User", userSchema)

module.exports = User;