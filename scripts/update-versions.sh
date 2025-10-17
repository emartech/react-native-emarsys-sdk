#!/bin/bash

# Interactive Version Updater for React Native Emarsys SDK
# This script walks you through updating versions step by step

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# File paths
PACKAGE_JSON_PATH="$PROJECT_ROOT/package.json"
ANDROID_GRADLE_PATH="$PROJECT_ROOT/android/build.gradle"
IOS_PODSPEC_PATH="$PROJECT_ROOT/RNEmarsysWrapper.podspec"

# Function to get current versions
get_current_versions() {
    echo -e "${CYAN}📋 Current Versions:${NC}"
    
    # Get current package version
    if [ -f "$PACKAGE_JSON_PATH" ]; then
        CURRENT_PACKAGE=$(grep '"version":' "$PACKAGE_JSON_PATH" | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
        echo -e "${WHITE}   📦 Package: ${YELLOW}$CURRENT_PACKAGE${NC}"
    fi
    
    # Get current Android version info
    if [ -f "$ANDROID_GRADLE_PATH" ]; then
        CURRENT_ANDROID_VERSION_CODE=$(grep 'versionCode' "$ANDROID_GRADLE_PATH" | sed 's/.*versionCode \(.*\)/\1/')
        CURRENT_ANDROID_VERSION_NAME=$(grep 'versionName' "$ANDROID_GRADLE_PATH" | sed 's/.*versionName "\(.*\)".*/\1/')
        CURRENT_ANDROID_SDK=$(grep 'com.emarsys:emarsys-sdk:' "$ANDROID_GRADLE_PATH" | sed 's/.*com.emarsys:emarsys-sdk:\(.*\)".*/\1/')
        echo -e "${WHITE}   🤖 Android versionCode: ${YELLOW}$CURRENT_ANDROID_VERSION_CODE${NC}"
        echo -e "${WHITE}   🤖 Android versionName: ${YELLOW}$CURRENT_ANDROID_VERSION_NAME${NC}"
        echo -e "${WHITE}   🤖 Android SDK: ${YELLOW}$CURRENT_ANDROID_SDK${NC}"
    fi
    
    # Get current iOS SDK version
    if [ -f "$IOS_PODSPEC_PATH" ]; then
        CURRENT_IOS_SDK=$(grep 'EmarsysSDK' "$IOS_PODSPEC_PATH" | sed 's/.*"~> \(.*\)".*/\1/')
        echo -e "${WHITE}   🍎 iOS SDK: ${YELLOW}$CURRENT_IOS_SDK${NC}"
    fi
    echo ""
}

# Function to fetch latest SDK versions from GitHub
fetch_latest_sdk_versions() {
    echo -e "${CYAN}🔍 Fetching latest SDK versions from GitHub...${NC}"
    
    # Fetch latest Android SDK version
    if command -v curl >/dev/null 2>&1; then
        LATEST_ANDROID=$(curl -s "https://api.github.com/repos/emartech/android-emarsys-sdk/releases/latest" 2>/dev/null | grep '"tag_name"' | sed 's/.*"tag_name": "\([^"]*\)".*/\1/' || echo "")
        if [ -n "$LATEST_ANDROID" ]; then
            echo -e "${WHITE}   🤖 Latest Android SDK: ${GREEN}$LATEST_ANDROID${NC}"
        else
            echo -e "${YELLOW}   ⚠️  Could not fetch latest Android SDK version${NC}"
        fi
        
        # Fetch latest iOS SDK version
        LATEST_IOS=$(curl -s "https://api.github.com/repos/emartech/ios-emarsys-sdk/releases/latest" 2>/dev/null | grep '"tag_name"' | sed 's/.*"tag_name": "\([^"]*\)".*/\1/' || echo "")
        if [ -n "$LATEST_IOS" ]; then
            echo -e "${WHITE}   🍎 Latest iOS SDK: ${GREEN}$LATEST_IOS${NC}"
        else
            echo -e "${YELLOW}   ⚠️  Could not fetch latest iOS SDK version${NC}"
        fi
    else
        echo -e "${YELLOW}   ⚠️  curl not available - cannot fetch latest versions${NC}"
        LATEST_ANDROID=""
        LATEST_IOS=""
    fi
    echo ""
}

# Function to extract major.minor version from a version string
get_major_minor() {
    local version=$1
    # Remove any .+ suffix first
    version=${version%.+}
    local major=$(echo "$version" | cut -d. -f1)
    local minor=$(echo "$version" | cut -d. -f2)
    echo "${major}.${minor}"
}

# Function to determine if Android SDK should be updated
should_update_android_sdk() {
    local current=$1
    local latest=$2
    
    # Extract major.minor from both versions
    local current_major_minor=$(get_major_minor "$current")
    local latest_major_minor=$(get_major_minor "$latest")
    
    # Only update if major.minor has changed
    if [ "$current_major_minor" != "$latest_major_minor" ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Function to derive Android version info from package version
derive_android_versions() {
    local package_version=$1
    local major=$(echo "$package_version" | cut -d. -f1)
    local minor=$(echo "$package_version" | cut -d. -f2)
    
    # versionName is major.minor (e.g., 1.26.0 -> 1.26)
    local version_name="${major}.${minor}"
    
    # versionCode is just the minor version (e.g., 1.26.0 -> 26)
    local version_code=$minor
    
    echo "$version_code $version_name"
}

# Function to calculate next package version suggestions
calculate_package_versions() {
    local current_version="$1"
    
    # Parse version (e.g., "1.25.0" → major=1, minor=25, patch=0)
    if [[ "$current_version" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
        local major="${BASH_REMATCH[1]}"
        local minor="${BASH_REMATCH[2]}"
        
        SUGGESTED_NEXT="$major.$((minor + 1)).0"
    else
        SUGGESTED_NEXT=""
    fi
}

# Function to prompt for package version with smart suggestions
prompt_for_package_version() {
    local current_version="$1"
    local variable_name="$2"
    
    # Calculate smart version suggestions
    calculate_package_versions "$current_version"
    
    echo -e "${BLUE}${BOLD}📦 Package Version Update${NC}"
    echo -e "${WHITE}Current: ${YELLOW}$current_version${NC}"
    
    if [ -n "$SUGGESTED_NEXT" ]; then
        echo -e "${WHITE}Update to: ${GREEN}$SUGGESTED_NEXT${NC}"
    else
        echo -e "${RED}   ✗ Could not calculate next version${NC}"
        eval "$variable_name='$current_version'"
        return
    fi
    
    echo ""
    
    while true; do
        read -p $'\033[1;32m? Update package version? (Y/n): \033[0m' input
        input=${input:-y}  # Default to yes
        
        if [[ "$input" =~ ^[Yy]$ ]]; then
            # Update to next version
            eval "$variable_name='$SUGGESTED_NEXT'"
            echo -e "${WHITE}   → Updating to: ${GREEN}$SUGGESTED_NEXT${NC}"
            break
        elif [[ "$input" =~ ^[Nn]$ ]]; then
            # Keep current version
            eval "$variable_name='$current_version'"
            echo -e "${WHITE}   → Keeping: ${YELLOW}$current_version${NC}"
            break
        else
            echo -e "${RED}   ✗ Please answer 'y' for yes or 'n' for no${NC}"
        fi
    done
    echo ""
}

# Function to check git status
check_git_status() {
    echo -e "${CYAN}🔍 Checking git status...${NC}"
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "${RED}❌ Not in a git repository. Please run this script from within a git repository.${NC}"
        exit 1
    fi
    
    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo -e "${RED}❌ You have uncommitted changes in your repository.${NC}"
        echo -e "${WHITE}Please commit or stash your changes before running the version updater.${NC}"
        echo ""
        
        echo -e "${YELLOW}Uncommitted changes:${NC}"
        git status --porcelain
        echo ""
        
        echo -e "${WHITE}To proceed, first handle your changes:${NC}"
        echo -e "${CYAN}   git add . && git commit -m \"your message\"${NC}"
        echo -e "${CYAN}   git stash${NC}"
        echo -e "${CYAN}   git reset --hard HEAD${NC} ${YELLOW}(careful - discards changes!)${NC}"
        
        exit 1
    else
        echo -e "${GREEN}✅ Git status is clean - ready to proceed!${NC}"
        echo ""
    fi
}

# Main script
echo -e "${BOLD}${GREEN}🚀 React Native Emarsys SDK - Version Updater${NC}"
echo -e "${WHITE}This tool will guide you through updating SDK and package versions.${NC}"
echo ""

# Check git status first
check_git_status

# Show current versions
get_current_versions

# Fetch latest SDK versions from GitHub
fetch_latest_sdk_versions

# Check for available updates
ANDROID_UPDATE_AVAILABLE=false
IOS_UPDATE_AVAILABLE=false

if [ -n "$LATEST_ANDROID" ] && [ -n "$CURRENT_ANDROID_SDK" ]; then
    should_update=$(should_update_android_sdk "$CURRENT_ANDROID_SDK" "$LATEST_ANDROID")
    if [ "$should_update" = "true" ]; then
        ANDROID_UPDATE_AVAILABLE=true
    fi
fi

if [ -n "$LATEST_IOS" ] && [ "$CURRENT_IOS_SDK" != "$LATEST_IOS" ]; then
    IOS_UPDATE_AVAILABLE=true
fi

echo -e "${CYAN}📊 Update Analysis:${NC}"
if [ "$ANDROID_UPDATE_AVAILABLE" = true ]; then
    echo -e "${WHITE}   🤖 Android SDK: ${YELLOW}$(get_major_minor "$CURRENT_ANDROID_SDK").+${NC} → ${GREEN}$(get_major_minor "$LATEST_ANDROID").+${NC} ${CYAN}(update available!)${NC}"
else
    if [ -n "$CURRENT_ANDROID_SDK" ] && [ -n "$LATEST_ANDROID" ]; then
        echo -e "${WHITE}   🤖 Android SDK: ${GREEN}$(get_major_minor "$CURRENT_ANDROID_SDK").+${NC} ${CYAN}(up to date)${NC}"
    else
        echo -e "${WHITE}   🤖 Android SDK: ${YELLOW}$CURRENT_ANDROID_SDK${NC} ${CYAN}(checking...)${NC}"
    fi
fi

if [ "$IOS_UPDATE_AVAILABLE" = true ]; then
    echo -e "${WHITE}   🍎 iOS SDK: ${YELLOW}$CURRENT_IOS_SDK${NC} → ${GREEN}$LATEST_IOS${NC} ${CYAN}(update available!)${NC}"
else
    echo -e "${WHITE}   🍎 iOS SDK: ${GREEN}$CURRENT_IOS_SDK${NC} ${CYAN}(up to date)${NC}"
fi

echo -e "${WHITE}   📦 Package: ${YELLOW}$CURRENT_PACKAGE${NC} ${CYAN}(can always be updated)${NC}"
echo ""

# Show what we'll be doing
if [ "$ANDROID_UPDATE_AVAILABLE" = false ] && [ "$IOS_UPDATE_AVAILABLE" = false ]; then
    echo -e "${GREEN}🎉 Great news! Your SDKs are already up to date!${NC}"
    echo -e "${WHITE}We'll just check if you want to update the package version.${NC}"
    echo ""
else
    echo -e "${CYAN}📋 We found some SDK updates available. Let's go through them:${NC}"
    echo ""
fi

# Initialize versions with current values
NEW_ANDROID_SDK="$CURRENT_ANDROID_SDK"
NEW_IOS_SDK="$CURRENT_IOS_SDK"

STEP_COUNT=1

# Step 1: iOS SDK Update (only if update available)
if [ "$IOS_UPDATE_AVAILABLE" = true ]; then
    echo -e "${BLUE}${BOLD}🍎 Step $STEP_COUNT: iOS SDK Update Available${NC}"
    echo -e "${WHITE}Current: ${YELLOW}$CURRENT_IOS_SDK${NC}"
    echo -e "${WHITE}Latest:  ${GREEN}$LATEST_IOS${NC}"
    echo ""
    
    while true; do
        read -p $'\033[1;32m? Update to latest iOS SDK version? (Y/n): \033[0m' ios_update
        ios_update=${ios_update:-y}  # Default to yes
        
        if [[ "$ios_update" =~ ^[Yy]$ ]]; then
            NEW_IOS_SDK="$LATEST_IOS"
            echo -e "${WHITE}   → Will update to: ${GREEN}$LATEST_IOS${NC}"
            break
        elif [[ "$ios_update" =~ ^[Nn]$ ]]; then
            echo -e "${WHITE}   → Keeping current: ${YELLOW}$CURRENT_IOS_SDK${NC}"
            break
        else
            echo -e "${RED}   ✗ Please answer 'y' for yes or 'n' for no${NC}"
        fi
    done
    echo ""
    STEP_COUNT=$((STEP_COUNT + 1))
fi

# Step 2: Android SDK Update (only if update available)
if [ "$ANDROID_UPDATE_AVAILABLE" = true ]; then
    echo -e "${BLUE}${BOLD}🤖 Step $STEP_COUNT: Android SDK Update Available${NC}"
    echo -e "${WHITE}Current: ${YELLOW}$(get_major_minor "$CURRENT_ANDROID_SDK").+${NC}"
    echo -e "${WHITE}Latest:  ${GREEN}$(get_major_minor "$LATEST_ANDROID").+${NC}"
    echo ""
    
    while true; do
        read -p $'\033[1;32m? Update to latest Android SDK version? (Y/n): \033[0m' android_update
        android_update=${android_update:-y}  # Default to yes
        
        if [[ "$android_update" =~ ^[Yy]$ ]]; then
            NEW_ANDROID_SDK=$(get_major_minor "$LATEST_ANDROID")
            echo -e "${WHITE}   → Will update to: ${GREEN}${NEW_ANDROID_SDK}.+${NC}"
            break
        elif [[ "$android_update" =~ ^[Nn]$ ]]; then
            echo -e "${WHITE}   → Keeping current: ${YELLOW}$(get_major_minor "$CURRENT_ANDROID_SDK").+${NC}"
            NEW_ANDROID_SDK=$(get_major_minor "$CURRENT_ANDROID_SDK")
            break
        else
            echo -e "${RED}   ✗ Please answer 'y' for yes or 'n' for no${NC}"
        fi
    done
    echo ""
    STEP_COUNT=$((STEP_COUNT + 1))
else
    # Keep current Android SDK but ensure we have the major.minor format
    NEW_ANDROID_SDK=$(get_major_minor "$CURRENT_ANDROID_SDK")
fi

# Step N: Package Version (always ask)
echo -e "${BLUE}${BOLD}📦 Step $STEP_COUNT: Package Version${NC}"
prompt_for_package_version "$CURRENT_PACKAGE" "NEW_PACKAGE_VERSION"

# Derive Android version info from package version
android_versions=$(derive_android_versions "$NEW_PACKAGE_VERSION")
NEW_ANDROID_VERSION_CODE=$(echo "$android_versions" | cut -d' ' -f1)
NEW_ANDROID_VERSION_NAME=$(echo "$android_versions" | cut -d' ' -f2)

# Final Android SDK version with .+ suffix
FINAL_ANDROID_SDK_VERSION="${NEW_ANDROID_SDK}.+"

# Summary of changes
echo -e "${CYAN}${BOLD}📋 Summary of Changes:${NC}"
echo -e "${WHITE}   📦 Package:     ${YELLOW}$CURRENT_PACKAGE${NC} → ${GREEN}$NEW_PACKAGE_VERSION${NC}"
echo -e "${WHITE}   🍎 iOS SDK:     ${YELLOW}$CURRENT_IOS_SDK${NC} → ${GREEN}$NEW_IOS_SDK${NC}"
echo -e "${WHITE}   🤖 Android SDK: ${YELLOW}$CURRENT_ANDROID_SDK${NC} → ${GREEN}$FINAL_ANDROID_SDK_VERSION${NC}"
echo -e "${WHITE}   🤖 versionCode: ${YELLOW}$CURRENT_ANDROID_VERSION_CODE${NC} → ${GREEN}$NEW_ANDROID_VERSION_CODE${NC} ${CYAN}(derived)${NC}"
echo -e "${WHITE}   🤖 versionName: ${YELLOW}$CURRENT_ANDROID_VERSION_NAME${NC} → ${GREEN}$NEW_ANDROID_VERSION_NAME${NC} ${CYAN}(derived)${NC}"
echo ""

# Check if any changes were made
CHANGES_MADE=false
if [ "$CURRENT_PACKAGE" != "$NEW_PACKAGE_VERSION" ]; then CHANGES_MADE=true; fi
if [ "$CURRENT_IOS_SDK" != "$NEW_IOS_SDK" ]; then CHANGES_MADE=true; fi
if [ "$CURRENT_ANDROID_SDK" != "$FINAL_ANDROID_SDK_VERSION" ]; then CHANGES_MADE=true; fi

if [ "$CHANGES_MADE" = false ]; then
    echo -e "${YELLOW}ℹ️  No changes detected. All versions remain the same.${NC}"
    exit 0
fi

# Final confirmation
echo -e "${BOLD}${BLUE}🤔 Do you want to apply these changes?${NC}"
read -p $'\033[1;32m? Proceed with update? (y/N): \033[0m' confirm

if [[ ! "$confirm" =~ ^[yY]$ ]]; then
    echo -e "${YELLOW}❌ Update cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}🔄 Applying updates...${NC}"

# Apply updates
UPDATE_SUCCESS=true

# Update package.json - Package version
if [ "$CURRENT_PACKAGE" != "$NEW_PACKAGE_VERSION" ]; then
    echo -ne "${WHITE}   📝 Updating package.json... ${NC}"
    if sed -i.tmp "s/\"version\": \"$CURRENT_PACKAGE\"/\"version\": \"$NEW_PACKAGE_VERSION\"/" "$PACKAGE_JSON_PATH" 2>/dev/null; then
        rm "$PACKAGE_JSON_PATH.tmp"
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
        UPDATE_SUCCESS=false
    fi
fi

# Update Android build.gradle
echo -ne "${WHITE}   📝 Updating Android build.gradle... ${NC}"
# Update versionCode, versionName, and SDK version
current_android_sdk_escaped=$(printf '%s\n' "$CURRENT_ANDROID_SDK" | sed 's/[[\.*^$()+?{|]/\\&/g')
if sed -i.tmp \
    -e "s/versionCode $CURRENT_ANDROID_VERSION_CODE/versionCode $NEW_ANDROID_VERSION_CODE/" \
    -e "s/versionName \"$CURRENT_ANDROID_VERSION_NAME\"/versionName \"$NEW_ANDROID_VERSION_NAME\"/" \
    -e "s/com\.emarsys:emarsys-sdk:$current_android_sdk_escaped\"/com.emarsys:emarsys-sdk:$FINAL_ANDROID_SDK_VERSION\"/" \
    "$ANDROID_GRADLE_PATH" 2>/dev/null; then
    rm "$ANDROID_GRADLE_PATH.tmp"
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    UPDATE_SUCCESS=false
fi

# Update iOS podspec
if [ "$CURRENT_IOS_SDK" != "$NEW_IOS_SDK" ]; then
    echo -ne "${WHITE}   📝 Updating RNEmarsysWrapper.podspec... ${NC}"
    if sed -i.tmp "s/\"EmarsysSDK\", \"~> $CURRENT_IOS_SDK\"/\"EmarsysSDK\", \"~> $NEW_IOS_SDK\"/" "$IOS_PODSPEC_PATH" 2>/dev/null; then
        rm "$IOS_PODSPEC_PATH.tmp"
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
        UPDATE_SUCCESS=false
    fi
fi

echo ""

if [ "$UPDATE_SUCCESS" = true ]; then
    echo -e "${GREEN}${BOLD}🎉 Version update completed successfully!${NC}"
    echo ""
    
    # Interactive next steps
    echo -e "${CYAN}${BOLD}📝 Next Steps - Let's go through them together:${NC}"
    echo ""
    
    # Step 1: Review changes
    echo -e "${BLUE}${BOLD}📋 Step 1: Review Changes${NC}"
    echo -e "${WHITE}Would you like to see what files were changed?${NC}"
    read -p $'\033[1;32m? Run git diff to review changes? (Y/n): \033[0m' review_confirm
    
    if [[ ! "$review_confirm" =~ ^[nN]$ ]]; then
        echo ""
        echo -e "${CYAN}Running: git diff${NC}"
        (cd "$PROJECT_ROOT" && git diff)
        echo ""
        echo -e "${WHITE}Press any key to continue...${NC}"
        read -n 1 -s
        echo ""
    fi
    
    # Step 2: Commit changes
    echo -e "${BLUE}${BOLD}💾 Step 2: Commit Changes${NC}"
    echo -e "${WHITE}Ready to commit these version updates?${NC}"
    
    # Generate commit message
    COMMIT_MSG="chore: update versions"
    if [ "$CURRENT_IOS_SDK" != "$NEW_IOS_SDK" ]; then
        COMMIT_MSG="$COMMIT_MSG

- iOS SDK: $CURRENT_IOS_SDK → $NEW_IOS_SDK"
    fi
    if [ "$CURRENT_ANDROID_SDK" != "$FINAL_ANDROID_SDK_VERSION" ]; then
        COMMIT_MSG="$COMMIT_MSG

- Android SDK: $CURRENT_ANDROID_SDK → $FINAL_ANDROID_SDK_VERSION"
    fi
    if [ "$CURRENT_PACKAGE" != "$NEW_PACKAGE_VERSION" ]; then
        COMMIT_MSG="$COMMIT_MSG

- Package: $CURRENT_PACKAGE → $NEW_PACKAGE_VERSION"
    fi
    
    echo -e "${WHITE}Commit message will be:${NC}"
    echo -e "${CYAN}\"$COMMIT_MSG\"${NC}"
    echo ""
    
    read -p $'\033[1;32m? Commit these changes? (y/N): \033[0m' commit_confirm
    
    if [[ "$commit_confirm" =~ ^[yY]$ ]]; then
        echo ""
        echo -e "${CYAN}Running: git add .${NC}"
        (cd "$PROJECT_ROOT" && git add .)
        
        echo -e "${CYAN}Running: git commit -m \"$COMMIT_MSG\"${NC}"
        (cd "$PROJECT_ROOT" && git commit -m "$COMMIT_MSG")
        
        echo ""
        echo -e "${GREEN}${BOLD}✅ Changes committed successfully!${NC}"
        echo ""
        echo -e "${CYAN}💡 Don't forget to push your changes:${NC}"
        echo -e "${WHITE}   git push${NC}"
    else
        echo -e "${YELLOW}📝 Changes are ready but not committed.${NC}"
        echo -e "${WHITE}When you're ready, run:${NC}"
        echo -e "${CYAN}   git add .${NC}"
        echo -e "${CYAN}   git commit -m \"$COMMIT_MSG\"${NC}"
    fi
    
else
    echo -e "${RED}${BOLD}❌ Some updates failed. Please check the errors above.${NC}"
    exit 1
fi
