import { exec, logger } from '../utils';

// release on git
export function releaseGitHub(preset: string): Promise<boolean> {
  // Make a new GitHub release from git metadata based on your commit-convention. In this case angular convention
  // source: https://github.com/conventional-changelog/conventional-github-releaser/blob/master/README.md

  logger.sp('[S] GitHub release');
  return new Promise((resolve, reject) => {
    exec('conventional-github-releaser -p ' + preset, (err, responses) => {
      if (err !== null) {
        logger.error('[X] Github release');
        reject(err);
      } else {
        logger.sp('[E] Github release');
        resolve(responses);
      }
    });
  });
}
