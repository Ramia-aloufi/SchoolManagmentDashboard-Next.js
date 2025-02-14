import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains: ['res.cloudinary.com'],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.pexels.com",
    },
  ],
}
};

export default nextConfig;
