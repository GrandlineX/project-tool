#!/usr/bin/env node
/**
 * GrandLineX Cli
 */

import { checkDeps, HelpText, InvalidCommand, StartInfo } from './utils';
import Interactive from './commands/Interactive';
import Version from './commands/Version';
import { checkSelfUpdate } from './commands/Update';

const { argv } = process;

async function main() {
  const args = argv;

  args.shift();
  args.shift();

  const optionLength = args.length;

  StartInfo();

  switch (optionLength) {
    case 1:
      switch (args[0]) {
        case '-i':
        case '--interactive':
          await checkSelfUpdate();
          if (!(await checkDeps())) {
            console.error('# Dependencies not installed');
            return;
          }
          console.log('# All dependencies are installed 🎉');
          Interactive();
          return;
        case '-h':
        case '--help':
          HelpText();
          return;
        case '-v':
        case '--version':
          Version();
          return;
        default:
          break;
      }
      break;
    case 0:
    default:
      break;
  }
  InvalidCommand(args);
}

main();
