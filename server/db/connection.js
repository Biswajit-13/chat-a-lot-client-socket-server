const mongoose = require('mongoose');
const DB  = process.env.DB;

mongoose.connect(DB).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>console.log(err))