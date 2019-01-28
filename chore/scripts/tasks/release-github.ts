import {exec, getCommitConvention} from '../utils';

import * as colors from 'colors';
colors.enable();

// release on git
export function releaseGithub(): Promise<boolean> {

// Make a new GitHub release from git metadata based on your commit-convention. In this case angular convention
// source: https://github.com/conventional-changelog/conventional-github-releaser/blob/master/README.md

  console.info('Start github release'.info);
  return getCommitConvention()
    .then((preset) => {
      console.info(`detected commit convention: ${preset}`.data);
      return new Promise((resolve, reject) => {
        exec('conventional-github-releaser -p ' + preset, (err, responses) => {
          if (err !== null) {
            console.log(`error in github release ${err}`error);
            reject(err);
          } else {
            console.log('released on github'.success);
            resolve(responses);
          }
        });
      });
    });
}
