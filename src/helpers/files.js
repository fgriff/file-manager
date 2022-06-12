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
    try {
      const dirPath = dirname(filePath);
      const newFilePath = join(dirPath, destPath);
      await rename(filePath, newFilePath);
    } catch (e) {
      printMessage('Operation failed');
    }
  },

  async cp(filePath, destPath) {
    try {
      const fileName = filePath.split(`${sep}`).pop();
      const fullDestPath = join(destPath, fileName);
      await cp(filePath, fullDestPath);
    } catch (e) {
      printMessage('Operation failed');
    }
  },

  async mv(filePath, destPath) {
    const pathFrom = dirname(filePath);
    const pathTo = destPath[destPath.length - 1] === `${sep}` ? destPath.substr(0, destPath.length - 1) : destPath;
    const condition = (pathFrom === pathTo) && await isExist(filePath);

    if (!condition) {
      try {
        await this.cp(filePath, destPath);
        await this.rm(filePath);
      } catch (e) {}
    } else {
      printMessage('You are trying to move the file to the same location');
    }
  },

  async rm(filePath) {
    try {
      await rm(filePath);
    } catch (e) {
      printMessage('Operation failed');
    }
  },

  async dispatch(command, filePath, destPath) {
    await this[command](filePath, destPath);
    printMessage(`You are currently in ${cwd()}`);
  }
};

export { fileSystem };
