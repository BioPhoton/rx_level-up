import {createReadStream, createWriteStream, existsSync, mkdirSync} from 'fs';
import {dirname, join} from 'path';
import util from 'util';
import {addColors, createLogger, format, transports} from 'winston';
import {config} from '../config';

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

export const exec = util.promisify(require('child_process').exec);

export function deleteFile(source): Promise<boolean> {
  return exec('rimraf ' + source, {cwd: config.__base})
    .catch((err) => {
      logger.error(`Remove files error: ${err}`);
    });
}

export function copyFile(source, target, cb = null): Promise<boolean | string> {
  return new Promise((resolve, reject) => {

    const getDirname = dirname;

    function ensureDirectoryExistence(filePath) {
      const tf = getDirname(filePath);
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

export function getCommitConvention(base = config.__base): Promise<string> {
  logger.fn(`[S] Detect commit convention`);
  // Detect what commit message convention your repository is using
  // source: https://github.com/conventional-changelog/conventional-commits-detector/blob/master/README.md
  return exec('conventional-commits-detector', {cwd: base})
    .then((presetRes) => {
      if (!presetRes.stdout || presetRes.stderr) {
        logger.error(`[X] Detect commit convention`);
        return Promise.reject(presetRes.stderr || false);
      } else {
        const commitConvention = presetRes.stdout.split('\n')[0];
        logger.fn(`[E] Detect commit convention`);
        return Promise.resolve(commitConvention);
      }
    });
}

export function getBump(preset = 'angular'): Promise<string> {
  logger.fn(`[S] Detect recommended bump`);
  return Promise.resolve()
    .then(() => {
      // Detect the recommended bump type by the conventional-commit standard
      // source: https://github.com/conventional-changelog-archived-repos/conventional-recommended-bump/blob/master/README.md
      return exec(`conventional-recommended-bump -p ${preset}`, {cwd: config.__base})
        .then((bumpRes) => {
          if (!bumpRes.stdout || bumpRes.stderr) {
            logger.error(`[X] Detect recommended bump`);
            return Promise.reject(bumpRes.stderr || false);
          } else {
            const bump = bumpRes.stdout.split('\n')[0];
            logger.fn(`[E] Detect recommended bump`);
            return Promise.resolve(bump);
          }
        })
        .catch((e) => {
          logger.error(`[X] Detect recommended bump catch`);
        });
    });
}

export function getPackageVersion(): Promise<string> {
  const packageJson = require(join(config.packagedFolder, 'package.json'));
  logger.fn(`New version: ${packageJson.version}`);
  return Promise.resolve(packageJson.version);
}

//
// Logging levels
//
const loggerConfig = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    mp: 5,
    sp: 6,
    fn: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    mp: 'green',
    sp: 'cyan',
    fn: 'grey'
  }
};

addColors(loggerConfig.colors);

export const logger: {
  error: () => void,
  debug: () => void,
  warn: () => void,
  data: () => void,
  info: () => void,
  mp: () => void,
  sp: () => void,
  fn: () => void
} | any = createLogger({
  level: 'sp',
  levels: loggerConfig.levels,
  transports: [
    // - Write all logs error (and below) to `error.log`.
    new transports.File({filename: 'CI-error.log', level: 'data'}),
    // - Write to all logs with level `info` and below to `combined.log`
    new transports.File({filename: 'CI-combined.log'})
  ]
} as any);

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      format.json()
    )
  }) as any);
}
