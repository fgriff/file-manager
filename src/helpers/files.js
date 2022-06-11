import { createReadStream, createWriteStream } from 'fs';
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

const createNewFile = async (filePath) => {
  if (!await isExist(filePath)) {
    const ws = new createWriteStream(filePath);
    ws.write('');
    ws.on('error', () => console.log('Operation failed'));
    ws.end();
  } else {
    printMessage("File already exist");
  };
};

export { createNewFile, readUserFile };
