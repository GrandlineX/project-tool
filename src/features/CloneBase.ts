import inquirer from 'inquirer';
import Path from 'path';
import fs from 'fs';
import FeatureBase, { Features } from './FeatureBase';
import BaseCommand from '../utils/command/BaseCommand';

export interface CloneAnswer {
  projectName: string;
  features: number[];
}

export interface BaseCloneConf {
  repoName: string;
  steps: FeatureBase[];
  defaultName: string;
  main: string;
  types?: string;
  description: string;
}

export default class CloneBase {
  baseRepo: string;

  defaultName: string;

  steps: FeatureBase[];

  protected main: string;

  protected types?: string;

  protected description: string;

  constructor(conf: BaseCloneConf) {
    this.baseRepo = conf.repoName;
    this.steps = conf.steps;
    this.defaultName = conf.defaultName;

    this.main = conf.main;
    this.types = conf.types;
    this.description = conf.description;
  }

  private async performeClone(answer: CloneAnswer): Promise<void> {
    const { projectName } = answer;
    const projectPath = Path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.error('Project folder already exist');
      return;
    }

    await BaseCommand.runComand(`git clone ${this.baseRepo} ${projectName}`);
    const pack = fs.readFileSync(
      Path.join(projectPath, 'package.json'),
      'utf-8'
    );
    const config = JSON.parse(pack);
    let { scripts, dependencies, devDependencies } = config;

    for (const feature of this.steps) {
      const ret = await feature.handle(
        {
          dependencies,
          devDependencies,
          projectName,
          projectPath,
          scripts,
        },
        CloneBase.hasFeature(answer, feature.value)
      );
      scripts = ret.scripts;
      dependencies = ret.dependencies;
      devDependencies = ret.devDependencies;
    }

    fs.rmSync(Path.join(projectPath, '.git'), {
      recursive: true,
      force: true,
    });

    await BaseCommand.runComand('git init', projectPath);

    const newConfig = {
      name: projectName,
      version: '0.0.1',
      main: this.main,
      types: this.types,
      description: this.description,
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

    console.log('# Create new project was successful');
    for (const feature of this.steps) {
      await feature.onComplete?.(
        {
          dependencies,
          devDependencies,
          projectName,
          projectPath,
          scripts,
        },
        CloneBase.hasFeature(answer, feature.value)
      );
    }
  }

  async runConfig(): Promise<void> {
    return new Promise((resolve) => {
      inquirer
        .prompt([
          {
            name: 'projectName',
            type: 'input',
            message: 'Set project name in lower-case',
            default: this.defaultName,
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
            choices: this.steps,
          },
        ])
        .then((answers: CloneAnswer) => {
          this.performeClone(answers);
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
    });
  }

  static hasFeature(answer: CloneAnswer, feature: Features): boolean {
    return answer.features.find((el) => el === feature) !== undefined;
  }
}
