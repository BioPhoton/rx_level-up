import util from 'util';
import {exec, getCommitConvention} from '../utils';

// release on git
export function releaseGithub(): Promise<boolean> {

// Make a new GitHub release from git metadata based on your commit-convention. In this case angular convention
// source: https://github.com/conventional-changelog/conventional-github-releaser/blob/master/README.md

  console.info('start github release');
  return getCommitConvention()
    .then((preset) => {

      if (preset === 'angular') {

      } else {
        preset = 'angular';
        console.log('PRESET: ', preset);
      }

      return new Promise((resolve, reject) => {
        exec('conventional-github-releaser -p ' + preset + ' -r 0', (err, responses) => {
          if (err !== undefined) {
            console.log('error in github release', err);
            reject(err);
          } else {
            console.log('released on github');
            resolve(responses);
          }
        });
      });
    });
}
