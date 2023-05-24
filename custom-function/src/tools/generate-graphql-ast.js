const fs = require('fs')
const path = require('path')
const devUtilities = require('@skedulo/sdk-dev-utilities')

const rawConfiguration = fs.readFileSync('./src/tools/config.json')
const configuration = JSON.parse(rawConfiguration)
const { source, build, queries } = configuration

const querySrcDirectory = path.join(source, queries)
const queryBuildDirectory = path.join(build, queries)

if (!fs.existsSync(source)){
  console.log('No graphql defined')
} else {
  devUtilities.generateASTForQueries(querySrcDirectory, queryBuildDirectory)
}


