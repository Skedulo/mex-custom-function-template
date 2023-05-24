import { build } from 'esbuild';
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader';

build({
  entryPoints: ['src/index.backend.ts', 'src/tracing.ts'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  platform: 'node',
  target: 'node18',
  plugins: [graphqlLoaderPlugin()],
}).catch(() => {
  process.exit(1);
});
