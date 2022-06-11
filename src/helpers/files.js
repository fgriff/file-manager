import { createReadStream } from 'fs';
import { printMessage } from '../services/log.service.js';
import { isExist } from './utils.js';

const readUserFile = async (filePath) => {
  if (await isExist(filePath)) {
    const rs = new createReadStream(filePath, { encoding: 'utf8' });
    rs.on('data', (chunk) => console.log(chunk));
    rs.on('error', () => console.log('Operation failed'));
  } else {
    printMessage("File doesn't exist");
  };
};

export { readUserFile };
