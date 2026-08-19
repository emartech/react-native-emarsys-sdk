import { ExpoConfig } from 'expo/config';
import { withEmarsysProjectBuildGradle } from '../../../src/expo/android/withEmarsysProjectBuildGradle';

// Mock the expo/config-plugins module
jest.mock('expo/config-plugins', () => ({
  withProjectBuildGradle: jest.fn((config, modifyFunction) => {
    return modifyFunction(config);
  }),
}));

// Type for config with modResults
type ConfigWithModResults = ExpoConfig & {
  modResults: {
    contents: string;
  };
};

describe('withEmarsysProjectBuildGradle', () => {
  let mockConfig: ExpoConfig;

  beforeEach(() => {
    mockConfig = {
      name: 'test-app',
      slug: 'test-app',
    };
    jest.clearAllMocks();
  });

  describe('withEmarsysProjectBuildGradle', () => {
    it('should add Google Services classpath when not present', () => {
      const mockBuildGradleContent = `
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
    }
}`;

      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: mockBuildGradleContent
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      expect(result.modResults.contents).toContain("classpath('com.google.gms:google-services:4.4.4')");
      expect(result.modResults.contents).toMatch(
        /dependencies\s*{\s*classpath\('com\.google\.gms:google-services:4\.4\.4'\)/
      );
    });

    it('should not duplicate Google Services classpath when already present', () => {
      const mockBuildGradleContent = `
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
        classpath('com.google.gms:google-services:4.4.4')
    }
}`;

      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: mockBuildGradleContent
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      // Count occurrences of the Google Services classpath
      const matches = result.modResults.contents.match(/classpath\(['"]com\.google\.gms:google-services:4\.4\.4['"]\)/g);
      expect(matches).toHaveLength(1);
    });

    it('should handle buildscript with nested blocks', () => {
      const mockBuildGradleContent = `
buildscript {
    ext {
        buildToolsVersion = "33.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.0'
    }
}`;

      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: mockBuildGradleContent
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      expect(result.modResults.contents).toContain("classpath('com.google.gms:google-services:4.4.4')");
      // Verify it's added inside the dependencies block
      expect(result.modResults.contents).toMatch(
        /dependencies\s*{[\s\S]*?classpath\('com\.google\.gms:google-services:4\.4\.4'\)/
      );
    });

    it('should handle empty dependencies block', () => {
      const mockBuildGradleContent = `
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
    }
}`;

      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: mockBuildGradleContent
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      expect(result.modResults.contents).toContain("classpath('com.google.gms:google-services:4.4.4')");
    });

    it('should preserve existing content and formatting', () => {
      const mockBuildGradleContent = `
// Top of file comment
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
        // Some comment
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.0'
    }
}

// Some other configuration
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}`;

      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: mockBuildGradleContent
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      // Should preserve comments and other content
      expect(result.modResults.contents).toContain('// Top of file comment');
      expect(result.modResults.contents).toContain('// Some comment');
      expect(result.modResults.contents).toContain('allprojects {');
      expect(result.modResults.contents).toContain("classpath('com.google.gms:google-services:4.4.4')");
    });

    it('should add -Xskip-metadata-version-check allprojects hook when not present', () => {
      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: `
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
    }
}`
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      expect(result.modResults.contents).toContain('-Xskip-metadata-version-check');
      expect(result.modResults.contents).toContain('plugins.withId("org.jetbrains.kotlin.android")');
    });

    it('should not duplicate -Xskip-metadata-version-check when already present', () => {
      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: `
buildscript {
    dependencies {}
}
subprojects {
  plugins.withId("org.jetbrains.kotlin.android") {
    extensions.configure(org.jetbrains.kotlin.gradle.dsl.KotlinAndroidProjectExtension) {
      it.compilerOptions.freeCompilerArgs.add("-Xskip-metadata-version-check")
    }
  }
}`
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      const matches = result.modResults.contents.match(/-Xskip-metadata-version-check/g);
      expect(matches).toHaveLength(1);
    });

    it('should return the same config object', () => {
      const configWithBuildGradle: ConfigWithModResults = {
        ...mockConfig,
        modResults: {
          contents: `
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.0'
    }
}`
        }
      };

      const result = withEmarsysProjectBuildGradle(configWithBuildGradle) as ConfigWithModResults;

      expect(result.name).toBe(mockConfig.name);
      expect(result.slug).toBe(mockConfig.slug);
      expect(result).toHaveProperty('modResults');
    });
  });
});
