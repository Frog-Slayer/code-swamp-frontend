import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    async rewrites() {
      return [
        {
          source: '/@:username/:slug*',
          destination: '/:username/:slug*'
        }
      ]
    }
  }

export default nextConfig;
