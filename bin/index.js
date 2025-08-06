#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execa } = require('execa');
const chalk = require('chalk');

async function run() {
  const appName = process.argv[2];
  const packageName = process.argv[3]; // optional

  if (!appName) {
    console.error(chalk.red('❌ Please provide an app name.\nUsage: node bootstrap.js MyApp [com.organization.appname]'));
    process.exit(1);
  }

  const cwd = process.cwd(); // Current working directory where command is run
  const appPath = path.join(cwd, appName);
  const templateDir = path.resolve(__dirname, '../overrides');

  try {
    // Step 1: Initialize React Native app
    console.log(chalk.cyan(`🚀 Initializing React Native app '${appName}'...`));

    const initArgs = ['@react-native-community/cli', 'init', appName];
    if (packageName) {
      initArgs.push('--package-name', packageName);
    }

    await execa('npx', initArgs, { cwd: cwd, stdio: 'inherit' });

    // Step 2: Remove files/folders to override
    const toRemove = ['App.tsx', 'README.md', 'babel.config.js', 'assets', 'src'];
    for (const item of toRemove) {
      const targetPath = path.join(appPath, item);
      if (await fs.pathExists(targetPath)) {
        console.log(chalk.yellow(`🗑 Removing ${item}...`));
        await fs.remove(targetPath);
      }
    }

    // Step 3: Copy files from overrides/
    console.log(chalk.cyan('📂 Copying custom files from overrides/...'));
    await fs.copy(templateDir, appPath, { overwrite: true, recursive: true });

    // Step 4: Install dependency groups
    const group1 = [
      '@react-native-async-storage/async-storage',
      'react-native-size-matters',
      'react-native-vector-icons',
      'react-native-paper',
      'react-native-toast-message',
    ];

    const group2 = [
      '@react-navigation/native',
      '@react-navigation/stack',
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-safe-area-context',
      'react-native-screens',
    ];

    const group3 = [
      'react-native-dotenv',
      '@reduxjs/toolkit',
      'react-redux',
    ];

    console.log(chalk.green(`📦 Installing group 1 dependencies...`));
    await execa('npm', ['install', ...group1], { cwd: appPath, stdio: 'inherit' });

    console.log(chalk.green(`📦 Installing group 2 dependencies...`));
    await execa('npm', ['install', ...group2], { cwd: appPath, stdio: 'inherit' });

    // Install group3 dependencies
    console.log(chalk.green(`📦 Installing group 3 dependencies...`));
    await execa('npm', ['install', ...group3], { cwd: appPath, stdio: 'inherit' });

    // Step 5: Append fonts.gradle line
    const buildGradlePath = path.join(appPath, 'android', 'app', 'build.gradle');
    const fontGradleLine = 'apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")';

    if (await fs.pathExists(buildGradlePath)) {
      let gradleContent = await fs.readFile(buildGradlePath, 'utf8');
      if (!gradleContent.includes(fontGradleLine)) {
        gradleContent = `${gradleContent.trim()}\n\n${fontGradleLine}\n`;
        await fs.writeFile(buildGradlePath, gradleContent, 'utf8');
        console.log(chalk.green('➕ Added fonts.gradle line to android/app/build.gradle'));
      } else {
        console.log(chalk.gray('✔ fonts.gradle line already present'));
      }
    } else {
      console.warn(chalk.red('⚠ android/app/build.gradle not found — skipping modification'));
    }

    console.log(chalk.green(`\n✅ Project '${appName}' is ready! 🚀`));

    // Show the full path and directory contents
    console.log(chalk.cyan(`\nProject directory: ${appPath}`));
    const dirContents = await fs.readdir(appPath);
    console.log(chalk.cyan('Project contents:'));
    dirContents.forEach(item => console.log('  -', item));

    // Provide user instructions
    console.log(chalk.yellow(`\nNext steps:`));
    console.log(chalk.yellow(`1. cd ${appPath}`));
    console.log(chalk.yellow(`2. For iOS, run: npx pod-install`));
    console.log(chalk.yellow(`3. To run on iOS: npx react-native run-ios`));
    console.log(chalk.yellow(`4. To run on Android: npx react-native run-android`));
    console.log(chalk.gray(`\nNote: For iOS, make sure you have CocoaPods installed. If not, install it with 'sudo gem install cocoapods'.`));
  } catch (err) {
    console.error(chalk.red('❌ An error occurred:'), err);
    process.exit(1);
  }
}

run();
