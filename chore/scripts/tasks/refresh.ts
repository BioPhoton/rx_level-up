import {join} from 'path';
import {config} from '../../config';
import {deleteFile, exec} from '../utils';

export function refresh(hard = false): Promise<boolean> {

  return Promise.resolve(hard)
  // pulls the latest version and rebase
    .then(() => {
      if (hard) {
        return deleteFile(join(config.__base, 'node_modules'))
          .then(() => {
            console.info('start git pull --rebase');
            return exec('git pull --rebase', {cwd: config.__base});
          });
      }
      console.info('start git pull --rebase');
      return exec('git pull --rebase', {cwd: config.__base});
    })
    // installs the node dependencies
    .then(() => {
      console.info('done git pull --rebase');
      console.info('start npm install');
      return Promise.resolve(true);
      // return exec('npm install', {cwd: config.__base});
    })
    .then(() => {
      console.info('end npm install');
      return Promise.resolve(true);
    });

}
