/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  resetMocks: true,
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['./src/**/{!(*.stories|index),}.js?(x)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|jpeg|gif|webp|mp4|mp3|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
