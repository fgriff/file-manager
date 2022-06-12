import { createReadStream, createWriteStream } from 'fs';
import { copyFile as cp, rename, rm } from 'fs/promises';
import { dirname, join, sep } from 'path';
import { printMessage } from '../services/log.service.js';
import { isExist } from './utils.js';
import { cwd } from 'process';

const fileSystem = {
  async cat(filePath) {
    if (await isExist(filePath)) {
      const rs = new createReadStream(filePath, { encoding: 'utf8' });
      rs.on('data', (chunk) => console.log(chunk));
      rs.on('error', () => console.log('Operation failed'));
    } else {
      printMessage("File doesn't exist");
    };
  },

  async add(filePath) {
    const fullPath = join(cwd(), filePath);

    if (!await isExist(fullPath)) {
      const ws = new createWriteStream(fullPath);
      ws.write('');
      ws.on('error', () => console.log('Operation failed'));
      ws.end();
    } else {
      printMessage('File already exist');
    };
  },

  async rn(filePath, destPath) {
    if (await isExist(filePath)) {
      const dirPath = dirname(filePath);
      const newFilePath = join(dirPath, destPath);
  
      if (!await isExist(newFilePath)) {
        await rename(filePath, newFilePath);
      } else {
        printMessage(`${newFilePath.split(`${sep}`).pop()} already exist`);
      }
    } else {
      printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
    };
  },

  async cp(filePath, destPath) {
    if (await isExist(filePath)) {
      if (await isExist(destPath)) {
        const fileName = filePath.split(`${sep}`).pop();
        const fullDestPath = join(destPath, fileName);
  
        if (!await isExist(fullDestPath)) {
          await cp(filePath, fullDestPath);

          return 1;
        } else {
          printMessage("This file already exist");
        }
      } else {
        printMessage("Target directory doesn't exist");
      }
    } else {
      printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
    }
  },

  async mv(filePath, destPath) {
    if (await this.cp(filePath, destPath)) {
      await this.rm(filePath);
    };
  },

  async rm(filePath) {
    if (await isExist(filePath)) {
      await rm(filePath);
    } else {
      printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
    }
  },

  async dispatch(command, filePath, destPath) {
    await this[command](filePath, destPath);
    printMessage(`You are currently in ${cwd()}`);
  }
}

export { fileSystem };
