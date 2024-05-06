import {z} from 'zod'

// verification code schema
export const verificationSchema=z.object({
    code:z.string()
          .min(6,{
            message:"code must be at least 6 characters long"
          })
}) 