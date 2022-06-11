const greeting = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${process.cwd()}`);
};

const goodbye = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}!`);
};

const printMessage = (message) => {
  console.log(message);
};

export { greeting, goodbye, printMessage };
