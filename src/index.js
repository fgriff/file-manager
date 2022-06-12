import { exit, getUserName } from './helpers/utils.js';
import { greeting, printMessage } from './services/log.service.js';
import { createInterface} from 'readline';
import { cwd, stdin, stdout } from 'process';
import { nav } from './helpers/nwd.js';
import { fileSystem } from './helpers/files.js';
import { getOsInfo } from './helpers/os.js';
import { getHash } from './helpers/hash.js';
import { compress } from './helpers/compress.js';
import { decompress } from './helpers/decompress.js';

const main = () => {
  try {
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
        case 'cd':
        case 'ls':
          nav.dispatch(command, args[0]);
          break;

        case 'cat':
        case 'add':
        case 'rn':
        case 'cp':
        case 'mv':
        case 'rm':
          fileSystem.dispatch(command, args[0], args[1]);
          break;

        case 'os':
          getOsInfo(args[0]);
          printMessage(`You are currently in ${cwd()}`);
          break;

        case 'hash':
          getHash(args[0]);
          break;

        case 'compress':
          compress(args[0], args[1]);
          break;

        case 'decompress':
          decompress(args[0], args[1]);
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
