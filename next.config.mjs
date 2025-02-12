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
        port: "",
        pathname: "/v0/b/goldie-b3ba7.appspot.com/o/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
