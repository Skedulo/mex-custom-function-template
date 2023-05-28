import { build } from 'esbuild';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';

build({
  entryPoints: ['src/index.backend.ts', 'src/tracing.ts'],
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
