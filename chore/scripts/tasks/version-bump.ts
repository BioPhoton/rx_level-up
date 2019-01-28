import {exec, getBump, getPackageVersion} from '../utils';
import {config} from '../../config';

import * as colors from 'colors';
colors.enable();

// create version bump
let detectedBump;
let detectedVersion;

export function versionBump() {
  console.info('start versionBump');
  return getBump()
    .then((bump) => {
      detectedBump = bump;
      console.info('detected bump type: ' + detectedBump);
      return Promise.resolve();
    })
    // npm version [detectedBump] bumps the version specified in detectedBump
    // and write the new data back to package.json
    .then(() => exec('npm --no-git-tag-version version ' + detectedBump, {cwd: config.libPath}))
    .then(() => exec('git add .\\package.json', {cwd: config.packagedFolder}))
    .then(() => getPackageVersion())
    .then((version) => {
      detectedVersion = version;
      console.info('detected version: ' + detectedVersion);
      return Promise.resolve();
    })
    .then(() => exec('git commit -m "chore(release): ' + detectedVersion + ' (' + detectedBump + ')"', {cwd: config.__base}))
    .then(() => exec('git tag ' + detectedVersion), {cwd: config.__base})
    // push the commit
    // --follow-tags also pushes the new tags
    // source: https://git-scm.com/docs/git-push
    .then(() => {
      console.info('start git push --follow-tags');
      return exec('git push --follow-tags', {cwd: config.__base})
        .then(() => {
          console.info('pushed repo and created tag');
        });
    });

}
