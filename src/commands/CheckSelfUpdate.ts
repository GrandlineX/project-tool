import inquirer from 'inquirer';
import { BaseCommand } from '../utils/index.js';

export enum ActionTypes {
  Update = 'Update now :) ',
  SKIP = 'Skip update',
}

export default async function CheckSelfUpdate(pack: string, version: string) {
  return new Promise((resolve) => {
    inquirer
      .prompt([
        {
          name: 'actionSelect',
          type: 'list',
          message: 'Select project type',
          choices: [
            {
              name: ActionTypes.Update,
              disabled: false,
            },
            {
              name: ActionTypes.SKIP,
              disabled: false,
            },
          ],
        },
      ])
      .then((answers) => {
        switch (answers.actionSelect) {
          case ActionTypes.SKIP:
            resolve(true);
            break;
          case ActionTypes.Update:
            BaseCommand.runComand(`npm i -g ${pack}@${version}`)
              .then(() => {
                console.log('Update successful');
                resolve(true);
                process.exit(0);
              })
              .catch(() => {
                resolve(false);
              });
            return;
          default:
            console.log('Error');
            resolve(false);
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log('unsupported shell');
        } else {
          // Something else went wrong
          console.log(error);
        }
        resolve(false);
      });
  });
}
