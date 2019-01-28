// import * as colors from 'colors';
import {refresh, versionBump, changelog,
  createVersionFile, releaseGithub} from './tasks/index';
import {exec} from './utils';
import {refreshVersionFile} from './tasks/version';

console.info('Start release', );

Promise.resolve()
// check status of travis build
  // .then(() => ciCheck())
  // rebase project with git version
  // .then(() => refresh())
  // generate version file
  .then(() => refreshVersionFile())
  // build lib
  .then(() => exec('npm run build'))
  // create changelog based onn new version
  .then(() => changelog())
  // bump version and tag it
  .then(() => versionBump())
  // release on github
  .then(() => releaseGithub())
  // release on npm
  // .then(() => releaseNpm())
  // if any of the above fails catch error and log it
  .catch((err) => console.info('release error', err));

