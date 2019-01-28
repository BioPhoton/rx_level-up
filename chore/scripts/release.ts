// import * as colors from 'colors';
import { releaseGithub } from './tasks/release-github';

import {createVersionFile} from './tasks/version';
import {changelog} from './tasks/changelog';
import {refresh} from './tasks/refresh';
import {exec} from './utils';
import {versionBump} from './tasks/version-bump';

console.info('Start release');

return Promise.resolve()
// check status of travis build
  // .then(() => ciCheck())
  // rebase project with git version
  .then(() => refresh())
  // build lib
  .then(() => {
    return exec('npm run build:lib')
      .then((res) => {
        console.info('done packaging');
      });
  })
  // create changelog based onn new version
  .then(() => changelog())
  // bump version and tag it
  .then(() => versionBump())
  // release on github
  .then(() => releaseGithub())
  // release on npm
  // .then(() => releaseNpm())
  // if any of the above fails catch error and log it
  .catch((err) => console.info('release error', err.red));




