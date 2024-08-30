import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  moduleNameMapper: { '@/(.*)': '<rootDir>/src/$1' },
}

export default config
