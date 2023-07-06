#!/usr/bin/env node
/**
 * GrandLineX Cli
 */

import {
  checkDeps,
  HelpText,
  InvalidCommand,
  StartInfo,
} from './utils/index.js';
import Interactive from './commands/Interactive.js';
import Version from './commands/Version.js';
import Update, { checkSelfUpdate } from './commands/Update.js';
import CloneElectron from './commands/CloneElectron.js';
import CloneExpress from './commands/CloneExpress.js';
import MergeRequest from './commands/MergeRequest.js';
import PublishConfig from './commands/PublishConfig.js';

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
        case '-ui':
        case '--update-install':
          await Update(true);
          return;
        case '-fu':
        case '--full-update':
          await Update();
          return;
        case '-fui':
        case '--full-update-install':
          await Update(true);
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
    case 4:
      if (args[0] === '-pc' || args[0] === '--publish-config') {
        PublishConfig(args);
        return;
      }
      break;
    case 9:
      if (args[0] === '-mr') {
        await MergeRequest(args);
        return;
      }
      break;
    case 0:
    default:
      break;
  }
  InvalidCommand(args);
}

main();
