import { isExist } from './utils.js';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { printMessage } from '../services/log.service.js';
import { cwd } from 'process';

const getHash = async (filePath) => {
  if (await isExist(filePath)) {
    const hash = createHash('sha256');

    const rs = createReadStream(filePath, { encoding: 'utf8' });
    rs.on('data', (chunk) => hash.update(chunk));
    rs.on('end', () => {
      printMessage(hash.digest('hex'));
      printMessage(`You are currently in ${cwd()}`)
    });
    rs.on('error', () => printMessage('Operation failed'));
  } else {
    printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
  }
};

export { getHash };