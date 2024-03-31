import ThreadCard from "@/components/cards/ThreadCard"
import Comments from "@/components/forms/Comments"
import { fetchThread, fetchThreadById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"




export default async function Page({params} : {params: {id:string}}) {

    const user = await currentUser()
    if(!user) return null

    if(!params) return null

    const userInfo = await fetchUser(user.id)
    
  
    if(!userInfo?.onboarded) redirect ("/onboarding")

    const thread = await fetchThreadById(params.id)

   
    return(
        <section>   
            <div>

                <ThreadCard 
                    key={thread._id} 
                    id={thread._id} 
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.comments}
                />

            </div>

            <div className="mt-7">
                <Comments
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}/>
            </div>
          
          <div className="mt-10">

            {thread.children.map((comment:any)=>(
                // para esto hubo que usar .populate() en el action de los threads
                // para apuntar al modelo del User
                <ThreadCard 
                key={comment._id} 
                id={comment._id} 
                currentUserId={comment?.id || ""}
                parentId={comment.parentId}
                content={comment.text}
                author={comment.author}
                community={comment.community}
                createdAt={comment.createdAt}
                comments={comment.comments}
                isComment={true}
                
            />

            )
            )}
          </div>
          



        </section>
    )

}