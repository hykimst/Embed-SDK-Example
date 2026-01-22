# Embed SDK - Tutorial

## How to fix
Using webpack.config.js
- target specific file 
- inject the magic comment 
```
{
    // Use an absolute path or a robust regex to target the specific UMD and ESM files
    test: [/\/@matterport[\\/]sdk[\\/]dist[\\/]index\.umd\.js$/, /\/@matterport[\\/]sdk[\\/]dist[\\/]index\.esm\.js$/],
    use: [
        {
        loader: 'string-replace-loader',
        options: {
            // This targets the specific variable pattern you mentioned
            search: /await\s+import\((e|s|arguments\[0\])\)/g, 
            replace: 'await import(/* webpackIgnore: true */ $1)',
        },
        },
    ],
    },
```

## Getting Started
npm install & npm run start