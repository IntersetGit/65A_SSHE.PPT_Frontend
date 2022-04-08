const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const path = require('path');
const generateTheme = require('next-dynamic-antd-theme/plugin');
const cssLoader = require('css-loader/dist/utils');
const withCss = require('@zeit/next-css');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withOptimizedImages = require('next-optimized-images');

/** Unused comment */
// const withSass = require('@zeit/next-sass');
// const withTM = require('next-transpile-modules');

const prod = process.env.NODE_ENV === 'production';
const prefix = prod ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : '/';

const withAntdTheme = generateTheme({
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './theme'),
  varFile: path.join(__dirname, './theme/vars.less'),
  outputFilePath: path.join(__dirname, './.next/static/color.less'),
  lessFilePath: `${prefix}_next/static/color.less`,
  lessJSPath: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/4.1.2/less.min.js',
  cssModules : 'true'
});


const css = [withCss, {
  cssModules: false, 
  cssLoaderOptions: { 
    localIdentName: '[local]',
    importLoaders: 2
  }
}]

const withoptimizedImg = [withOptimizedImages,{

}]

withAntd = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    ...nextConfig,
    lessLoaderOptions: {
      ...nextConfig.lessLoaderOptions,
      javascriptEnabled: true,
    },
    cssModules: false,
    cssLoaderOptions: {
      ...nextConfig.cssLoaderOptions,
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]',
      getLocalIdent: (context, localIdentName, localName, options) => {
        let hz = context.resourcePath.replace(context.rootContext, '');
        if (/node_modules/.test(hz)) {
          return localName;
        } else {
          return cssLoader.defaultGetLocalIdent(context, localIdentName, localName, options);
        }
      },
    },
    webpack(config, options) {
      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /Conflicting order/,
        })
      )
      if (config.externals) {
        const includes = [/antd/];
        config.externals = config.externals.map((external) => {
          if (typeof external !== 'function') return external;
          return (ctx, req, cb) => {
            return includes.find((include) =>
              req.startsWith('.') ? include.test(path.resolve(ctx, req)) : include.test(req),
            )
              ? cb()
              : external(ctx, req, cb);
          };
        });
      }

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(config, options)
        : config;
    },
  });
};

module.exports = withPlugins(
  [
    withLess(
      withAntdTheme(
        withAntd((config) => {
          return {
            assetPrefix: prefix,
          };
        })
      )
    ),
    css,withoptimizedImg
  ],
  {
    webpack5: false,
    reactStrictMode: false,
    trailingSlash: true,
    //assetPrefix: './pttsshe/',
    basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH : '',
    webpack: function (config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      });
      return config;
    }
  }
);

/**
 * TO KNOW
 *
 * exportTrailingSlash: true ใช้สำหรับ Nextjs Version ที่ต่ำกว่า v9.3.4
 *
 */
