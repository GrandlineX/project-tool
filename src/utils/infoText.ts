import { getVersion } from '../commands/Version';

function StartInfo(): void {
  const message: string[] = [];
  message.push(`# GrandLineX Project Tool v${getVersion()} ⚓`);
  message.push('#');
  console.log(message.join('\n'));
}

function HelpText(): void {
  const message: string[] = [];
  message.push('# Options:');
  message.push('#   -i --interactive                 : Start Interactive Mode');
  message.push('#   -u --update                      : Update GLX-Deps');
  message.push(
    '#   -ui --update-install             : Update & install GLX-Deps'
  );
  message.push(
    '#   -t --template=<electron|express> : Create project from template'
  );
  message.push('#   -h --help                        : Print this text ');
  message.push(
    '#   -v --version                     : Print the tool version '
  );
  console.log(message.join('\n'));
}

function InvalidCommand(args?: string[]): void {
  const message: string[] = [];

  if (args) {
    message.push(`# Invalid command option: ${args.join(' ')}`);
  } else {
    message.push('# Invalid Command option');
  }
  console.log(message.join('\n'));

  HelpText();
}

export { StartInfo, HelpText, InvalidCommand };
