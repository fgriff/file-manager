import { arch, cpus, EOL, userInfo } from 'os';
import { printMessage } from '../services/log.service.js';

const getOsInfo = (arg) => {
  const noPrefixArg = arg.slice(2);

  switch (noPrefixArg) {
    case 'EOL':
      console.log(`EOL: ${JSON.stringify(EOL)}`);
      break;

    case 'cpus':
      const cpusCount = cpus().length;
      const cpusModel = cpus()[0].model;
      const cpusSpeed = (cpus()[0].speed / 1000).toFixed(2);
      const cpusData = `cpusCount: ${cpusCount};${EOL}cpusModel: ${cpusModel};${EOL}cpusSpeed: ${cpusSpeed} GHz;`;
      printMessage(cpusData);
      break;

    case 'homedir':
      printMessage(`Home directory: ${userInfo().homedir}`);
      break;

    case 'username':
      printMessage(`User name: ${userInfo().username}`);
      break;

    case 'architecture':
      printMessage(`Architecture: ${arch()}`);
      break;

    default:
      printMessage('Incorrect command. Try again');
      break;
  }
};

export { getOsInfo };
