import { goodbye } from '../services/log.service.js';
import { stat } from 'fs/promises';

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
};

const isExist = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { getUserName, exit, isExist };
