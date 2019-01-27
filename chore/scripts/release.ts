// import * as colors from 'colors';
import { releaseGithub } from './tasks/release-github';

import {createVersionFile} from './tasks/version';
import {changelog} from './tasks/changelog';

console.info('Start release');


  Promise.resolve()
  // release on github
    .then(() => changelog())
    //.then(() => createVersionFile())
    //.then(() => releaseGithub());
  // if any of the above fails catch error and log it
  // .catch((err) => console.info('release error', err));
  /**/



