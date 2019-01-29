import {changelog, backupPackageJson, createVersionFile, releaseGitHub, versionBump} from './tasks/index';
import {
  exec, getBump, getCommitConvention, getPackageVersion, LOG_LEVELS,
  logger
} from './utils';
import {config} from '../config';
import {restorePackageJson} from './tasks/package-backups';

/*
 logger.error('error');
 logger.debug('debug');
 logger.warn('warn');
 logger.data('data');
 logger.info('info');
 logger.mP('mP');
 logger.silly('silly');
 logger.custom('custom');
 */

logger.mp(`[S] Automated Release`);

const state = {
  preset: '',
  bump: '',
  version: ''
};

backupPackageJson()
  .then(resolvePreconditions)
// check status of travis build
// .then(() => ciCheck())
// rebase project with git version
// .then(() => refresh())
// generate version file
  .then(() => createVersionFile(state.version))
  // build lib
  .then(() => {
    logger.sp(`[S] Build Project`);
    return exec('npm run build')
      .then(() => {
        logger.sp(`[E] Build Project`);
        return Promise.resolve();
      });
  })
  // create changelog based onn new version
  .then(() => changelog(state.preset, state.version))
  // bump version and tag it
  .then(() => versionBump(state.bump, state.version))
  // restore file
  // .then(restorePackageJson)
  // release on github
  .then(() => releaseGitHub(state.preset))
// release on npm
  // .then(() => releaseNpm())
 // if any of the above fails catch error and log it
 .catch((err) => logger.error(`[X] Automated Release`));



function resolvePreconditions() {
  logger.sp(`[S] Resolve preconditions`);
  // ensures that the right convention was detected
  // ensures that a bump type was detected
  return getCommitConvention()
    .then(preset => {
      state.preset = preset;
      return Promise.resolve(preset);
    })
    .then(preset => getBump(preset)
      .then(bump => {
        state.bump = bump;
        return Promise.resolve(bump);
      })
    )
    .then(bump => {
      return exec('npm --no-git-tag-version version ' + bump, {cwd: config.libPath})
        .then(() => {
          getPackageVersion()
            .then(version => {
              state.version = version;
              return Promise.resolve(version);
            });
        });
    })
    .catch(() => logger.error(`[X] Resolve preconditions`));
}
