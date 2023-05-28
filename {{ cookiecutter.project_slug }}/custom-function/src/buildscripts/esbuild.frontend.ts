import { build } from 'esbuild';

build({
  entryPoints: ['src/index.frontend.ts'],
  minify: true,
  outdir: '../dist',
  target: 'es6'
}).catch(() => {
  process.exit(1);
});
