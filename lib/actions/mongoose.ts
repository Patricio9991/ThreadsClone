import mongoose from 'mongoose'




export const connectToDB = async ()=>{
    
    try{
        await mongoose.connect("mongodb+srv://ppuchetadev:LanaAurora99@threadcloneapp.kkmc66l.mongodb.net/?retryWrites=true&w=majority&appName=ThreadCloneApp")
        

        console.log("Connected to MongoDB")
    }
    catch (error){
        console.log(error)
    }

}

