import mongoose from 'mongoose'




export const connectToDB = async ()=>{
    
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/threads")
        

        console.log("Connected to MongoDB")
    }
    catch (error){
        console.log(error)
    }

}

