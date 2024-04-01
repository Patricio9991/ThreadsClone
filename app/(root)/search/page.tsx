import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"




export default async function Page(){

    const user = await currentUser()
    if(!user) return null
    
    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')
 


    return(
        <section>
            <h1 className="head-text mb-10">Search</h1>
        </section>
    )
}