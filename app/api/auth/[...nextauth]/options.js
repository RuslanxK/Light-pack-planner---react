import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { connectToDB } from "../../../../utils/database"
import user from '../../../../models/user'


export const options = {

      providers: [

          GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),

         FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),

      ],

      session: {
          strategy: 'jwt'
      },
        
      pages: {
          signIn: "/login"
      },
      
      callbacks: {


        async redirect({ url, baseUrl }) {
          const isRelativeUrl = url.startsWith("/");
          if (isRelativeUrl) {
            return `${baseUrl}${url}`;
          }
    
          const isSameOriginUrl = new URL(url).origin === baseUrl;
          const alreadyRedirected = url.includes('callbackUrl=')
          if (isSameOriginUrl && alreadyRedirected) {
            const originalCallbackUrl = decodeURIComponent(url.split('callbackUrl=')[1]);
            return originalCallbackUrl;
          }
    
          if (isSameOriginUrl) {
            return url;
          }
    
          return baseUrl;
        },

        async session({session}) {

            await connectToDB()
            const sessionUser = await user.findOne({
               email: session.user.email
            })

             if(sessionUser) {
             session.user.id = sessionUser._id.toString()
             return session
             }
      
            },
      
            async signIn({profile}) {
      
               try {
                 
                   await connectToDB()
                   const userExists = await user.findOne({email: profile.email})
      
                   if (!userExists) {
                    let imageUrl = profile.picture;

                    if (typeof profile.picture === 'object' && profile.picture.data && profile.picture.data.url) {
                        imageUrl = profile.picture.data.url;
                    }
                    await user.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: imageUrl || null 
                    });
                }

                    return true;
      
               }  catch(error) {
      
                    console.log(error)
                    return false
               }
            }
      }
  

} 