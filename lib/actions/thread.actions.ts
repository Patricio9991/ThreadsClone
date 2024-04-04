"use server"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.models"
import User from "../models/user.model"
import { connectToDB } from "./mongoose"

interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string

}

export async function createThread({text,author,communityId,path}:Params) {
    try{

        connectToDB()
        
        const newThread = await Thread.create({
            text,
            author,
            comminity: null
        })
    
        await User.findByIdAndUpdate(author,{
            $push: {threads : newThread._id }
        })
    
        revalidatePath(path)
    }catch(err){
        console.log(err)
    }

}

export async function fetchThread(pageNumber = 1, pageSize = 20){

        const skipAmount = (pageNumber - 1)*pageSize

    
        connectToDB()
        const postQuery =  Thread.find({parentId : {$in: [null,undefined]}})
        .sort({createdAt : 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path : "author", model : User})
        .populate({
            path : 'children',
            populate :{
                path : 'author',
                model: User,
                select: "_id name parentId image"
            }
        })

        const totalPostCount = await Thread.countDocuments({parentId : {$in: [null,undefined]}})

        const post = await postQuery.exec()

        const isNext = totalPostCount > skipAmount + post.length

        return {post, isNext}


}


export async function fetchThreadById( id: string){
    connectToDB()

    try{    

        const thread = await Thread.findById(id)
        .populate({
            path:'author',
            model: 'User',
            select:"_id id name parentId image"})

        .populate({
            path: "children", // Populate the children field
            populate: [
                {
                  path: "author", // Populate the author field within children
                  model: User,
                  select: "_id id name parentId image", // Select only _id and username fields of the author
                }]
            
            //     {
            //       path: "children", // Populate the children field within children
            //       model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            //       populate: {
            //         path: "author", // Populate the author field within nested children
            //         model: User,
            //         select: "_id id name parentId image", // Select only _id and username fields of the author
            //       },
            //     },
            //   ],
        }).exec()    
        
        
        
        return thread

    }catch(err){
        console.log(err)
    }
}


export async function addCommentToThread(
    threadId : string,
    commentText: string,
    userId:string,
    path:string)
{

    connectToDB()

    try{
        //apuntar al thread que se quiere comentar
        const oiriginalThread = await Thread.findById(threadId)

        if(!oiriginalThread){
            throw new Error("thread not found")
        }

        //crear el comentario como un nuevo thread
        const commentThread = new Thread({
            text:commentText,
            author:userId,
            parentId:threadId
        })

        

        await commentThread.save()

        //actualizar thread con el comentario incluido
        oiriginalThread.children.push(commentThread._id)

        //guardar el thread original
        await oiriginalThread.save()

        revalidatePath(path)

    }catch(err){
        console.log(err)
    }

}