import { readdir } from 'fs/promises';

const readUserDir = async (dirPath) => {
  const result = await readdir(dirPath);

  result.forEach((item) => {
    console.log(item)
  });
};

export { readUserDir };
