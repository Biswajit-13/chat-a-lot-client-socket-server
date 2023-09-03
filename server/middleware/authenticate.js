const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) { throw new Error("User not found") }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        const otherUsers = await User.find({ _id: { $ne: rootUser._id } });
        req.otherUsers = otherUsers; 
        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized");
        console.log(err);
    }

}
module.exports = Authenticate;