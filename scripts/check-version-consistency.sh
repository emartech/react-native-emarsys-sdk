#!/bin/bash
# Asserts the package version matches across all authoritative sources.
# Exits 1 with a clear message if they disagree; exits 0 when aligned.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

PKG="$PROJECT_ROOT/package.json"
GRADLE="$PROJECT_ROOT/android/build.gradle"
CHANGELOG="$PROJECT_ROOT/CHANGELOG.md"

for f in "$PKG" "$GRADLE" "$CHANGELOG"; do
  if [ ! -f "$f" ]; then
    echo "ERROR: required file not found: $f" >&2
    exit 1
  fi
done

# package.json inherits into the podspec at build time (RNEmarsysSDK.podspec reads
# package['version']), so package.json is the single iOS source of truth.
VERSION_PKG=$(node -pe "require('$PKG').version")
VERSION_GRADLE=$(grep -oE 'versionName "[^"]*"' "$GRADLE" | sed 's/versionName "\(.*\)"/\1/')
# Allow an optional -beta.N (or similar) prerelease suffix in the CHANGELOG header.
VERSION_CHANGELOG=$(grep -E "^# [0-9]+\.[0-9]+\.[0-9]+" "$CHANGELOG" | head -1 | grep -oE "[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.]+)?")

if [ -z "$VERSION_PKG" ]; then
  echo "ERROR: could not extract version from $PKG" >&2; exit 1
fi
if [ -z "$VERSION_GRADLE" ]; then
  echo "ERROR: could not extract versionName from $GRADLE" >&2; exit 1
fi
if [ -z "$VERSION_CHANGELOG" ]; then
  echo "ERROR: could not extract version from $CHANGELOG" >&2; exit 1
fi

echo "Version sources:"
echo "  package.json  : $VERSION_PKG"
echo "  build.gradle  : $VERSION_GRADLE"
echo "  CHANGELOG.md  : $VERSION_CHANGELOG"

if [ "$VERSION_PKG" != "$VERSION_GRADLE" ] || [ "$VERSION_PKG" != "$VERSION_CHANGELOG" ]; then
  echo "" >&2
  echo "ERROR: version mismatch detected." >&2
  echo "All sources must agree before a release can be tagged." >&2
  echo "Run ./update to update them together, or fix the diverging file manually." >&2
  exit 1
fi

echo ""
echo "OK: all sources agree on version $VERSION_PKG"
