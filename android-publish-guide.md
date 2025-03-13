
# Publishing Your Resume Builder App to Google Play Store

This guide outlines the steps to publish your Resume Builder app to the Google Play Store.

## Prerequisites

- Google Play Developer account ($25 one-time fee)
- Final production build of your app
- App icons and screenshots
- Privacy policy 

## Steps to Publish

### 1. Prepare Your Environment

Make sure you have the following installed:
- Node.js and npm
- Android Studio
- JDK 11+

### 2. Build Your App for Production

```bash
# Build the web app
npm run build

# Sync with Android platform
npx cap sync android
```

### 3. Open in Android Studio

```bash
npx cap open android
```

### 4. Configure App in Android Studio

1. Update app icon in `android/app/src/main/res/`
2. Update app name in `strings.xml`
3. Configure settings in `AndroidManifest.xml`

### 5. Create Signed APK/Bundle

1. In Android Studio, go to Build > Generate Signed Bundle/APK
2. Create a new keystore or use an existing one
3. Fill in the required information
4. Select Android App Bundle (recommended by Google)
5. Choose release build variant
6. Complete the signing process

**IMPORTANT: Keep your keystore file and passwords safe. If lost, you cannot update your app in the future.**

### 6. Test Your Build

Install the signed APK on a test device before uploading to confirm everything works.

### 7. Google Play Console Setup

1. Log in to Google Play Console
2. Create a new app
3. Fill in app details (name, description, category)
4. Upload app screenshots and graphics
5. Add content rating by completing the questionnaire
6. Set up pricing and distribution
7. Upload your privacy policy URL

### 8. Upload Your App

1. Go to the "App releases" section
2. Choose a release track (internal, closed testing, open testing, or production)
3. Upload your signed AAB/APK file
4. Add release notes
5. Review and roll out the release

### 9. Wait for Review

Google will review your app, which may take several hours to days.

## App Updates

For future updates:
1. Make changes to your code
2. Update version in `android/app/build.gradle`
3. Build and sync again
4. Generate a new signed AAB/APK with the SAME keystore
5. Upload to the Google Play Console as a new version

Remember that all updates must use the same signing key as the original submission.
