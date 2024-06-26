"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface Props {
    key:string,
    id:string,
    name:string,
    username:string,
    image:string,
    personType:string
}



export default function UserCard({key, id, name, username, image,personType}:Props){

    const router = useRouter()

    return(
        <article className="user-card">
            <div className="user-card_avatar">
                <Image
                src={image}
                alt="logo"
                width={48}
                height={48}
                className="rounded-full object-contain"/>
                
                <div className="flex-1 text-elipsis">
                    <h4 className="text-base-semibold text-light-1">{name}</h4>
                    <p className="text-smallmedium text-gray-1">@{username}</p>
                </div>

            </div>
            <Button className="user-card_btn" onClick={()=>{router.push(`/profile/${id}`)}}>View</Button>
        </article>
    )
}