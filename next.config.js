/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "5loz3c1e7r.ufs.sh",
        pathname: "/f/**" // Allow any images under "/f/"
      }
    ]
  }
};

module.exports = nextConfig;
