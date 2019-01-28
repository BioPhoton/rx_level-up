import {join} from 'path';
import {deleteFile} from '../utils';
import {config} from '../../config';

const {promisify} = require('util');

const exec = promisify(require('child_process').exec);


export function refresh(hard) {
  if (hard === true) {
    deleteFile(join(config.__base, 'node_modules'));
  }

  return Promise.resolve()
  // pulls the latest version and rebase
    .then(() => {
      console.info('start git pull --rebase');
      return exec('git pull --rebase', {cwd: config.__base});
    })
    // installs the node dependencies
    .then(() => {
      console.info('done git pull --rebase');
      console.info('start npm install');
      return exec('npm install', {cwd: config.__base});
    })
    .then(() => {
      console.info('end npm install');
    });
}
