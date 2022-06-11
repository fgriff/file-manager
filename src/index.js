import { homedir } from 'os';
import { exit, getUserName } from './helpers/utils.js';
import { greeting, printMessage } from './services/log.service.js';
import { createInterface} from 'readline';
import { cwd, stdin, stdout } from 'process';

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
  
    rl.on('line', (command) => {
      if (command === '.exit') {
        exit(rl, userName);
      }

      switch (command) {
        case value:
          
          break;
      
        default:
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