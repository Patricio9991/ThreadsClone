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

import {useUploadThing} from '@/lib/uploadthing'

import { usePathname, useRouter } from "next/navigation"




import {zodResolver} from '@hookform/resolvers/zod'
import { userValidation } from "@/lib/validations/user"
import * as z from 'zod'
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { updateUser } from "@/lib/actions/user.actions"


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

export default function AccountProfile({user, btnTitle}:Props){

  const [files,setFiles] = useState<File[]>([])
  const {startUpload} = useUploadThing('media')

  const router= useRouter()
  const path = usePathname()

  const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio:user?.bio || ''
        }
    })
   

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
  

    await updateUser({
      userId:user.id,
      username:values.username,
      name: values.name,
      bio:values.bio,
      image:values.profile_photo,
      path: path

    })

    if(path === "/profile/edit"){
      router.back()
    }else{
      router.push("/")
    }
  
    
  }

  const handleImage = (e:ChangeEvent<HTMLInputElement>, fieldChange:(value:string)=>void)=>{
        e.preventDefault

        const fileReader = new FileReader()

        if(e.target.files && e.target.files.length > 0){
          const updated_picture = e.target.files[0]
          setFiles(Array.from(e.target.files))
          

          if(!updated_picture.type.includes('image')) return
          
          fileReader.readAsDataURL(updated_picture)

          fileReader.onload =  (e)=>{
            const dataImg = fileReader.result?.toString() || ""
            
            fieldChange(dataImg)
          }

          
        }


  }

     
      return (
            <Form {...form}>
              <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="flex flex-col justify-sart gap-10"
              >
                {/* profile pic */}
                <FormField
                  control={form.control}
                  name="profile_photo"
                  render={({ field }) => (
                   
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="account-form_image-label">
                        {field.value? (
                          <Image
                          src={field.value}
                          alt="Profile photo"
                          width={96}
                          height={96}
                          priority
                          className="rounded-full object-cover"/>
                          
                        ):(
                          <Image
                          src="/assets/profile.svg"
                          alt="Profile photo"
                          width={24}
                          height={24}
                          className="object-contain"/>
                          )}
                      </FormLabel>
                      <FormControl className="flex-1 text-base-semilbod text-gray-200">
                        <Input 
                        type="file"
                        accept="image/*"
                        placeholder="Upload photo" 
                        className="account-form_image-input"
                        onChange={(e)=>{handleImage(e,field.onChange)}}/>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                   
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                        type="text"
                        className="account-form_input"
                        {...field}
                      />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* username */}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                   
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input 
                        type="text"
                        className="account-form_input"
                        {...field}
                      />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* bio */}


                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                   
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                        rows={10}
                        className="account-form_input"
                        {...field}
                      />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <Button type="submit" className="w-full bg-primary-500">Submit</Button>
              </form>
            </Form>
        )





}


    