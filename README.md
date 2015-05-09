# Ember CLI Mobile Chrome Apps

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

This commands generates a folder `external` in the root of your project.
Both the chrome and cordova apps will appear in it.
In `external/chrome` you'll find `background.js` and a default `manifest.json` that you can change according to your needs. For more information about the manifest [see this link](https://developer.chrome.com/apps/first_app).

You can add files and folders from your `dist` to the chrome app by copying or symlinking them in the `external/chrome` directory.
`window.html` and the `assets` folder have already been added as a default.
This way you can manage which parts of your Ember CLI app will be added to your chrome app.

- `ember chrome:build`
  This command builds the chrome app from the `external/chrome` folder.
  It will generate a `ProjectName.zip` and a signed `ProjectName.crx` file in `external/chrome`.
  You can specify the key using the `--key` argument. If no key exists it will be automatically generated.
  The command will also build your ember cli project (you can skip this using `--skip-build` or change the build environment using `--environment`).

During development you don't have to build your project all the time, you can just go to `chrome://extensions` with chrome and click 'Load unpacked extension'. Then choose the `external/chrome` folder and you'll see the app appear in chrome.

### Cordova

If you have a working chrome app you can add cordova by running:

```
ember g cordova
```

This will generate a `manifest.mobile.json` file in `external/chrome` that contains your app's `packageId` (for example `com.example.ProjectName`). You can update this to your desired packageId.
It will also generate the `external/cordova` folder that contains the cordova project.

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

## License

This project is released under the [MIT license](LICENSE.md).
