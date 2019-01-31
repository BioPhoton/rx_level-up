import { createVersionFileSolo } from './tasks/version';
import { logger } from './utils';

createVersionFileSolo().catch(e => logger.error('[X] createVersionFileSolo', e));
