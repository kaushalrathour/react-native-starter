# React Native Starter Template

A comprehensive React Native template with pre-configured dependencies, navigation, state management, and modern UI components.

## Features

- 🚀 **Pre-configured Dependencies**: Essential packages for React Native development
- 🧭 **Navigation**: React Navigation with stack navigator setup
- 🎨 **UI Components**: React Native Paper for Material Design components
- 📱 **State Management**: Redux Toolkit with pre-configured store
- 🎯 **TypeScript**: Full TypeScript support
- 📐 **Responsive Design**: React Native Size Matters for scaling
- 🔔 **Toast Messages**: React Native Toast Message integration
- 🎨 **Vector Icons**: React Native Vector Icons with auto-linking

## Usage

Create a new React Native app using this template:

```bash
npx @kaushalrathour/react-native-starter MyAppName
```

With custom package name:

```bash
npx @kaushalrathour/react-native-starter MyAppName com.yourcompany.myapp
```

## What's Included

### Dependencies
- **Navigation**: `@react-navigation/native`, `@react-navigation/stack`
- **UI**: `react-native-paper`, `react-native-vector-icons`, `react-native-toast-message`
- **State Management**: `@reduxjs/toolkit`, `react-redux`
- **Utilities**: `react-native-size-matters`, `@react-native-async-storage/async-storage`
- **Environment**: `react-native-dotenv`

### Project Structure
```
src/
├── components/
│   └── RootContainer/
├── constants/
│   ├── colors.ts
│   └── sizing.ts
├── navigation/
│   ├── NavigationContainer.tsx
│   └── StackNavigator.tsx
├── redux/
│   ├── slices/
│   │   └── themeSlice.ts
│   └── store.ts
├── screens/
│   ├── Home/
│   └── Onboarding/
└── types/
    ├── colors.ts
    └── navigation/
```

## Development

After creating your app:

1. Navigate to your app directory:
   ```bash
   cd MyAppName
   ```

2. For iOS, install pods:
   ```bash
   npx pod-install
   ```

3. Run the app:
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## GitHub Actions Setup

This template includes GitHub Actions workflows for automated publishing:

### Setting up OIDC Trust with npm

1. Go to your npm package settings
2. Set up "Trusted Publisher" with:
   - **Publisher**: GitHub Actions
   - **Organization**: `kaushalrathour`
   - **Repository**: Your repository name
   - **Workflow filename**: `publish.yml`

### Workflows Included

- **CI** (`ci.yml`): Runs tests and validation on push/PR
- **Publish** (`publish.yml`): Automatically publishes on releases
- **Release** (`release.yml`): Manual workflow for version bumping and publishing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Author

Kaushal Rathour
