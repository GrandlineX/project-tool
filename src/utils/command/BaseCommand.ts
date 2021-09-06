import { exec } from 'child_process';

export default class BaseCommand {
  config: null | {
    cwd: string;
  } = null;

  comand: string;

  constructor(command: string, pwd?: string) {
    this.comand = command;
    if (pwd) {
      this.config = {
        cwd: pwd,
      };
    }
  }

  async runCommand(): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(`# Run -> ${this.comand}`);
      try {
        const com = exec(this.comand, this.config, (error, stdout, stderr) => {
          if (error) {
            console.log(error);
            console.log(stderr);
            resolve(false);
          } else {
            resolve(true);
          }
        });
        com.stdout?.pipe(process.stdout);
      } catch (e) {
        console.error(e);
        resolve(false);
      }
    });
  }

  static async runComand(command: string, pwd?: string): Promise<boolean> {
    const com = new BaseCommand(command, pwd);
    return com.runCommand();
  }
}
