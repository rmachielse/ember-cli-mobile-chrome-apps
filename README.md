# Ember CLI Mobile Chrome Apps
[![Build Status](https://travis-ci.org/rmachielse/ember-cli-mobile-chrome-apps.svg?branch=master)](https://travis-ci.org/rmachielse/ember-cli-mobile-chrome-apps)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-mobile-chrome-apps.svg)](http://emberobserver.com/addons/ember-cli-mobile-chrome-apps)

**Google has quit active development of [cca](https://github.com/MobileChromeApps/mobile-chrome-apps). Therefor this plugin has been deprecated. Chrome apps can now be generated through [ember-cli-deploy](http://ember-cli.github.io/ember-cli-deploy/) with the [ember-cli-deploy-chrome-app](https://github.com/rmachielse/ember-cli-deploy-chrome-app) package.**

This Ember Addon provides commands to build your project as a chrome or cordova app, using Google's [MobileChromeApps](https://github.com/MobileChromeApps/mobile-chrome-apps)

## Installation

Install the addon by running:

```
npm install ember-cli-mobile-chrome-apps
```

## Usage

Run `ember help` for a detailed list of all commands and arguments.

### Chrome

First generate the chrome app by running:

```
ember g chrome
```

This commands generates a folder `apps` in the root of your project.
Both the chrome and cordova apps will appear in it.
In `apps/chrome` you'll find `background.js` and a default `manifest.json` that you can change according to your needs. For more information about the manifest [see this link](https://developer.chrome.com/apps/first_app).

You can add files and folders from your `dist` to the chrome app by copying or symlinking them in the `apps/chrome` directory.
`window.html` and the `assets` folder have already been added as a default.
This way you can manage which parts of your Ember CLI app will be added to your chrome app.

- `ember chrome:build`
  This command builds the chrome app from the `apps/chrome` folder.
  It will generate a `project_name.zip` and a signed `project_name.crx` file in `apps/chrome/dist`.
  You can specify the location of the key in the `config/mobile-chrome-apps.js` file.
  The command will also build your ember cli project (you can skip this using `--skip-build` or change the build environment using `--environment`).

During development you don't have to build your project all the time, you can just go to `chrome://extensions` with chrome and click 'Load unpacked extension'. Then choose the `apps/chrome` folder and you'll see the app appear in chrome.

### Cordova

If you have a working chrome app you can add cordova by running:

```
ember g cordova
```

This will generate a `manifest.mobile.json` file in `apps/chrome` that contains your app's `packageId` (for example `com.example.ProjectName`). You can update this to your desired packageId.
It will also generate the `apps/cordova` folder that contains the cordova project.

- `ember cordova:checkenv`
  Before being able to use cordova properly you should run this command to verify that you have set up your working environments for Android and iOS correctly.
- `ember cordova:build`
  With this command you can build your cordova project and optionally `--release` it.
- `ember cordova:run`
  The run command can be used to emulate the app or deploy it to a developer device.
  For example `ember cordova:run --android --emulate` will emulate your android app.
  `ember cordova:run --ios --device` will deploy the app to an iOS developer device.
- `ember cordova:upgrade`
  This command can be used to upgrade your cordova project when a new version of google's `cca` is being released.
  You'll also be prompted to do so when you build the app and there is an update.

### Known limitations

- Both chrome and cordova apps seem not yet able to handle pushState. Make sure `locationType` is set to `hash` in your `config/environment.js` file.
- Depending on your configuration, you might need to disable fingerprinting. If you have symlinked `apps/chrome/window.html` to `dist/index.html`, the asset urls in `app/index.html` will be compiled like normal. However, if you have a different window.html, it will not be compiled and thus will not be able to handle fingerprinted assets. In that case you have to disable it in `ember-cli-build.js` by setting `fingerprint` to `{ enabled: false }`.

## License

This project is released under the [MIT License](LICENSE.md).
