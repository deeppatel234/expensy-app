module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./"],
      "alias": {
        "src": "./src",
        "Components": "./src/components",
        "Utils": "./src/utils",
        "Redux": "./src/redux",
      }
    }]
  ]
};
