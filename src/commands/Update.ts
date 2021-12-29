import { run } from 'npm-check-updates';
import * as Path from 'path';
import { Index } from 'npm-check-updates/build/src/types';
import { BaseCommand } from '../utils';
import CheckSelfUpdate from './CheckSelfUpdate';

async function checkUpdate(): Promise<any> {
  return run({
    // Pass any cli option
    packageFile: Path.join(process.cwd(), 'package.json'),
    filter: /^@grandline/,
    upgrade: true,
    // Defaults:
    // jsonUpgraded: true,
    // silent: true,
  });
}

export async function checkSelfUpdate(): Promise<boolean> {
  console.log('Looking for new version...');
  const res = (await run({
    global: true,
    filter: /^@grandlinex\/project-tool/,
  })) as Index<string>;
  if (res['@grandlinex/project-tool']) {
    console.log('found update');
    await CheckSelfUpdate(
      '@grandlinex/project-tool',
      res['@grandlinex/project-tool']
    );
    return true;
  }
  return false;
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
