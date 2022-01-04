import { run } from 'npm-check-updates';
import * as Path from 'path';
import { Index } from 'npm-check-updates/build/src/types';
import { BaseCommand } from '../utils';
import CheckSelfUpdate from './CheckSelfUpdate';
import PrintLog from '../utils/PrintLog';

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

export default async function Update(install: boolean): Promise<string[]> {
  const cons = new PrintLog();
  cons.log('### Update GrandLineX packages');
  const updates = await checkUpdate();
  const keys = Object.keys(updates);
  if (keys.length === 0) {
    cons.log('> Anything up to date');
    return [];
  }
  cons.log('#### The following packages have been updated:');
  cons.log('----');
  keys.forEach((key) => {
    cons.log(`- ${key} + ${updates[key]}`);
  });

  if (install) {
    await BaseCommand.runComand('npm install');
  }
  return cons.getArr();
}
