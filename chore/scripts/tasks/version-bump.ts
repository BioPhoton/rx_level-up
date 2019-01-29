import {config} from '../../config';
import {exec, logger} from '../utils';

// create version bump

export function versionBump(bump: string, version: string): Promise<boolean> {
  logger.sp('[S] Version bump');
  return exec('git add .\\package.json .\\package-lock.json', {cwd: config.packagedFolder})
    .then(() => exec('git commit -m "chore(release): ' + version + ' (' + bump + ')"', {cwd: config.__base}))
    .then(() => exec('git tag ' + version), {cwd: config.__base})
    // push the commit
    // --follow-tags also pushes the new tags
    // source: https://git-scm.com/docs/git-push
    .then(() => exec('git push --follow-tags', {cwd: config.__base}))
    .then(() => {
      logger.sp('[E] Version bump');
      return Promise.resolve(true);
    })
    .catch(() => {
      logger.error('[X] Version bump');
    });
}
