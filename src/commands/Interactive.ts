import inquirer from 'inquirer';
import Update from './Update.js';
import Clone from './Clone.js';

export enum ActionTypes {
  CLONE = 'Create new project',
  UPDATE = 'Update GrandLineX packages',
  UPDATE_ALL = 'Update All packages',
}

export default function Interactive() {
  inquirer
    .prompt([
      {
        name: 'actionSelect',
        type: 'list',
        message: 'What do you want to do',
        choices: [
          {
            name: ActionTypes.CLONE,
            disabled: false,
          },
          {
            name: ActionTypes.UPDATE,
            disabled: false,
          },
          {
            name: ActionTypes.UPDATE_ALL,
            disabled: false,
          },
        ],
      },
    ])
    .then((answers) => {
      switch (answers.actionSelect) {
        case ActionTypes.CLONE:
          Clone();
          break;
        case ActionTypes.UPDATE:
          Update(true);
          break;
        case ActionTypes.UPDATE_ALL:
          Update(true, true);
          break;
        default:
          console.log('Error');
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
    });
}
