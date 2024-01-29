#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// 現在のモジュールのディレクトリパスを取得
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// テーマディレクトリのパスを定義
const themesDirectory = path.join(__dirname, '..', 'themes');
// ユーザディレクトリのパスを定義
const userDirectory = path.join(__dirname, '..', 'src');

const getUsers = () => {
  return fs.readdirSync(userDirectory).filter(file => {
    return fs.statSync(path.join(userDirectory, file)).isDirectory();
  });
}
const getThemes = () => {
  return fs.readdirSync(themesDirectory).filter(file => {
    return fs.statSync(path.join(themesDirectory, file)).isDirectory();
  });
};

const main = async (dryRun: boolean) => {
  const users = getUsers();
  const themes = getThemes();

  const themeAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Select a theme to generate:',
      choices: themes
    }
  ]);

  const outputAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'outputDir',
      message: 'Enter the output directory:',
      default: 'mtml' // デフォルト値を設定
    }
  ]);

  const userAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'users',
      message: 'Are you using MTAppjQuery? Select a user-file to generate:',
      choices: users
    }
  ])

  const outputAnswerUsers = await inquirer.prompt([
    {
      type: 'input',
      name: 'outputDirUsers',
      message: 'Enter the output user-file directory:',
      default: 'user-file' // デフォルト値を設定
    }
  ])

  const selectedTheme = themeAnswer.theme;
  const selectedUsers = userAnswer.users;
  const outputDir = outputAnswer.outputDir;
  const outputDirUsers = outputAnswerUsers.outputDirUsers;
  console.log(`Selected theme: ${selectedTheme}, Output directory: ${outputDir}`);

  // コピー先のディレクトリパスを定義
  const destinationPath = path.join('./', outputDir, selectedTheme);
  const destinationPathUsers = path.join('./', outputDirUsers);

  // テーマディレクトリをコピー
  if (!dryRun) {
    try {
      await fse.copy(path.join(themesDirectory, selectedTheme), destinationPath);
      await fse.copy(path.join(userDirectory, selectedUsers), destinationPathUsers);
      console.log(`Theme ${selectedTheme} copied to ${destinationPath}`);
      console.log(`User.js ${selectedUsers} copied to ${destinationPathUsers}`);
    } catch (err) {
      console.error(`Error copying the theme: ${err}`);
    }
  } else {
    // dry run の場合は実際のコピーを行わない
    console.log(`Dry run: ${selectedTheme} would be copied to ${destinationPath}`);
  }
};

program.option('-d, --dry-run', 'dry run');
program.parse();
const options = program.opts();

main(options.dryRun);
