import { homedir } from 'os';
import { exit, getUserName } from './helpers/utils.js';
import { greeting, printMessage } from './services/log.service.js';
import { createInterface} from 'readline';
import { chdir, cwd, stdin, stdout } from 'process';
import { readUserDir } from './helpers/ls.js';
import { createNewFile, readUserFile } from './helpers/files.js';
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
      if (text === '.exit') {
        exit(rl, userName);
      }

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
