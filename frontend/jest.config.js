module.exports = {
	verbose: true,
	globals: {
	  'ts-jest': {
		diagnostics: true,
	  },
	},
	transform: {
	  '^.+\\.(js|ts|tsx)?$': 'ts-jest',
	  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
		'jest-transform-stub',
	  '\\.(yaml)$': 'jest-raw-loader',
	},
	transformIgnorePatterns: ['node_modules/(?!@prekari/core-ui)'],
	moduleNameMapper: {
	  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['./setupTests.ts'],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  };
  