import {writeFileSync} from 'fs';
import {gitDescribeSync} from 'git-describe';
import {relative, resolve} from 'path';
import {version} from '../../../package.json';

export function createVersionFile(): Promise<boolean> {
  console.log(`version`, version);
  return new Promise((res, rej) => {
    try {
      const gitInfo = gitDescribeSync({
        dirtyMark: false,
        dirtySemver: false,
        longSemver: true,
        version
      });

      const file = resolve('src', 'environments', 'version.ts');
      const content = `
  // IMPORTANT: THIS FILE IS AUTO GENERATED!
  // IMPORTANT: DO NOT MANUALLY EDIT OR CHECKIN!

  export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
  `;

      writeFileSync(file, content, {encoding: 'utf-8'});

      console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
    } catch (e) {
      rej(false);
    }
    res(true);
  });
}
