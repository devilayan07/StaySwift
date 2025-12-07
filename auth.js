import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./database/mongoClientPromise";
import User from "./models/user-model";
import bcrypt from "bcryptjs"

export const{handlers:{GET,POST},auth,signIn,signOut}=NextAuth({
    adapter:MongoDBAdapter(mongoClientPromise,{databaseName:process.env.ENVIRONMENT}),
    session:{
               strategy: 'jwt',

    },
      callbacks: {
    async jwt({ token, user }) {
          // When user logs in, attach mongo _id to token

      if (user) {
        token.id = user._id?.toString() || user.id;
      }
      return token;
    },
    async session({ session, token }) {
          // Expose token.id into session

      session.user.id = token.id;
      return session;
    }
  },


    providers:[
        CredentialsProvider({
         credentials:{
            email:{},
            password:{}
         },
         async authorize(credentials){
            if(credentials===null) return null;
            try {
               const user= await User.findOne({email:credentials.email})
               console.log(user)
               if(user){
                  const isMatch=await bcrypt.compare(
                     credentials.password,user.password
                  );
                  if(isMatch){
                    return user
                  }else{
                    throw new Error("Email or password mismatch")
                  }
               }else{
                  throw new Error("User not found")
               }
            } catch (error) {
                throw new Error(error)
            }

         }
        }),
       GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
       }),
       Facebook({
        clientId:process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET
       })
    ]
})