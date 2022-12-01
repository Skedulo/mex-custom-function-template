# Mex custom function
This template for purpose to give you a common code structure, which should work with other Mex services

# Important note
As this custom function will be bundled into a single file, it means it will copy everything we have in this project to that bundle. That why I recommend that you should not use the external libraries if you do not need them.

# Bundle me

## Install

1. Checkout the project and make change as you want
2. Run `git submodule init` to initialize the submodules
3. Run `git submodule update` to download the source code of submodules/`custom function library`
4. Run `yarn` from the `custom function` project folder, it will install needed dependencies for both library and main custom function project

## Test your application
To run Unit Test, you can

1. Run `yarn test` to test your application
2. Run `yarn test:cov` to see how many percent of code is covered by your Unit Test

## Bundle

1. Run `yarn bundle` to bundle your application, the output file is in the `dist` folder. This step will remove and re-build everything before bundling your application to make sure that everything work as expected. The output of bundling job is the bundled files in the `dist` folder.
2. Test your bundled file locally before uploading it.
