#!/usr/bin/env node
/**
 * GrandLineX Cli
 */

import { checkDeps, HelpText, InvalidCommand, StartInfo } from './utils';
import { Interactive } from './lib';

const { argv } = process;

async function main() {
  const args = argv;

  args.shift();
  args.shift();

  const optionLength = args.length;

  StartInfo();
  if (!(await checkDeps())) {
    console.error('# Dependencies not installed');
    return;
  }
  console.log('# All dependencies are installed 🎉');

  switch (optionLength) {
    case 1:
      switch (args[0]) {
        case '-i':
          Interactive();
          return;
        case '-h':
          HelpText();
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
