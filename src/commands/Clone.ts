import inquirer from 'inquirer';
import * as Path from 'path';
import * as fs from 'fs';
import BaseCommand from '../utils/command/BaseCommand';

const baseRepo = 'https://github.com/GrandlineX/skeleton-project.git';
enum Features {
  'OPENAPI',
  'DOCKER',
  'ESLINT',
  'JEST',
  'TYPEDOC',
}

export interface CloneAnswer {
  projectName: string;
  features: number[];
}

function hasFeature(answer: CloneAnswer, feature: Features): boolean {
  return answer.features.find((el) => el === feature) !== undefined;
}

async function performeClone(answer: CloneAnswer) {
  const { projectName, features } = answer;

  const projectPath = Path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error('Project folder already exist');
    return;
  }

  await BaseCommand.runComand(`git clone ${baseRepo} ${projectName}`);
  const pack = fs.readFileSync(Path.join(projectPath, 'package.json'), 'utf-8');
  const config = JSON.parse(pack);
  const { scripts, dependencies, devDependencies } = config;

  fs.rmSync(Path.join(projectPath, '.git'), {
    recursive: true,
    force: true,
  });

  await BaseCommand.runComand('git init', projectPath);

  const newConfig = {
    name: projectName,
    version: '0.0.1',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    description: 'GrandLineX Skeleton Project',
    scripts,
    dependencies,
    devDependencies,
  };

  fs.writeFileSync(
    Path.join(projectPath, 'package.json'),
    JSON.stringify(newConfig, null, 2)
  );

  await BaseCommand.runComand('git add .', projectPath);
  await BaseCommand.runComand('git commit -m "init"', projectPath);

  console.log('Create new project was successful');
  await BaseCommand.runComand('npm install', projectPath);
}

export default function Clone() {
  inquirer
    .prompt([
      {
        name: 'projectName',
        type: 'input',
        message: 'Set project name in lower-case',
        default: 'grandlinex-project',
        validate(input: string): boolean | string {
          /**
           * NPM project name RegExp
           */
          const reg = new RegExp(
            /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/
          );
          if (reg.test(input)) {
            return true;
          }
          return `Only lower case letters, '-', '.', '_', '~', and '@' at the beginning are allowed`;
        },
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select your Project setup',
        choices: [
          {
            name: 'OpenApi config',
            value: Features.OPENAPI,
            checked: true,
          },
          {
            name: 'ESLint config',
            value: Features.ESLINT,
            checked: true,
          },
          {
            name: 'Jest config',
            value: Features.JEST,
            checked: true,
          },
          {
            name: 'TypeDoc config',
            value: Features.TYPEDOC,
            checked: true,
          },
          {
            name: 'Docker - Development DB setup',
            value: Features.DOCKER,
            checked: true,
            extra: [],
          },
        ],
      },
    ])
    .then((answers: CloneAnswer) => {
      performeClone(answers);
      // Use user feedback for... whatever!!
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
