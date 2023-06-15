import fs from 'fs';
import { build } from 'esbuild';

let entryPoints = []
if (fs.existsSync('./src/index.frontend.ts')) {
  entryPoints.push('src/index.frontend.ts')
}

build({
  entryPoints: entryPoints,
  minify: true,
  outdir: '../dist',
  target: 'es6'
}).catch(() => {
  process.exit(1);
});
