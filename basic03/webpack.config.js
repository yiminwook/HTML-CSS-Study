/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
//es6 module의 .js 확장자를 다 지워야한다.
const path = require("path");

module.exports = (option) => {
  return {
    mode: "development",
    entry: "./index.ts",
    output: {
      filename: "bundle.js",
      //에러를 방지하기 위해 tsconfig.json output path와 일치해야한다.
      //절대경로로 입력
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          //tsconfig가 있음으로 추가구성 configuration을 명시하지 않아도 된다.
          exclude: /node_modules/,
        },
        // Sass 파일 로더 설정
        {
          test: /\.s[ac]ss/i,
          use: [
            "style-loader",
            // css-loader 소스맵 옵션 활성화
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            // sass-loader 소스맵 옵션 활성화
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // 이미지 파일 로더
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].[ext]",
                limit: 10000, //10k까지 url-loader
                publicPath: "./dist/",
                fallback: "file-loader",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".scss", "sass", "css", "jpeg", "png"],
    },
    devServer: {
      // historyApiFallback: true,
      //브라우저를 통해 접근하는 경로 webpack.output.publicPath와 동일하게 설정
      devMiddleware: { publicPath: "/dist/" },
      //정적파일을 제공하는 경로
      static: { directory: path.resolve(__dirname) },
    },
    plugins: [],
  };
};
