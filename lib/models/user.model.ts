import mongoose from 'mongoose'


const userSchema = new mongoose.Schema ({
    id : {type:String, requiered:true },
    username: {type: String, requiered: true, unique:true},
    name: {type: String, requiered:true},
    image:String,
    bio: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Threads"
    }],
    onboarded:{
        type: Boolean,
        default: false
    },
    communities:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"Community"
    }]

})

const User = mongoose.models.User || mongoose.model("User",userSchema)
console.log(User)
export default User

