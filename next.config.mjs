/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
<<<<<<< HEAD
        // hostname: "via.placeholder.com",
=======
>>>>>>> a022fa5173620546ba0d46150597ef360e9a9fa3
        port: "",
        pathname: "/v0/b/goldie-b3ba7.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;
