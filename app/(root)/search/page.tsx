import UserCard from "@/components/cards/UserCard"
import { fetchUser, searchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Fragment } from "react"




export default async function Page(){

    const user = await currentUser()
    if(!user) return null
    
    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')
 
    const result = await searchUsers({
        userId: user.id,
        searchString : '',
        pageNumber:1,
        pageSize:25 
    })

    

    return(
        <section>
            <h1 className="head-text mb-10">Search</h1>

            {/* Search Bar */}

            <div className="mt-14 flex flex-col gap-9">
                {result?.searched.length === 0 ? (
                    <p className="no-result">No users found</p>
                ):(
                    <Fragment>
                        {result?.searched.map((person)=>(

                            <UserCard
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            image={person.image}
                            personType='User'
                            />
                        )
                        )}
                    </Fragment>
                )}
            </div>
        </section>
    )
}