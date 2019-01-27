import util from 'util';
import { config } from '../config';

export const exec = util.promisify(require('child_process').exec);

export function getCommitConvention() {
  // Detect what commit message convention your repository is using
  // source: https://github.com/conventional-changelog/conventional-commits-detector/blob/master/README.md
  return exec('conventional-commits-detector', {cwd: config.__base})
    .then((presetRes) => {
      if (!presetRes.stdout || presetRes.stderr) {
        return Promise.reject(presetRes.stderr || false);
      } else {
        const commitConvention = presetRes.stdout.split('\n')[0];
        return Promise.resolve(commitConvention);
      }
    });
}
