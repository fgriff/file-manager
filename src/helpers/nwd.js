import { readdir } from 'fs/promises';
import { chdir, cwd } from 'process';
import { printMessage } from '../services/log.service.js';

const nav = {
  up() {
    chdir('..');
  },

  cd(arg) {
    try {
      chdir(arg);
    } catch (e) {
      printMessage("This path doesn't exist");
    }
  },

  async ls() {
    const result = await readdir(cwd());
  
    result.forEach((item) => {
      console.log(item)
    });
  },

  async dispatch(command, arg) {
    await this[command](arg);
    printMessage(`You are currently in ${cwd()}`);
  }
};

export { nav };
