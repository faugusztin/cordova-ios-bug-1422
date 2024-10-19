This project reproduces the issue reported at https://github.com/apache/cordova-ios/issues/1422 .

Steps to reproduce:

1) Prepare
- install npm dependencies
  ```
  npm i
  ```
- prepare two plugins, one without (testplugin-svgkit) and with (testplugin) elevated deployment target requirement (higher than the cordova-ios default 11.0):
  ```
  npm run plugins
  ```
- optionally add logging patch to Podfile.js, which prints out the contents of Podfile any time we write it to disk
  ```
  npm run add-patch
  ```
  We can revert it by running:
  ```
  npm run remove-patch
  ```

2) Attempt with pod depenency, which doesn't require elevated deployment target to install the pod:
- remove platforms/plugins folder if it exists
  ```
  npm run clean
  ```
- copy package-testplugin-svgkit.json to package.json (only difference is what plugin is mentioned in cordova->plugins section)
  ```
  cp package-testplugin-svgkit.json package.json
  ```
- prepare cordova project with package.json already containing the ios platform and plugin dependency, while the platforms folder doesn't exist
  ```
  npm run cordova-prepare
  ```
- we end up with successfully prepared project, see [prepare-testplugin-svgkit.txt](./prepare-testplugin-svgkit.txt), but even there we can see that up until the final write of Podfile it contains 11.0 instead of 15.0

3) Attempt with pod depenency, which does require elevated deployment target to install the pod:
- remove platforms/plugins folder if it exists
  ```
  npm run clean
  ```
- copy package-testplugin.json to package.json (only difference is what plugin is mentioned in cordova->plugins section)
  ```
  cp package-testplugin.json package.json
  ```
- prepare cordova project with package.json already containing the ios platform and plugin dependency, while the platforms folder doesn't exist
  ```
  npm run cordova-prepare
  ```
- prepare fails, as the `pod install --verbose` command ran at plugin install step fails due Podfile specifying iOS 11.0, while the pod requires 15.0. Log of such failed build is in [prepare-testplugin-svgkit.txt](./prepare-testplugin.txt).