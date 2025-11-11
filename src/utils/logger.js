import chalk from 'chalk';
import { env } from '../config/environment.js';

class Logger {
  info(message, meta = {}) {
    if (env.NODE_ENV !== 'production') {
      console.log(chalk.blue('[INFO]'), message, meta);
    }
  }

  error(message, meta = {}) {
    console.error(chalk.red('[ERROR]'), message, meta);
  }

  debug(message, meta = {}) {
    if (env.NODE_ENV === 'development') {
      console.log(chalk.magenta('[DEBUG]'), message, meta);
    }
  }
}

export const logger = new Logger();
