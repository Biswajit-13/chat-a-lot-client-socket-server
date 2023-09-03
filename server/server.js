const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config()
const PORT = process.env.PORT || 2000;
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', // Set your frontend URL here
    credentials: true
}));

const ChatRoute =  require("./routes/ChatRoute.js");
const MessageRoute  = require("./routes/MessageRoute.js");
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

app.use(require("./routes/auth"))
app.use(require("./routes/about"))
app.use(require("./routes/users"))




require('./db/connection')

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});


