// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

let nextConfig = {

  env: {
    WEB_URI: process.env.WEB_URI
  },
  poweredByHeader: false,
  crossOrigin: 'anonymous',

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.mode = 'production';

    config.module.rules = [
      ...config.module.rules,
      {
        // test: /\.(mjs|js|jsx|ts)$/,
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.mjs', '.js']
        }
      }
    ]

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }

    return config
  }
}



// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase, { defaultConfig }) => {
  return {
    ...nextConfig,

    serverRuntimeConfig: {},
    publicRuntimeConfig: {
      GROUP_NAME: process.env.GROUP_NAME,
      NODE_ENV: process.env.NODE_ENV, // XXX Used in utils/env
    },

  }
}
