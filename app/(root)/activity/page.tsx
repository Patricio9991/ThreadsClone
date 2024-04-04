import UserCard from "@/components/cards/UserCard"
import { fetchUser, getActivity, searchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Fragment } from "react"




export default async function Page(){

    const user = await currentUser()
    if(!user) return null

    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')

    //getActivity
    const userIdString = userInfo._id.toString()

    const activity:any = await getActivity(userIdString)

    

    return(
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section>
                {activity.length > 0 ? (
                    <Fragment>
                        {activity.map((activity:any)=>(
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image 
                                    src={activity.author.image}
                                    alt="profile picture"
                                    width={50}
                                    height={50}
                                    className="rounded-full object-cover"/>

                                <p className="!text-small-regular text-light-1">
                                    <span className="mr-1 text-primary-500">{activity.author.name}</span>{" "} replied to your thread
                                </p>
                                </article>
                            </Link>)
                        )}
                    </Fragment>
                ):(
                    <p className="!text-base-regular text-light-3">No activity yet</p>
                )}
            </section>
        </section>
    )
}