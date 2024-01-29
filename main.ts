#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// theme path
const themesDirectory = path.join(__dirname, '..', 'themes');
// user-file path
const userDirectory = path.join(__dirname, '..', 'src');

// MTAppjQuery Install Check
const isMtAppjQueryInstalled = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installed',
      message: "Do you have MTAppjQuery installed?"
    }
  ]);
  return answer.installed; // true or false
};

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
  const mtAppjQueryInstalled = await isMtAppjQueryInstalled();

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
      default: 'mtml' // default value
    }
  ]);

  if (mtAppjQueryInstalled) { // MTAppjQuery Installed
    const users = getUsers();
    const userAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'users',
        message: 'Select a user-file to generate:',
        choices: users
      }
    ]);

    const outputAnswerUsers = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputDirUsers',
        message: 'Enter the output user-file directory:',
        default: 'user-file' // default value
      }
    ]);

    const selectedUsers = userAnswer.users;
    const outputDirUsers = outputAnswerUsers.outputDirUsers;
    // Copy user-file
    const destinationPathUsers = path.join('./', outputDirUsers);
    if (!dryRun) {
      try {
        await fse.copy(path.join(userDirectory, selectedUsers), destinationPathUsers);
        console.log(`User.js ${selectedUsers} copied to ${destinationPathUsers}`);
      } catch (err) {
        console.error(`Error copying the user-file: ${err}`);
      }
    } else {
      console.log(`Dry run: ${selectedUsers} would be copied to ${destinationPathUsers}`);
    }
  }

  const selectedTheme = themeAnswer.theme;
  const outputDir = outputAnswer.outputDir;
  console.log(`Selected theme: ${selectedTheme}, Output directory: ${outputDir}`);

  // Copy theme path
  const destinationPath = path.join('./', outputDir, selectedTheme);

  // Copy theme
  if (!dryRun) {
    try {
      await fse.copy(path.join(themesDirectory, selectedTheme), destinationPath);
      console.log(`Theme ${selectedTheme} copied to ${destinationPath}`);
    } catch (err) {
      console.error(`Error copying the theme: ${err}`);
    }
  } else {
    // dry run Not copy
    console.log(`Dry run: ${selectedTheme} would be copied to ${destinationPath}`);
  }
};

program.option('-d, --dry-run', 'dry run');
program.parse();
const options = program.opts();

main(options.dryRun);
