import inquirer from 'inquirer';
import CloneExpress from './CloneExpress';
import CloneBase from '../features/CloneBase';
import CloneElectron from './CloneElectron';

export enum ActionTypes {
  EXPRESS = 'Create Express project',
  ELECTRON = 'Create Electron project',
}

export default function Clone() {
  inquirer
    .prompt([
      {
        name: 'actionSelect',
        type: 'list',
        message: 'Select project type',
        choices: [
          {
            name: ActionTypes.EXPRESS,
            disabled: false,
          },
          {
            name: ActionTypes.ELECTRON,
            disabled: false,
          },
        ],
      },
    ])
    .then((answers) => {
      let rund: CloneBase | null = null;
      switch (answers.actionSelect) {
        case ActionTypes.EXPRESS:
          rund = new CloneExpress();
          break;
        case ActionTypes.ELECTRON:
          rund = new CloneElectron();
          break;
        default:
          console.log('Error');
      }
      rund?.runConfig();
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
