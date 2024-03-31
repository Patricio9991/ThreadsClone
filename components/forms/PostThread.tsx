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
import { Textarea} from "@/components/ui/textarea"

import { usePathname, useRouter } from "next/navigation"
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

import { ThreadValidation } from "@/lib/validations/thread"
import { Fragment } from "react"
import { createThread } from "@/lib/actions/thread.actions"



interface Props{
    user:{
        id:string,
        objectId:string,
        name:string,
        username:string,
        bio:string,
        image:string
    },
    btnTitle:string
}

export default function PostThread({userId}:{userId: string}){
  

  const router= useRouter()
  const path = usePathname()

  const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId
        }
    })


    const onSubmit = async (values: z.infer<typeof ThreadValidation>)=>{

      await createThread({
        text : values.thread,
        author : userId,
        communityId : null ,
        path: path})

      router.push("/")
    }


    return(
        <Fragment>
            <div>Content</div>

            <Form {...form}>
              <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="flex flex-col justify-sart gap-10"
              >
             <FormField
                  control={form.control}
                  name="thread"
                  render={({ field }) => (
                   
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className=" text-base-semibold text-light-2">
                        Content
                      </FormLabel>
                      <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                        <Textarea 
                        rows={10}
                      
                        {...field}
                      />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="w-full bg-primary-500">Post Thread</Button>
                </form>
            </Form>

        </Fragment>
    )


}