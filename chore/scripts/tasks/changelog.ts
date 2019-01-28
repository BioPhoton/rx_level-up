import {ChildProcess} from 'child_process';

import {join} from 'path';
import {config} from '../../config';
import {
  backupPackageJson,
  copyFile,
  exec,
  getBump,
  getCommitConvention,
  restorePackageJson
} from '../utils';

import * as colors from 'colors';
colors.enable();

let detectedPreset;
let detectedBump;
let detectedVersion;

export function changelog(): Promise<ChildProcess> {
// create changelog
  console.info(`Start generating changelog`.info);

// # Backup the libs/.../package.json file
// we copy it to have the initial state saved.
// we bump the version update the changelog
// after doing this we use the real package.json and do another version bump
// there to have change log and version bump in separate commits
  return backupPackageJson()
  // ensures that the right convention was detected
    .then(() => getCommitConvention())
    .then((preset) => {
      detectedPreset = preset;
      return (detectedPreset === config.validPreset) ?
        Promise.resolve(detectedPreset) : Promise.reject('invalid preset: ' + detectedPreset);
    })
    // ensures that a bump type was detected
    .then(getBump)
    .then(
      (bump) => {
        detectedBump = bump;
        return (detectedBump) ? Promise.resolve(detectedBump) : Promise.reject(detectedBump);
      })
    // npm version [detectedBump] bumps the version specified in detectedBump
    // and writes the new data back to package.json
    // If you run npm version in a git repo, it will also create a version commit and tag.
    // This behavior is disabled by --no-git-tag-version
    // the var detectedBump specifies the segment of the version code to bump
    .then((bump) => {
      console.info(`bump version for ${detectedBump} without git`.data);
      return exec('npm --no-git-tag-version version ' + detectedBump, {cwd: config.libPath});
    })
    // conventional-changelog creates a chagnelog markdown from commits
    // -i Read the CHANGELOG from this file
    // CHANGELOG.md it the name of the file to read from
    // -s Outputting to the infile so you don't need to specify the same file as outfile
    // -p Name of the preset you want to use. In this case it is angular that is stored in $preset
    .then(() => exec('conventional-changelog -i CHANGELOG.md -s -p -r 0 ' + detectedPreset, {cwd: config.libPath}))
    // add CHANGELOG.md to the commit
    .then(() => exec('git add CHANGELOG.md', {cwd: config.libPath}))
    // get the version number of package.json
    .then(() => {
      const packageJson = require(join(config.libPath, 'package.json'));
      detectedVersion = packageJson.version;
    })
    // copy package.json into dist because we want to have the new version in the dist folder also
    .then(() => copyFile(join(config.libPath, 'package.json'), join(config.libPath, 'package.json')))
    // Replace the already bumped package.json with the _package.json initial copy
    .then(() => restorePackageJson())
    // commit with comment
    .then(() => exec(`git commit -m"docs(CHANGELOG): ${detectedVersion}"`, {cwd: config.libPath}));
}
