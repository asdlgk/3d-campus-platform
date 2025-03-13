const path = require('path');
const { whenDev, whenProd } = require('@craco/craco');

module.exports = {
  webpack: {
    // 路径别名配置（与 tsconfig.json 同步）
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      // 添加 3D 模型文件支持（glb/gltf）
      webpackConfig.module.rules.push({
        test: /\.(glb|gltf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'static/models/', // 模型文件输出目录
            name: '[name].[hash:8].[ext]' // 带哈希的文件名
          }
        }],
        exclude: /node_modules/
      });

      // 生产环境优化
      if (whenProd()) {
        webpackConfig.optimization = {
          splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 250000, // 控制 chunk 大小（适用于大体积 3D 模型）
            cacheGroups: {
              babylon: {
                test: /[\\/]node_modules[\\/]@babylonjs/,
                name: 'babylon-vendor',
                priority: 10
              }
            }
          }
        };
      }

      return webpackConfig;
    }
  },
  // 开发服务器代理配置（对应 api.ts 的 /api 请求）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://your-backend-server:3000', // 根据实际后端地址修改
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // Jest 单元测试配置
  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        '^@/(.*)$': '<rootDir>/src/$1', // 路径别名支持
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // CSS Modules 支持
      };
      return jestConfig;
    }
  }
};
