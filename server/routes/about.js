const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Authenticate = require("../middleware/authenticate");
router.use(bodyParser.json())
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/about", Authenticate, (req, res) => {
    // You can directly access req.rootUser and req.userID here
    res.send(req.rootUser);
});

// Add error handling middleware for authentication errors
router.use((err, req, res, next) => {
    if (err.message === "User not found") {
        res.status(404).json({ error: "User not found" });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

module.exports = router;
