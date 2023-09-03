const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json())
const bcrypt = require('bcrypt')
const User = require('../models/users.model');


router.post('/register', (req, res) => {

    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "please fill all the fileds" })
    }
    else {
        User.findOne({ email: email })
            .then((userExist) => {
                if (userExist) return res.status(409).json({ error: "User already exists" })
                else if (password != cpassword) return res.status(400).json({ error: "Password does not match" })
                else {
                    const user = new User({ name, email, phone, password, cpassword });
                    //password hashing
                    user.save()
                        //password plain text return
                        .then(() => {
                            res.status(201).json({ message: "User registered!" })
                        })
                        .catch((err) => res.status(500).json({ error: "Failed to register" + err }))
                }
            })
            .catch((err) => { console.log(err) })
    }
})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please fill the fileds" })
    }
    else {
        User.findOne({ email: email })
            .then((logedUser) => {
                if (logedUser) {
                    bcrypt.compare(password, logedUser.password)
                        .then((isMatch) => {
                            if (!isMatch) res.status(400).json({ error: "Invalid Credentials" })
                            else {
                                logedUser.generateAuthToken().then((token) => {
                                    // console.log(token)
                                    res.cookie('authToken', token, {
                                        maxAge: 3600000, // Set the expiration time of the cookie (in milliseconds)
                                        httpOnly: true, // Cookie accessible only via HTTP(S)
                                       secure: true,
                                    });
                                    res.status(201).json({ message: "User login successfull" })
                                }).catch((err) => res.json({ error: "error" }))

                            }
                        })
                        .catch((err) => res.status(500).json({ error: "server error" }))
                }
                else res.status(400).json("User not found")
            })
            .catch((err) => res.json(err))
    }
})
module.exports = router;