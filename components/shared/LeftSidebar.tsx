"use client"

import {sidebarLinks} from '@/constants/index'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {SignedIn, SignOutButton, useAuth} from "@clerk/nextjs";

export default function LeftSidebar(){
    const router = useRouter()
    const pathname = usePathname()
    const {userId} = useAuth()

    return(
        
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-3 px-3">
                {sidebarLinks.map((link)=>{
                    const isActive = (pathname.includes(link.route) && link.route.length >1 || pathname === link.route )
                    
                    if(link.route === '/profile') link.route = `${link.route}/${userId}`
            
             
                  

                    return(
                    <Link 
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link ${isActive ? `bg-blue ` :`bg-red-900`}`}>

                        <Image 
                        src={link.imgURL} 
                        alt={link.label}
                        width="24"
                        height="24"
                        />
                        <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                    
                    </Link>
                
                )
                   
                })}
            </div>
            
            <SignedIn>
                <SignOutButton signOutCallback={()=>{router.push('sign-in')}}>
                    <div className="flex cursor-pointer">
                        <Image 
                        src="/assets/logout.svg" 
                        alt="logout"
                        width={28}
                        height={28}/>

                        <p className='text-light-2 max-lg:hidden'>Logout</p>
                    </div>

                </SignOutButton>
            </SignedIn>
                
        </section>
    )
}