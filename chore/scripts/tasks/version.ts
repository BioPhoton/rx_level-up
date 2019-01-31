import {writeFileSync} from 'fs';
import {gitDescribeSync} from 'git-describe';
import {relative, resolve} from 'path';
import {getPackageVersion, logger} from '../utils';

export function createVersionFileSolo() {
  return getPackageVersion()
    .then(createVersionFile);
}

export function createVersionFile(version: string): Promise<boolean> {
  return new Promise((res, rej) => {
    try {
      const gitInfo = gitDescribeSync({
        dirtyMark: false,
        dirtySemver: false,
        longSemver: true
      });

      const file = resolve('src', 'environments', 'version.ts');
      const content = `
  // IMPORTANT: THIS FILE IS AUTO GENERATED!
  // IMPORTANT: DO NOT MANUALLY EDIT OR CHECK IN!

  export const VERSION = ${JSON.stringify({...gitInfo, version}, null, 4)};
  `;

      writeFileSync(file, content, {encoding: 'utf-8'});

      logger.fn(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
    } catch (e) {
      rej(false);
    }
    res(true);
  });
}
