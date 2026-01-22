# Embed SDK - Tutorial

## How to fix
Using webpack.config.js
- target specific file 
- inject the magic comment 
```
  module: {
    exprContextCritical: false, // fixes error "Critical dependency: the request of a dependency is an expression"
    rules: [
      { 
        test: /\.ts|\.tsx?$/,
        loader: "ts-loader", // how to handle .ts files
        exclude: /node_modules/,
        options: {
          transpileOnly: true, // might want to revisit this, but to keep type checking silent
        },
      },
      {
        test: /@matterport[\\/]sdk[\\/]dist[\\/]index\.(umd|esm)\.js$/,
        type: "javascript/auto",
        use: [
          {
            loader: "string-replace-loader", // Gemini suggestion to inject string
            options: {
              // Using a more global search in case the variable name changes
              search: /import\((e|s|arguments\[0\])\)/g,
              replace: "import(/* webpackIgnore: true */ $1)",
            },
          },
        ],
      },
    ],
  },
```

## Getting Started
npm install & npm run start