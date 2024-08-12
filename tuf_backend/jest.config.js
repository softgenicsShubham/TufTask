require('@babel/register');

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Add this line to transform ES modules
  },
};
