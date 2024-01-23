#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

const themesDirectory = path.join('./', 'themes');

const getThemes = () => {
  return fs.readdirSync(themesDirectory).filter(file => {
    return fs.statSync(path.join(themesDirectory, file)).isDirectory();
  });
};

const main = async (dryRun: boolean) => {
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

  const selectedTheme = themeAnswer.theme;
  const outputDir = outputAnswer.outputDir;
  console.log(`Selected theme: ${selectedTheme}, Output directory: ${outputDir}`);

  // コピー先のディレクトリパスを定義
  const destinationPath = path.join('./', outputDir, selectedTheme);

  // テーマディレクトリをコピー
  if (!dryRun) {
    try {
      await fse.copy(path.join(themesDirectory, selectedTheme), destinationPath);
      console.log(`Theme ${selectedTheme} copied to ${destinationPath}`);
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
