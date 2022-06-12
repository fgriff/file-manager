import { homedir } from 'os';
import { exit, getUserName } from './helpers/utils.js';
import { greeting, printMessage } from './services/log.service.js';
import { createInterface} from 'readline';
import { chdir, cwd, stdin, stdout } from 'process';
import { readUserDir } from './helpers/ls.js';
import {
  copyFile,
  createNewFile,
  moveFile,
  readUserFile,
  removeFile,
  renameFile,
} from './helpers/files.js';
import { join } from 'path';

const main = () => {
  try {
    const currentWorkDir = cwd();
    const homeUserDir = homedir();
    const userName = getUserName(process.argv);
    greeting(userName);

    const rl = createInterface({
      input: stdin,
      output: stdout,
    });

    rl.on('line', (text) => {
      let [command, ...args] = text.trim().split(' ');
      args = args.filter((arg) => !!arg);

      switch (command) {
        case 'up':
          chdir('..');
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'cd':
          if (args[0]) {
            chdir(args[0]);
            printMessage(`You are currently in ${cwd()}`);
          } else {
            printMessage('Incorrect command. Try again');
          }
          break;

        case 'ls':
          readUserDir(cwd());
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'cat':
          readUserFile(args[0]);
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'add':
          createNewFile(join(cwd(), args[0]));
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'rn':
          renameFile(args[0], args[1]);
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'cp':
          copyFile(args[0], args[1]);
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'mv':
          moveFile(args[0], args[1]).then(() => {
            printMessage(`You are currently in ${cwd()}`);
          });
          break;

        case 'rm':
          removeFile(args[0]);
          printMessage(`You are currently in ${cwd()}`);
          break;

        case '.exit':
          exit(rl, userName);
          break;

        default:
          printMessage('Incorrect command. Try again');
          break;
      }
    });

    rl.on('SIGINT', () => {
      exit(rl, userName);
    });
  } catch (e) {
    printMessage(e.message);
  }
};

main();
