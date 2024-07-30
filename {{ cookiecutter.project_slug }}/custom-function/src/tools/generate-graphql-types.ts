import { readFileSync, existsSync, mkdirSync, readdirSync, renameSync } from 'fs'
import path from 'path'
import { generateTypesForGraphQLSchema } from '@skedulo/mex-service-libs/codegen/graphqlTypeGeneration'

const rawConfiguration = readFileSync('./src/tools/config.json', 'utf-8')
const configuration = JSON.parse(rawConfiguration)
const { source, generated, queries } = configuration

const generatedFilesPath = path.join(source, generated)
const queryInputPath = path.join(source, queries, '**/*.graphql')
const schemaDeclarationOutputPath = path.join(source, generated, 'generated.d.ts')

if (!existsSync(source)){
  console.log('No graphql defined')
} else {
  if (!existsSync(generatedFilesPath)) {
    mkdirSync(generatedFilesPath, { recursive: true })
  }
  
  generateTypesForGraphQLSchema({
    authentication: {
      baseUrl: process.env.SKED_BASE_URL || 'localhost',
      apiToken: process.env.SKED_API_TOKEN || ''
    },
    queryInputPath,
    schemaDeclarationOutputPath
  }).then(() => {
    // Rename source declaration files to standard declaration files.
    // This will ensure that tpyescript will pick them up and transpile them
    // alongside the rest of the project.
    const sourceGeneratePath = path.join(source, generated)
    const files = readdirSync(sourceGeneratePath);
  
    files
      .filter((file: string) => file.match('\.d\.ts$'))
      .forEach((file: string) => {
        const filePath = path.join(sourceGeneratePath, file)
        const newFilePath = path.join(sourceGeneratePath, file.replace('.d.ts', '.ts'))
  
        renameSync(filePath, newFilePath)
      })
  })
}
