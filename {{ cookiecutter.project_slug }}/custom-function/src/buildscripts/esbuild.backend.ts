import fs from 'fs';
import { build } from 'esbuild';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';

let entryPoints = ['src/index.backend.ts', 'src/tracing.ts']

build({
  entryPoints: entryPoints.filter(entryPoint => fs.existsSync(entryPoint)),
  bundle: true,
  minify: true,
  outdir: '../dist',
  platform: 'node',
  // preserveSymlinks: true, Use this flag if you use mex-custom-function-lib as a symlink
  target: 'node18',
  plugins: [graphqlLoaderPlugin()],
}).catch(() => {
  process.exit(1);
});
