import {createReadStream, createWriteStream, existsSync, mkdirSync} from 'fs';
import {dirname, join} from 'path';
import util from 'util';
import {config} from '../config';

export const exec = util.promisify(require('child_process').exec);

export function deleteFile(source) {
  console.info('start deleting ', source);
  return exec('rimraf ' + source, {cwd: config.__base})
    .then(() => {
      console.info('remove files done');
    })
    .catch((err) => {
      console.error('remove files error: ', err);
    });
}

export function copyFile(source, target, cb = () => {}): Promise<boolean | string> {
  return new Promise((resolve, reject) => {

    const getDirname = dirname;
    console.info('copyFile', source, target);
    function ensureDirectoryExistence(filePath) {
      const tf  = getDirname(filePath);
      console.log(getDirname(tf));
      if (existsSync(tf)) {
        return true;
      }

      mkdirSync(tf);
      ensureDirectoryExistence(tf);
    }

    const rd = createReadStream(source);
    rd.on('error', (err) => {
      reject(err);
    });

    ensureDirectoryExistence(target);

    const wr = createWriteStream(target);

    wr.on('error', (err) => {
      reject(err);
    });
    wr.on('close', (ex) => {
      resolve(true);
    });
    rd.pipe(wr);

  });
}
/*
 export function copyFilePromise(source, target) {
 return new Promise((accept, reject) => {
 copyFile(source, target, (data) => {
 if (data === undefined) {
 accept();
 } else {
 reject(data);
 }
 });
 });
 }
 */
/*
 export function copyMultiFilePromise (srcTgtPairArr) {
 let copyFilePromiseArr = new Array()
 srcTgtPairArr.forEach((srcTgtPair) {
 copyFilePromiseArr.push(copyFilePromise(srcTgtPair[0], srcTgtPair[1]))
 })
 return Promise.all(copyFilePromiseArr)
 }
 */
export function backupPackageJson() {
  const source1 = join(config.libPath, 'package.json');
  const target1 = join(config.libPath, '_package.json');

  const source2 = join(config.libPath, 'package-lock.json');
  const target2 = join(config.libPath, '_package-lock.json');
  return copyFile(source1, target1);
}

export function restorePackageJson() {
  const source1 = join(config.libPath, '_package.json');
  const target1 = join(config.libPath, 'package.json');

  const source2 = join(config.libPath, '_package-lock.json');
  const target2 = join(config.libPath, 'package-lock.json');

  return copyFile(source1, target1)
    .then(() => deleteFile(source1));
  // .then(() => copyFile(source2, target2))
  // .then(() => utils.deleteFile(source2))
}

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

export function getBump() {
  return getCommitConvention()
    .then((preset) => {
      // Detect the recommended bump type by the conventional-commit standard
      // source: https://github.com/conventional-changelog-archived-repos/conventional-recommended-bump/blob/master/README.md
      return exec('conventional-recommended-bump -p ' + preset, {cwd: config.__base})
        .then((bumpRes) => {

          if (!bumpRes.stdout || bumpRes.stderr) {
            return Promise.reject(bumpRes.stderr || false);
          } else {
            const bump = bumpRes.stdout.split('\n')[0];
            return Promise.resolve(bump);
          }
        })
        .catch(console.log);
    });
}
/*
 export function getPackageVersion () {
 const packageJson = require(join(config.packagedFolder, 'package.json'))
 return Promise.resolve(packageJson.version);
 }
 */
