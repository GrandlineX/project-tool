import BaseCommand from '../command/BaseCommand';

async function checkGit(): Promise<boolean> {
  return BaseCommand.runComand('git --version');
}
export default async function checkDeps(): Promise<boolean> {
  return checkGit();
}
