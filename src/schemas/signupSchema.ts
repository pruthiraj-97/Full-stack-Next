import {z} from 'zod'
export const userSchema=z.string()
                         .min(6,{
                            message:"username must be at least 6 characters long"
                         })
                         .max(10,{
                             message:"username must be at most 10 characters long"
                         })

// sign up schema
export const signUpSchema=z.object({
    username:userSchema,
    email:z.string().email(),
    password:z.string()
              .min(6,{
                message:"password must be at least 6 characters long"
              })
})