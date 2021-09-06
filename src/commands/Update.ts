import ncu from 'npm-check-updates';
import * as Path from 'path';
import { BaseCommand } from '../utils';

async function checkUpdate(): Promise<any> {
  const upgraded = await ncu.run({
    // Pass any cli option
    packageFile: Path.join(process.cwd(), 'package.json'),
    filter: new RegExp('^@grandline'),
    upgrade: true,
    // Defaults:
    // jsonUpgraded: true,
    // silent: true,
  });

  return upgraded;
}
export default async function Update() {
  console.log('# Update GrandLineX packages');
  const updates = await checkUpdate();
  const keys = Object.keys(updates);
  if (keys.length === 0) {
    console.log('# Anything up to date');
  } else {
    console.log('# The following packages have been updated');
    keys.forEach((key) => {
      console.log(`# ${key} + ${updates[key]}`);
    });

    await BaseCommand.runComand('npm install');
  }
}
