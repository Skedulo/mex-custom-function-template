import fs from 'fs';
import { build } from 'esbuild';

let entryPoints = ['src/index.frontend.ts']

build({
  entryPoints: entryPoints.filter(entryPoint => fs.existsSync(entryPoint)),
  minify: true,
  outdir: '../dist',
  target: 'es6'
}).catch(() => {
  process.exit(1);
});
