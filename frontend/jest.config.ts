import type {Config} from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './src/',
})

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
  }
};

export default createJestConfig(config);
