import NextAuth from 'next-auth'
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({    
    providers: [    
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
          }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user.name
                .split(' ')
                .join('')
                .toLocaleLowerCase()
            
            session.user.uid = token.sub
            return session;
        }
    }
})