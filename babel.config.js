module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./"],
      "alias": {
        "Src": "./src",
        "Components": "./src/components",
        "Utils": "./src/utils",
        "Redux": "./src/redux",
        "Base": "./src/base",
        "Screens": "./src/screens",
        "Models": "./src/sql/models",
      }
    }]
  ]
};
