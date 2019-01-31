import { writeFileSync } from 'fs';
import { relative, resolve } from 'path';
import { exec, getPackageVersion, logger } from '../utils';

export function createVersionFileSolo() {
  return getPackageVersion().then(createVersionFile);
}

export function createVersionFile(version: string): Promise<boolean> {
  return new Promise((res, rej) => {
    return exec('git rev-parse --abbrev-ref HEAD').then(result => {
      if (result.stderr) {
        rej(result.stderr);
      }
      const branchName = result.stdout.replace('\n', '');

      try {
        const file = resolve('src', 'environments', 'version.ts');
        const content = `
  // IMPORTANT: THIS FILE IS AUTO GENERATED!
  // IMPORTANT: DO NOT MANUALLY EDIT OR CHECK IN!

  export const VERSION = ${JSON.stringify({ branchName, version }, null, 4)};
  `;

        writeFileSync(file, content, { encoding: 'utf-8' });

        logger.fn(`Wrote version info ${version} to ${relative(resolve(__dirname, '..'), file)}`);
      } catch (e) {
        rej(false);
      }
      res(true);
    });
  });
}
