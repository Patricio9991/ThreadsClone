import * as z from 'zod'
//ver documentacion de Zod

export const userValidation = z.object({
    profile_photo: z.string().url(),
    name:z.string().min(3,{message: "minimum 3 characters"}).max(30),
    username:z.string().min(3,{message: "minimum 3 characters"}).max(30),
    bio:z.string().min(3,{message: "minimum 3 characters"}).max(130),



})