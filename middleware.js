export { default } from 'next-auth/middleware'


export const config = {
    matcher: ['/', '/trips/:path*', '/bag/:path*', "/settings"]
  };

  
  