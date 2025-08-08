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
    console.log(chalk.cyan('🔧 Setting up custom template files...'));
    const toRemove = ['App.tsx', 'README.md', 'babel.config.js', 'assets', 'src'];
    for (const item of toRemove) {
      const targetPath = path.join(appPath, item);
      if (await fs.pathExists(targetPath)) {
        await fs.remove(targetPath);
      }
    }

    // Step 3: Copy files from overrides/
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
      'react-native-reanimated@3.19.0',
      'react-native-safe-area-context',
      'react-native-screens',
    ];

    const group3 = [
      'react-native-dotenv',
      '@reduxjs/toolkit',
      'react-redux',
    ];

    console.log(chalk.green(`📦 Installing UI & utility dependencies: ${group1.join(', ')}...`));
    await execa('npm', ['install', ...group1], { cwd: appPath, stdio: 'inherit' });

    console.log(chalk.green(`📦 Installing navigation dependencies: ${group2.join(', ')}...`));
    await execa('npm', ['install', ...group2], { cwd: appPath, stdio: 'inherit' });

    console.log(chalk.green(`📦 Installing state management dependencies: ${group3.join(', ')}...`));
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

    // Change to project directory
    process.chdir(appPath);
    console.log(chalk.cyan(`\n📁 Changed to project directory: ${appName}`));
    
    const dirContents = await fs.readdir(appPath);
    console.log(chalk.cyan('Project contents:'));
    dirContents.forEach(item => console.log('  -', item));

    // Prompt for CocoaPods installation on macOS
    const os = require('os');
    if (os.platform() === 'darwin') {
      console.log(chalk.yellow('\n🍎 Detected macOS - iOS development available'));
      
      // Simple prompt using readline
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const installPods = await new Promise((resolve) => {
        rl.question(chalk.cyan('📱 Install CocoaPods dependencies now? (y/N): '), (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
      });
      
      if (installPods) {
        try {
          console.log(chalk.cyan('\n📦 Installing CocoaPods dependencies...'));
          await execa('npx', ['pod-install'], { cwd: appPath, stdio: 'inherit' });
          console.log(chalk.green('✅ CocoaPods installation completed!'));
        } catch (error) {
          console.log(chalk.red('❌ CocoaPods installation failed. You can run it manually later:'));
          console.log(chalk.yellow('npx pod-install'));
        }
      }
    }

    // Provide user instructions
    console.log(chalk.yellow(`\n🚀 Next steps:`));
    if (os.platform() !== 'darwin') {
      console.log(chalk.yellow(`1. For iOS (macOS only): npx pod-install`));
      console.log(chalk.yellow(`2. To run on iOS: npx react-native run-ios`));
      console.log(chalk.yellow(`3. To run on Android: npx react-native run-android`));
    } else {
      console.log(chalk.yellow(`1. To run on iOS: npx react-native run-ios`));
      console.log(chalk.yellow(`2. To run on Android: npx react-native run-android`));
    }
    
    console.log(chalk.cyan(`\n📋 Troubleshooting Pod Install Issues:`));
    console.log(chalk.gray(`If you encounter 'RNWorklets' dependency errors during pod install:`));
    console.log(chalk.gray(`• This template uses react-native-reanimated@3.19.0 to avoid compatibility issues`));
    console.log(chalk.gray(`• If errors persist, try: cd ios && pod install --repo-update`));
    console.log(chalk.gray(`• For other dependency conflicts, check: https://github.com/software-mansion/react-native-reanimated/issues`));
  } catch (err) {
    console.error(chalk.red('❌ An error occurred:'), err);
    process.exit(1);
  }
}

run();
