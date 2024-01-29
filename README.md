# mt-theme-starterkit

Movable Type Theme CLI Tool.

## What is mt-theme-starterkit?

mt-theme-starterkit is an interactive CLI that automatically generates themes for use with Movable Type.

### Node.js version

- "node": "20.10.0",
- "npm": "10.2.3"

## Usage

```sh
npx mt-theme-starterkit

? Do you have MTAppjQuery installed? (Y/n) Y
? Select a theme to generate: (Use arrow keys)
❯ theme-starter
? Enter the output directory: (mtml) 
? Select a user-file to generate: (Use arrow keys)
❯ base-userfile 
? Enter the output user-file directory: (user-file) 
```

1. Do you have MTAppjQuery installed?
2. Select a theme
3. Set the output destination for the selected theme
4. If yes in 1, select MTAppjQuery user.js / user.css
5. Enter the output destination for user.js / user.css. Default is user-file.

## How will you conduct the development?

The code for developing the interactive CLI is done in TypeScript.

The CLI execution command is `main.ts`.

Run `npx tsc --build` on `main.ts` to generate `dist/main.js`.

```shell
npx tsc --build
```

## How to CLI test

```shell
node dist/main.js
```
