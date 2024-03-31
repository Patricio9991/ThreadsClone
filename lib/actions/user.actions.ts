"use server"

import path from "path/win32"
import User from "../models/user.model"
import { connectToDB } from "./mongoose"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import Thread from "../models/thread.models"


interface Params{
    userId:string,
    username: string,
    name: string,
    bio : string,
    image: string,
    path: string

}


export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path}:Params){
    
    try{
        connectToDB()

        await User.findOneAndUpdate({id: userId},{
            username: username.toLowerCase(),
            name,
            bio,
            image,
            path,
            onboarded: true
    
        },{upsert:true})

           

    }catch (error){
        console.log("Somethng wen wrong")
    }

}

export async function fetchUser(userId: string){
    try{
        connectToDB()
        return await User.findOne({id:userId})
    }catch(err){
        console.log(err)
    }
}

export async function fetchUserProfileThreads(userId: string){
    try{
        connectToDB()

        const profileThreads= await User.findOne({id:userId})
        .populate({
            path:'threads',
            model:Thread,
            populate:{
                path:'author',
                model:User,
                // populate:{
                //     path:'children',
                //     model:Thread,
                    
                // }
            }
            

        })
       

        return profileThreads

    }catch(err){
        console.log(err)
    }

}