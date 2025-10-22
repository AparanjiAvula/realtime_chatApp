const mongoose=require('mongoose');
const {config}=require('dotenv');
config();

const dbConnect=async()=>{
    try {
        const conne=await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Connected:',conne.connection.host)
    } catch (error) {
        console.log('MongoDB Connection error:',error)
    }
}

module.exports=dbConnect