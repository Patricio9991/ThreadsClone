"use server"


import User from "../models/user.model"
import { connectToDB } from "./mongoose"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import Thread from "../models/thread.models"
import { SortOrder, FilterQuery } from "mongoose"



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

fetchUserProfileThreads('user_2eXwNsq9UesdQoV8SWrDxIjsLBs')

interface searchParams {
    userId:string,
    searchString?:string,
    pageNumber?:number,
    pageSize?: number,
    sortBy?: SortOrder
}
export async function searchUsers({
    userId, searchString = "", pageNumber = 1, pageSize = 20, sortBy = "desc"}:searchParams){

    try{
        
        

        const skipAmount = (pageNumber - 1 ) * pageSize

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId } // Exclude the current user from the results.
          };

        if (searchString.trim() !== "") {
            query.$or = [
              { username: { $regex: regex } },
              { name: { $regex: regex } },
            ];
          }

        const searched = await User.find(query)
        .skip(skipAmount)
        .limit(pageSize)


        const totalUsersCount = await User.countDocuments(query);

        
       
        const isNext = totalUsersCount > skipAmount + searched.length;

        return { searched, isNext };


    
    }catch(err){
        console.log(err)
    }

}

export async function getActivity(userId:string) {
    try{
        connectToDB()

        //Buscar threads del usuario
        const userThreads = await Thread.find({author:userId})

        //Crea un aray con todos los comentarios de los threads historicos (solo sus ids)
        const childTrheadsIds = userThreads.reduce((acc,userThread)=>{
            return acc.concat(userThread.children)
        },[]) //Se crea un solo array con los comentarios

        //Se buscan los que son solo respuestas en la DB
        const replies = await Thread.find({
            _id: {$in: childTrheadsIds},
            author: {$ne: userId}
        })
        .populate({ //ppopula esos thread  con esta informacion
            path:'author',
            model: User,
            select: 'name image _id'
        })

        return replies
     


    }catch(err){
        console.log(err)
    }
    
}

