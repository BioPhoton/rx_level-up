import {writeFileSync} from 'fs';
import {gitDescribeSync} from 'git-describe';
import {relative, resolve, join} from 'path';
// import {version as packaeVersion} from '../../../package.json';
import {
  backupPackageJson, exec, getBump, getCommitConvention,
  restorePackageJson
} from '../utils';
import {config} from '../../config';

import * as colors from 'colors';
colors.enable();

export function refreshVersionFile(): Promise<boolean> {
  return backupPackageJson()
  // ensures that the right convention was detected
    .then(() => getCommitConvention())
    .then((preset) => {
      return (preset === config.validPreset) ?
        Promise.resolve(preset) : Promise.reject('invalid preset: '.red + preset.red);
    })
    // ensures that a bump type was detected
    .then(getBump)
    .then(
      (bump) => {
        return (bump) ? Promise.resolve(bump) : Promise.reject('invalide pump: ' +bump);
      })
    // npm version [detectedBump] bumps the version specified in detectedBump
    // and writes the new data back to package.json
    // If you run npm version in a git repo, it will also create a version commit and tag.
    // This behavior is disabled by --no-git-tag-version
    // the var detectedBump specifies the segment of the version code to bump
    .then((bump) => {
      console.info('bump version without git '.gray, bump.gray);
      return exec('npm --no-git-tag-version version ' + bump, {cwd: config.libPath});
    })
    // get the version number of package.json
    .then(() => {
      const packageJson = require(join(config.libPath, 'package.json'));
      const detectedVersion = packageJson.version;
      console.log('new version '.gray, detectedVersion.gray);
      return Promise.resolve(detectedVersion);
    })
    .then(createVersionFile)
    // Replace the already bumped package.json with the _package.json initial copy
    .then(() => {
      return restorePackageJson().then(() => {
        console.info('restored package files'.green);
      });
    });
}


export function createVersionFile(version: string): Promise<boolean> {
  console.log(`version`, version);
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
  // IMPORTANT: DO NOT MANUALLY EDIT OR CHECKIN!

  export const VERSION = ${JSON.stringify({...gitInfo, version}, null, 4)};
  `;

      writeFileSync(file, content, {encoding: 'utf-8'});

      console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`.green);
    } catch (e) {
      rej(false);
    }
    res(true);
  });
}
