/** @type {import('next').NextConfig} */

const nodeExternals = require('webpack-node-externals');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    outputFileTracingExcludes: {
      '*': [
        'node_modules/canvas',
      ],
    },
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