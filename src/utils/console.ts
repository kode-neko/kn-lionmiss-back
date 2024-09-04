import {Console} from 'node:console';
import {stdout, stderr} from 'node:process';
const console = new Console({
  stdout,
  stderr
});

export default console;
