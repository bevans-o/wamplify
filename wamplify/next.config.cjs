/** @type {import('next').NextConfig} */

const nodeExternals = require('webpack-node-externals');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/canvas',
      ],
    },
    outputFileTracingIgnores: ['**canvas**']
  },
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