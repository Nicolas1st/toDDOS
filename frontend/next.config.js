/* eslint-disable no-param-reassign */
const path = require('path');

const bsconfig = require('./bsconfig.json');

const isDevelopment = process.env.NODE_ENV === 'development';

const transpileModules = ['rescript'].concat(bsconfig['bs-dependencies']);
// eslint-disable-next-line import/order
const withTM = require('next-transpile-modules')(transpileModules);

/**
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 */
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

// Overrides for css-loader plugin
function cssLoaderOptions(modules) {
  // eslint-disable-next-line no-unused-vars
  const { getLocalIdent, ...others } = modules; // Need to delete getLocalIdent else localIdentName doesn't work
  return {
    ...others,
    localIdentName: isDevelopment
      ? '[path]--[name]--[local]_[hash:base64:5]'
      : '[local]_[hash:base64:5]',
    exportLocalsConvention: 'dashesOnly',
    mode: 'local',
  };
}

const nextConfiguration = {
  pageExtensions: ['jsx', 'js'],
  env: {
    ENV: process.env.NODE_ENV,
  },
  webpack: (config, options) => {
    const oneOf = config.module.rules.find((rule) => {
      return typeof rule.oneOf === 'object';
    });
    if (oneOf) {
      // Find the module which targets *.scss|*.sass files
      const moduleSassRule = oneOf.oneOf.find((rule) => {
        return regexEqual(rule.test, /\.module\.(scss|sass)$/);
      });

      if (moduleSassRule) {
        // Get the config object for css-loader plugin
        const cssLoader = moduleSassRule.use.find(({ loader }) => {
          return loader.includes('css-loader');
        });
        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules),
          };
        }
      }
    }

    // We need this additional rule to make sure that mjs files are
    // correctly detected within our src/ folder
    config.module.rules.push({
      test: /\.m?js$/,
      use: options.defaultLoaders.babel,
      exclude: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

module.exports = withTM(nextConfiguration);
