# {{ cookiecutter.project_name }} Mex Custom Function
Mobile extension custom function for {{ cookiecutter.project_name }}

# Important note
As this custom function will be bundled into a single file, it means it will copy everything we have in this project to that bundle. That why I recommend that you should not use the external libraries if you do not need them.

# Bundle me

## Local development
1. If you want to develop graphql query, set the following environment variables

    ```
        export SKED_BASE_URL=${Skedulo API URL}
        export SKED_API_TOKEN=${Token to access Skedulo API}
    ```

2. Start service locally by running `yarn dev`. You can customize the port number by setting `PORT` environment variables

## Test your application
To run Unit Test, you can

1. Run `yarn test` to test your application
2. Run `yarn test:cov` to see how many percent of code is covered by your Unit Test

## Bundle

1. Run `yarn bundle` to bundle your application, the output file is in the `dist` folder. This step will remove and re-build everything before bundling your application to make sure that everything work as expected. The output of bundling job is the bundled files in the `dist` folder.

2. Test your bundled file locally before uploading it.

**IMPORTANT NOTE**: please do not change existing `scripts` in the `package.json` file, it will impact the integration process.
