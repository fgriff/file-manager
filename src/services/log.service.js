const printMessage = (message) => {
  console.log(message);
};

const greeting = (userName) => {
  printMessage(`Welcome to the File Manager, ${userName}!`);
  printMessage(`You are currently in ${process.cwd()}`);
};

const goodbye = (userName) => {
  printMessage(`Thank you for using File Manager, ${userName}!`);
};

export { greeting, goodbye, printMessage };
