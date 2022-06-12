import { isExist } from './utils.js';
import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { extname, join, sep } from 'path';
import { pipeline } from 'stream/promises';
import { printMessage } from '../services/log.service.js';

const compress  = async (initFilePath, destDirPath) => {
  if (await isExist(initFilePath)) {
    if (await isExist(destDirPath)) {
      const fullFileName = initFilePath.split(`${sep}`).pop();
      const fileExt = extname(fullFileName);
      const targetFileName = fullFileName.replace(fileExt, '');
      const targetFilePath = join(destDirPath, `${targetFileName}${fileExt}.br`);

      try {
        const rs = createReadStream(initFilePath);
        const ws = createWriteStream(targetFilePath, { flags: 'wx' });
        const brotli = createBrotliCompress();

        await pipeline(rs, brotli, ws);
      } catch (e) {
        printMessage('Operation failed');
      }
    } else {
      printMessage("Target directory doesn't exist");
    }
  } else {
    printMessage(`${initFilePath.split(`${sep}`).pop()} doesn't exist`);
  }
};

export { compress };