import inquirer from 'inquirer';
import { Clone, Update } from '../commands';

export enum ActionTypes {
  CLONE = 'Create new project',
  UPDATE = 'Update GrandLineX packages',
}

export default function interactive() {
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
        ],
      },
    ])
    .then((answers) => {
      switch (answers.actionSelect) {
        case ActionTypes.CLONE:
          Clone();
          break;
        case ActionTypes.UPDATE:
          Update();
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
