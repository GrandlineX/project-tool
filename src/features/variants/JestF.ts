import fs from 'fs';
import Path from 'path';
import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

export default class JestF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'Jest config',
      value: Features.JEST,
      extra: undefined,
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    if (!enabled) {
      const { projectPath, scripts, devDependencies } = input;
      fs.rmSync(Path.join(projectPath, 'jest.config.js'));

      fs.rmSync(Path.join(projectPath, 'tests'), {
        recursive: true,
        force: true,
      });

      delete scripts.test;
      delete scripts['start-dev'];
      delete scripts['test-coverage'];

      delete devDependencies['eslint-plugin-jest'];
      delete devDependencies['jest-junit'];
      delete devDependencies['ts-jest'];

      delete devDependencies.jest;
      delete devDependencies['@types/jest'];
      return {
        ...input,
        scripts,
        devDependencies,
      };
    }
    return input;
  }
}
