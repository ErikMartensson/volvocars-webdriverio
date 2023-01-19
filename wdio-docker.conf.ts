import type { Options } from '@wdio/types'
import { config as geckoConfig } from './wdio.conf.js';

// Extend the regular config but overwrite the "services" property and adding
// "dockerOptions".
export const config = {
  ...geckoConfig,
  services: ['docker'],
  dockerOptions: {
    image: 'selenium/standalone-firefox',
    healthCheck: 'http://localhost:4444',
    options: {
      p: ['4444:4444'],
      shmSize: '2g',
    },
  },
} as unknown as Options.Testrunner;
// The "Testrunner" interface doesn't allow for the "dockerOptions" property,
// hence the stupid type casting.
