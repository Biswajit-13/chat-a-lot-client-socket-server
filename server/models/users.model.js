const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    cpassword: {
        type: String,
        require: true,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
})

//middleware function
userSchema.pre('save', async function (next) {
    // console.log("message from middleware")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id:this._id},process.env.TOKEN_KEY);
          this.tokens = this.tokens.concat({token})
          await this.save();
          return token;
    }
    catch (err) {

    }
}

const User = mongoose.model("users", userSchema);
module.exports = User;
