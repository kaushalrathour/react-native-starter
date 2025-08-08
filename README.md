# 🚀 React Native Starter Template

**Skip the boring setup. Start building amazing apps instantly!**

[![npm version](https://badge.fury.io/js/%40kaushalrathour%2Freact-native-starter.svg)](https://badge.fury.io/js/%40kaushalrathour%2Freact-native-starter)
[![Downloads](https://img.shields.io/npm/dm/@kaushalrathour/react-native-starter.svg)](https://www.npmjs.com/package/@kaushalrathour/react-native-starter)c3a69%3BSampled%3D0&amp;X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAZWGGEKHDQUS7FA4W%2F20250807%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20250807T095126Z&amp;X-Amz-Expires=3600&amp;X-Amz-Signe
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Professional-grade foundation for React Native apps**  
> **Save 4-6 hours** of initial setup - start building features *today*

## ⚡ Why Developers Love This Template

```bash
# Create production-ready app in 30 seconds
npx @kaushalrathour/react-native-starter MyAwesomeApp

# with custom package name
npx @kaushalrathour/react-native-starter MyAwesomeApp com.orgname.myawesomeapp
```

**Real results from actual users:**  
> *"Saved our team 20+ hours in project setup across 4 apps!"* - Mobile Team Lead  
> *"Finally a template that just works with TypeScript and Redux Toolkit"* - Senior React Native Dev  

### 🎯 Everything You Need. Nothing You Don't.

| Feature | Benefit | Ready-to-Use |
|---------|---------||--------------|
| **🚀 Production-Ready Architecture** | Scalable folder structure | ✅ |
| **🧭 React Navigation v6** | Type-safe routing | ✅ |
| **📦 Redux Toolkit** | Modern state management | ✅ |
| **🎨 React Native Paper** | Beautiful Material Design | ✅ |
| **📱 Responsive Scaling** | Perfect UI on all devices | ✅ |
| **🔔 Toast Notifications** | User feedback system | ✅ |

## 🏃‍♂️ Get Started in 60 Seconds

1. **Create your app**:
```bash
npx @kaushalrathour/react-native-starter MyApp
```

2. **Install dependencies**:
```bash
cd MyAwesomeApp && npx pod-install
```

3. **Launch**:
```bash
npx react-native run-ios     # iOS
npx react-native run-android # Android
```



### 📂 Intelligent Project Structure
```
src/
├── components/      # Reusable UI
├── navigation/      # Routing system
├── redux/           # State management
├── screens/         # App views
├── services/        # API layer
├── theme/           # Design system
└── utils/           # Helpers & hooks
```

## 💡 Real-World Use Cases

| Scenario | How This Template Helps |
|----------|-------------------------|
| **Startup MVP** | Launch in days instead of weeks |
| **Enterprise App** | Built-in TypeScript safety |
| **Hackathon Project** | Skip setup, focus on innovation |
| **Team Collaboration** | Consistent architecture |
| **Learning React Native** | Best practices baked-in |
## ❤️ Community-Driven Excellence

Join **1,800+ developers** who've shipped apps faster with this template:

```bash
# Always get the latest version
npx @kaushalrathour/react-native-starter@latest MyApp
```

**We're here to support you:**
- 📚 [Full Documentation](https://github.com/kaushalrathour/react-native-starter/wiki)
- 🐛 [Issue Tracking](https://github.com/kaushalrathour/react-native-starter/issues)
- 💬 [Community Discussions](https://github.com/kaushalrathour/react-native-starter/discussions)

## 🌟 Why This Stands Out

```javascript
// Example: Pre-configured responsive sizing
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    padding: scale(20),       // Responsive horizontal
    marginTop: verticalScale(10) // Responsive vertical
  }
});
```

**You get battle-tested solutions:**  
✅ **Tested** with React Native 0.72+  
✅ **Regularly updated** dependencies  
✅ **Commercial project** proven  

## 🔧 Troubleshooting

### Pod Install Issues (iOS)

**Problem**: `Unable to find a specification for RNWorklets depended upon by RNReanimated`

**Solution**: This template uses `react-native-reanimated@3.19.0` to prevent this issue. If you still encounter problems:

```bash
# Method 1: Update pod repos
cd ios && pod install --repo-update

# Method 2: Clean and reinstall
cd ios && rm -rf Pods Podfile.lock && pod install

# Method 3: Reset pod cache
pod cache clean --all && pod install
```

**Why this happens**: Newer versions of `react-native-reanimated` depend on `RNWorklets`, but dependency resolution can fail. Our template pins to a stable version.

### Common npm Install Errors

```bash
# ❌ Wrong syntax
npm install "react-native-reanimated": "^3.19.0"

# ✅ Correct syntax  
npm install react-native-reanimated@3.19.0
```

### Metro Bundle Issues

```bash
# Reset Metro cache
npx react-native start --reset-cache

# Clean build folders
cd android && ./gradlew clean && cd ..
cd ios && xcodebuild clean && cd ..
```

## 🤝 Contribute & Grow

**Join our movement:**  
```bash
# 1. Fork repo
# 2. Create feature branch
# 3. Submit PR with improvements
```

**Every contribution helps:**  
- Fix typos in docs  
- Add new examples  
- Improve TypeScript types  
- Enhance starter components  

## 📄 License

**MIT License** - Free for personal and commercial use. No attribution required.

---

<div align="center">

**Created with ❤️ by [Kaushal Rathour](https://github.com/kaushalrathour)** 

**⭐ If this saved you time, star the repo! ⭐**  
**Your stars fuel our updates!**

</div>
