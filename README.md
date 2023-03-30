# TypeScript Server Template

Easily sets up TypeScript server-side projects that are StackBlitz compliant. Comes with everything needed for easy TypeScript usage and has CommanderJS.

## Install

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hypercrowd/twitter-summary)

```bash
git clone https://github.com/HyperCrowd/twitter-summary.git <projectName>
cd <projectName>
rm -fr .git
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<yourGithubName>/<projectName>.git
git push -u origin main
yarn install
```

## Testing

Add your tests to the [`tests`](tests) folder, then import them in the [`tests/index.ts`](tests/index.ts) file.

## CLI

### npm

- `npm run build`: Builds the source TypeScript to CommonJS, ESM, and IIFE JavaScript files in [`dist`](dist)
- `npm run sb-watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (StackBlitz-friendly)
- `npm run watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (Every other system)
- `npm test`: Runs tests.

### yarn

- `yarn build`: Builds the source TypeScript to CommonJS, ESM, and IIFE JavaScript files in [`dist`](dist)
- `yarn sb-watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (StackBlitz-friendly)
- `yarn watch`: Watches for changes for TypeScript files, builds the source on a change, then runs [`dist/index.js`](dist/index.js) (Every other system)
- `yarn test`: Runs tests.
