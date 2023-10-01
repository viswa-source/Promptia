import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
interface UserProfile {
  email: string;
  username: string;
  name:string
  picture: string;
  id: string;
}
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      if (session.user) {
        //@ts-ignore
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },

    //@ts-ignore
    async signIn({ profile }: { profile: UserProfile }) {
      try {
        //serverless
        await connectToDB();
        //check if user exists
        const userExists = await User.findOne({ email: profile.email });
        //else create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
