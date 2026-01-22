# Embed SDK - Tutorial

## How to fix
Manually added Magic Comment in both modules ESM + UMD
- @matterport/sdk/dist/index.esm.js > `s=await import(/* webpackIgnore: true */e)`
- @matterport/sdk/dist/index.umd.js > `s=await import(/* webpackIgnore: true */e)`

## Getting Started
npm install & npm run start