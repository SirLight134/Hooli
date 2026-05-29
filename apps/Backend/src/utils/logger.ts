import pino from 'pino';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const logsDir = path.resolve('logs');

const logLevel = (process.env.LOG_LEVEL || 'debug').toLowerCase();

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: { colorize: true },
      level: logLevel,
    },
    {
      target: 'pino/file',
      options: {
        destination: path.join(logsDir, 'app.log'),
        mkdir: true,
      },
      level: logLevel,
    },
  ],
});

const logger = pino(transport);

export default logger;
