import fs from 'fs';
import { build } from 'esbuild';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';

let entryPoints = []
if (fs.existsSync('src/index.backend.ts')) {
  entryPoints.push('src/index.backend.ts')
}
if (fs.existsSync('src/tracing.ts')) {
  entryPoints.push('src/tracing.ts')
}

build({
  entryPoints: entryPoints,
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
