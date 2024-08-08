const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log(`connected to the db ${mongoose.connect.host}`)
    } catch(error) {    
        console.log(error);
    }
}

module.exports = connectDb;