
import { Fragment } from "react";

import '../globals.css'
import { fetchThread } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

 
export default async function Home() {


  const result = await fetchThread(1,30)
  const user = await currentUser()

  console.log(result)


  

  return (
    <Fragment>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.post.length === 0 ? (
        <p className="no-result">No hay posts</p>
        ):(
        <Fragment>{result.post.map((post)=>
          

          <ThreadCard 
          key={post._id} 
          id={post._id} 
          currentUserId={user?.id || ""}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
         />
          
          )}
        
        </Fragment>)}

       
          
        
        
      </section>
    </Fragment>
    
  )
}