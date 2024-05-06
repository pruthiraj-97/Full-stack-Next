import { resend } from "@/lib/resend";
export async function sendEmail(email:string,otp:string){
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject: 'Hello World',
            html: `<p>Hello</p><p>your otp is ${otp}</p>`,
          });
          console.log(data) // create general id
          return {
            success:true,
            message:"verification email send successfully"
          }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:"fail to send verification email"
        }
    }
}