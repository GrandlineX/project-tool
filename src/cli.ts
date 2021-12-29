#!/usr/bin/env node
/**
 * GrandLineX Cli
 */

import { checkDeps, HelpText, InvalidCommand, StartInfo } from './utils';
import Interactive from './commands/Interactive';
import Version from './commands/Version';
import Update, { checkSelfUpdate } from './commands/Update';
import CloneElectron from './commands/CloneElectron';
import CloneExpress from './commands/CloneExpress';

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
        case '-u':
        case '--update':
          await Update();
          return;
        case '-t=electron':
        case '--template=electron':
          await new CloneElectron().templateClone();
          return;
        case '-t=express':
        case '--template=express':
          await new CloneExpress().templateClone();
          return;
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
