import mongoose from 'mongoose'

const connectDB = async() => {
         try {
            const connection_Instance= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
             console.log(`DB conn.. established and host : ${connection_Instance.connection.host}`)
         } catch (error) {
            console.log('DB connection error : ' ,error);
         }

}

export default connectDB;
  