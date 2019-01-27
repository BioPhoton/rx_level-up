import path from 'path';

const __base = __dirname + '/../';

export const config = {
  libPath: path.join(__base, './'),
  packagedFolder: path.join(__base, '@packaged', 'rx_level-up'),
  debugMode: true,
  validPreset: 'angular',
  ci: {validState: 'passed\r\n'},
  __base,
  validPreset: 'angular'
};

