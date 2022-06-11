import { createReadStream, createWriteStream } from 'fs';
import { copyFile as cp, rename, rm } from 'fs/promises';
import { dirname, join, sep } from 'path';
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
    printMessage('File already exist');
  };
};

const renameFile = async (oldFilePath, newFileName) => {
  if (await isExist(oldFilePath)) {
    const dirPath = dirname(oldFilePath);
    const newFilePath = join(dirPath, newFileName);

    if (!await isExist(newFilePath)) {
      await rename(oldFilePath, newFilePath);
    } else {
      printMessage(`${newFilePath.split(`${sep}`).pop()} already exist`);
    }
  } else {
    printMessage(`${oldFilePath.split(`${sep}`).pop()} doesn't exist`);
  };
};

const copyFile = async (filePath, dirPath) => {
  if (await isExist(filePath)) {
    if (await isExist(dirPath)) {
      const fileName = filePath.split(`${sep}`).pop();
      const destPath = join(dirPath, fileName);

      await cp(filePath, destPath);
    } else {
      printMessage("Target directory doesn't exist");
    }
  } else {
    printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
  }
};

const removeFile = async (filePath) => {
  if (await isExist(filePath)) {
    await rm(filePath);
  } else {
    printMessage(`${filePath.split(`${sep}`).pop()} doesn't exist`);
  }
}

export { copyFile, createNewFile, readUserFile, removeFile, renameFile };
