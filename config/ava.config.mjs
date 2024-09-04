export default {
  extensions: {ts: 'module'},
  nodeArguments: [
    '--import=tsimp'
  ],
  environmentVariables: {TSIMP_PROJECT: './config/tsconfig.json'},
  require: [''],
  files: [
    './test/**/*'
  ]
};
