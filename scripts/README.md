# Version Update Scripts

This directory contains a comprehensive bash automation script for updating versions in the React Native Emarsys SDK project.

## 🚀 Quick Start (from project root)

**Just run one simple command:**
```bash
./update
```

This launches a fully interactive workflow that guides you through updating SDK and package versions.

### ✨ **Smart Update Detection**
The scripts use **intelligent update detection**:
- 🔍 **Automatically checks** for latest SDK versions from GitHub
- 🎯 **Only prompts for updates** when newer versions are available  
- 📦 **Smart package versioning** with automatic next version suggestions
- 🚀 **Streamlined flow** - no unnecessary prompts when you're up to date!

**Smart Package Versioning:**
- 📈 **Automatic next version** calculation (e.g., 1.25.0 → 1.26.0)
- ✅ **Always offers updates** regardless of SDK status
- 🤖 **Derives Android versions** automatically from package version

**GitHub Integration:**
- 🤖 **Android SDK**: https://github.com/emartech/android-emarsys-sdk/releases/latest
- 🍎 **iOS SDK**: https://github.com/emartech/ios-emarsys-sdk/releases/latest  
- 🔗 **Major.minor version handling** for Android SDK compatibility

## What Gets Updated

The scripts update the following files and versions:

1. **Package Version** (in 1 file):
   - `package.json` - Updates the main package `version` field

2. **Android SDK Version** (in 1 file):
   - `android/build.gradle` - Updates the `com.emarsys:emarsys-sdk` dependency version

3. **Android App Versions** (derived from package version):
   - `android/build.gradle` - Updates `versionCode` (minor version number) and `versionName` (major.minor)

4. **iOS SDK Version** (in 1 file):
   - `RNEmarsysWrapper.podspec` - Updates the `EmarsysSDK` dependency version

## Available Scripts

### 🎯 Interactive Updater

```bash
# From project root - simple one-command approach
./update

# Or run directly from scripts folder:
./scripts/update-versions.sh
```

The script provides a complete interactive workflow that guides you through updating SDK and package versions with intelligent suggestions and automatic GitHub integration.

## 🔄 Complete Interactive Workflow

The `./update` command provides a complete workflow from version update to commit:

### **🔍 Step 0: Git Status Check**
- Automatically checks for uncommitted changes
- Prevents accidental overwrites by requiring clean git status
- Provides helpful suggestions for handling uncommitted changes

### **📋 Step 1: Review Current Versions**
- Displays current package, Android SDK, and iOS SDK versions
- Shows Android versionCode and versionName for reference

### **🔍 Step 2: Smart Update Detection**
- Fetches latest SDK versions from GitHub APIs
- Compares current vs. latest versions
- Only prompts for updates when newer versions are actually available

### **📦 Step 3: Version Updates**
- **iOS SDK**: Only prompted if newer version detected
- **Android SDK**: Only prompted if major.minor version changed
- **Package**: Always offers to update with smart next version calculation

### **📋 Step 4: Review Changes**
- Shows `git diff` to review what files were modified
- Lets you verify the changes before proceeding

### **💾 Step 5: Commit Changes**
- Auto-generates detailed commit messages with version changes
- Example: `"chore: update versions\n\n- iOS SDK: 3.9.0 → 3.9.1\n- Package: 1.25.0 → 1.26.0"`
- Runs `git add .` and `git commit` with confirmation

This gives you a complete, safe workflow from version update to committed changes! 🎯

## 💡 Usage Examples

**Smart Update Detection:**
```bash
$ ./update
🚀 React Native Emarsys SDK - Version Updater
This tool will guide you through updating SDK and package versions.

🔍 Checking git status...
✅ Git status is clean - ready to proceed!

📋 Current Versions:
   📦 Package: 1.25.0
   🤖 Android versionCode: 25
   🤖 Android versionName: 1.25
   🤖 Android SDK: 3.10.+
   🍎 iOS SDK: 3.9.0

🔍 Fetching latest SDK versions from GitHub...
   🤖 Latest Android SDK: 3.10.2
   🍎 Latest iOS SDK: 3.9.1

📊 Update Analysis:
   🤖 Android SDK: 3.10.+ (up to date)
   🍎 iOS SDK: 3.9.0 → 3.9.1 (update available!)
   📦 Package: 1.25.0 (can always be updated)

📋 We found some SDK updates available. Let's go through them:

🍎 Step 1: iOS SDK Update Available
Current: 3.9.0
Latest:  3.9.1

? Update to latest iOS SDK version? (Y/n): y
   → Will update to: 3.9.1

📦 Step 2: Package Version
Current: 1.25.0
Update to: 1.26.0

? Update package version? (Y/n): y
   → Updating to: 1.26.0
```

**When SDKs are up to date:**
```bash
$ ./update
📊 Update Analysis:
   🤖 Android SDK: 3.10.+ (up to date)
   🍎 iOS SDK: 3.9.1 (up to date)  
   📦 Package: 1.25.0 (can always be updated)

🎉 Great news! Your SDKs are already up to date!
We'll just check if you want to update the package version.

📦 Step 1: Package Version
Current: 1.25.0
Update to: 1.26.0

? Update package version? (Y/n): n
   → Keeping: 1.25.0

ℹ️  No changes detected. All versions remain the same.
```

**Complete workflow with commit:**
```bash
📋 Summary of Changes:
   📦 Package:     1.25.0 → 1.26.0
   🍎 iOS SDK:     3.9.0 → 3.9.1
   🤖 Android SDK: 3.10.+ → 3.10.+ (no change)
   🤖 versionCode: 25 → 26 (derived)
   🤖 versionName: 1.25 → 1.26 (derived)

🤔 Do you want to apply these changes?
? Proceed with update? (y/N): y

🔄 Applying updates...
   📝 Updating package.json... ✓
   📝 Updating Android build.gradle... ✓
   📝 Updating RNEmarsysWrapper.podspec... ✓

🎉 Version update completed successfully!

📝 Next Steps - Let's go through them together:

📋 Step 1: Review Changes
Would you like to see what files were changed?
? Run git diff to review changes? (Y/n): y

Running: git diff
[shows diff output]

💾 Step 2: Commit Changes
Ready to commit these version updates?
Commit message will be:
"chore: update versions

- iOS SDK: 3.9.0 → 3.9.1
- Package: 1.25.0 → 1.26.0"

? Commit these changes? (y/N): y

Running: git add .
Running: git commit -m "chore: update versions..."

✅ Changes committed successfully!

💡 Don't forget to push your changes:
   git push
```

## 🔧 Version Derivation Logic

**Android Version Code & Name:**
The script automatically derives Android app versions from the package version:
- **Package version**: `1.26.0`
- **Android versionCode**: `26` (minor version number)  
- **Android versionName**: `1.26` (major.minor)

**Android SDK Version Format:**
- Uses **major.minor.+** format (e.g., `3.10.+`)
- Only updates when **major.minor** version changes
- Maintains Gradle flexibility for patch versions

## 📋 Git Integration

**Safety Checks:**
- ✅ **Requires clean git status** before starting
- 🚫 **Prevents accidental overwrites** of uncommitted work
- 💡 **Provides helpful recovery suggestions** for dirty repos

**Automatic Commit Generation:**
- 📝 **Smart commit messages** with detailed version change summary
- 🔗 **Multi-line format** showing each component update
- ⚡ **One-command commit** with `git add .` + `git commit`

## 📁 Project Structure

- `update-versions.sh` - Main interactive version updater script
- `../update` (project root) - Simple launcher that calls the main script

## 🔍 File Dependencies

The script automatically detects and updates these files:
- `package.json` - Main package metadata
- `android/build.gradle` - Android app and SDK versions
- `RNEmarsysWrapper.podspec` - iOS SDK dependency
