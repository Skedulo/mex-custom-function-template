# {{ cookiecutter.project_name }} Mex Custom Function
Mobile extension custom function for {{ cookiecutter.project_name }}

# Important note
As this custom function will be bundled into a single file, it means it will copy everything we have in this project to that bundle. That why I recommend that you should not use the external libraries if you do not need them.

# Bundle project

## Install

Run `yarn install --frozen-lockfile` from the `custom function` project folder, it will install needed dependencies for both library and main custom function project

## Test your application
To run Unit Test, you can

1. Run `yarn test` to test your application
2. Run `yarn test:cov` to see Unit test coverage

## Bundle

1. Run `yarn bundle` to bundle your application, the output file is in the `dist` folder. This step will remove and re-build everything before bundling your application to make sure that everything work as expected. The output of bundling job is the bundled files in the `dist` folder.

2. Test your bundled file locally before uploading it.

**IMPORTANT NOTE**: please do not change existing `scripts` in the `package.json` file, it will impact the integration process.
