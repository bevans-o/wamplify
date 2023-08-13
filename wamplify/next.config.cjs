/** @type {import('next').NextConfig} */

const nodeExternals = require('webpack-node-externals');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingExcludes:  ['**canvas**']
  },
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"]
    return config
  }
};

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [nodeExternals()];
      config.node = {
        net: 'empty'
      }
    }

    return config;
  },
};