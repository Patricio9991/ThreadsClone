"use client"
//aca se uso shadcdn, zod
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { usePathname, useRouter } from "next/navigation"
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

import { CommentValidation } from "@/lib/validations/thread"
import { Fragment } from "react"
import Image from "next/image"
import { addCommentToThread } from "@/lib/actions/thread.actions"





interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string

}


export default function Comments({threadId,currentUserImg,currentUserId}:Props){

    

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ''
        }
    })

    const router= useRouter()
    const path = usePathname()

    const onSubmit = async (values: z.infer<typeof CommentValidation>)=>{
       
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        path)

      form.reset()
    }





    return(
    <div>
        <h1 className="text-white">Comment Form</h1>

        <Form {...form}>
              <form 
               onSubmit={form.handleSubmit(onSubmit)} 
              className="comment-form"
              >
             <FormField
                  control={form.control}
                  name="thread"
                  render={({ field }) => (
                   
                    <FormItem className="flex gap-3 items-center w-full">
                        <FormLabel>
                          <Image
                            src={currentUserImg}
                            alt='current_user'
                            width={50}
                            height={50}
                            className='rounded-full object-fit'
                          />
                        </FormLabel>
                    
                      <FormControl className="border-none bg-transparent">
                        <Input 
                        type="text"
                        placeholder="Comment"
                        className="no-focus text-light-1 outline-none bg-dark-3"
                      
                        {...field}
                      />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="comment-form_btn">Reply</Button>
                </form>
            </Form>



    </div>
    )
}