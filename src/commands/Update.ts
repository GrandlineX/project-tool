import BaseCommand from '../utils/command/BaseCommand';

export default async function Update() {
  await BaseCommand.runComand('npx npm-check-updates');
}
