import fs from 'fs'
import path from 'path'
import { generateASTForQueries } from '@skedulo/mex-service-libs/codegen/graphqlAstGeneration'

const rawConfiguration = fs.readFileSync('./src/tools/config.json', 'utf-8')
const configuration = JSON.parse(rawConfiguration)
const { source, build, queries } = configuration

const querySrcDirectory = path.join(source, queries)
const queryBuildDirectory = path.join(build, queries)

if (!fs.existsSync(source)){
  console.log('No graphql defined')
} else {
  generateASTForQueries(querySrcDirectory, queryBuildDirectory)
}
