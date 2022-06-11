import { goodbye } from '../services/log.service.js';

const getUserName = (args) => {
  const rest = args.slice(2);

  if (rest[0].startsWith('--username=') && !rest[1]) {
    return rest[0].replace('--username=', '');
  } else {
    throw new Error('The script can be run like: npm run start -- --username=your_username');
  }
};

const exit = (readline, userName) => {
  readline.close();
  goodbye(userName);
}

export { getUserName, exit };
