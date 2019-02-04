import { join } from 'path';
import { config } from '../../config';
import { copyFile, deleteFile, logger } from '../utils';

export function backupPackageJson(): Promise<boolean> {
  logger.fn(`[S] Backup package.json & package-lock.json`);
  const source1 = join(config.libPath, 'package.json');
  const target1 = join(config.libPath, '_package.json');

  const source2 = join(config.libPath, 'package-lock.json');
  const target2 = join(config.libPath, '_package-lock.json');
  return copyFile(source1, target1)
    .then(() => copyFile(source2, target2))
    .then(() => {
      logger.fn(`[E] Backup package.json & package-lock.json`);
      // return Promise.resolve(true);
    })
    .catch(() => logger.error(`[X] Backup package.json & package-lock.json`));
}

export function restorePackageJson(): Promise<boolean> {
  logger.fn(`[S] Restore package.json & package-lock.json`);
  const source1 = join(config.libPath, '_package.json');
  const target1 = join(config.libPath, 'package.json');

  const source2 = join(config.libPath, '_package-lock.json');
  const target2 = join(config.libPath, 'package-lock.json');

  return copyFile(source1, target1)
    .then(() => deleteFile(source1))
    .then(() => copyFile(source2, target2))
    .then(() => deleteFile(source2))
    .then(() => {
      logger.fn(`[E] Restore package.json & package-lock.json`);
      return Promise.resolve(true);
    })
    .catch(() => logger.error(`[X] Restore package.json & package-lock.json`));
}

export function deleteBackupPackageJson(): Promise<boolean> {
  logger.fn(`[S] Delete backup package.json & package-lock.json`);
  const source1 = join(config.libPath, '_package.json');
  const source2 = join(config.libPath, '_package-lock.json');

  return deleteFile(source1)
    .then(() => deleteFile(source2))
    .then(() => {
      logger.fn(`[E] Delete backup package.json & package-lock.json`);
      return Promise.resolve(true);
    })
    .catch(() => logger.error(`[X] Delete backup package.json & package-lock.json`));
}
