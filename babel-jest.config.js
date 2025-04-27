// module.exports = {
//     presets: [
//       "@babel/preset-env",
//       "@babel/preset-typescript",
//       ["@babel/preset-react", { runtime: "automatic" }],
//       "next/babel",
//     ],
//   };
// babel-jest.config.js
module.exports = {
  presets: [
    "next/babel", // allow testing next.js code in Jest
  ],
};
