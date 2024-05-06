import {z} from 'zod'

// message schema
export const messageSchema=z.object({
    content:z.string()
          .min(10,{
            message:"message must be at least 10 characters long"
          })
          .max(100,{
            message:"message must be at most 100 characters long"
          })
})