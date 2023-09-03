const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Authenticate = require("../middleware/authenticate");
router.use(bodyParser.json())

router.get("/users", Authenticate, (req, res) => {
    res.send( req.otherUsers);
})

module.exports = router;