import {ChildProcess} from 'child_process';

import {join} from 'path';
import {config} from '../../config';
import {
  copyFile,
  exec,
  getBump,
 getPackageVersion, logger
} from '../utils';

export function changelog(preset: string, version: string): Promise<ChildProcess> {
// create changelog
  logger.sp(`[S] Generate changelog`);

    // conventional-changelog creates a chagnelog markdown from commits
    // -i Read the CHANGELOG from this file
    // CHANGELOG.md it the name of the file to read from
    // -s Outputting to the infile so you don't need to specify the same file as outfile
    // -p Name of the preset you want to use. In this case it is angular that is stored in $preset
    return exec(`conventional-changelog -i CHANGELOG.md -s -p ${preset}`, {cwd: config.libPath})
    // Add CHANGELOG.md to the commit
    .then(() => exec('git add CHANGELOG.md', {cwd: config.libPath}))
    // Copy package.json into dist because we want to have the new version in the dist folder also
    .then(() => copyFile(join(config.libPath, 'package.json'), join(config.libPath, 'package.json')))
    // Commit with comment
    .then(() => exec(`git commit -m"docs(CHANGELOG): ${version}"`, {cwd: config.libPath}))
    .then(() => {
      logger.sp(`[E] Generate changelog`);
      return Promise.resolve();
    });
}
