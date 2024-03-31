"use client"


import {sidebarLinks} from '@/constants/index'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {SignedIn, SignOutButton} from "@clerk/nextjs";



export default function Bottombar(){

    const router = useRouter()
    const pathname = usePathname()

    return(
        <section className="bottombar">
            <div className="bottombar_container">
                
            {sidebarLinks.map((link)=>{
                    const isActive = (pathname.includes(link.route) && link.route.length >1 || pathname === link.route )

             
                  

                    return(
                    <Link 
                        href={link.route}
                        key={link.label}
                        className={`bottombar_link ${isActive ? `bg-blue ` :`bg-red-900`}`}>

                        <Image 
                        src={link.imgURL} 
                        alt={link.label}
                        width="24"
                        height="24"
                        />
                        <p className='text-subtle-medim text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
                    
                    </Link>
                
                )
                   
                })}
            </div>
        </section>
    )
}