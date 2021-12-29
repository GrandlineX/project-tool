import fs from 'fs';
import Path from 'path';
import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

export default class ESLintF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'ESLint config',
      value: Features.ESLINT,
      extra: undefined,
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    if (!enabled) {
      const { projectPath, devDependencies, scripts } = input;
      fs.rmSync(Path.join(projectPath, '.eslintignore'));
      fs.rmSync(Path.join(projectPath, '.eslintrc'));
      delete scripts.lint;
      delete devDependencies.eslint;
      delete devDependencies['@typescript-eslint/eslint-plugin'];
      delete devDependencies['@typescript-eslint/parser'];
      delete devDependencies['eslint-config-airbnb'];
      delete devDependencies['eslint-config-airbnb-typescript'];
      delete devDependencies['eslint-config-prettier'];
      delete devDependencies['eslint-plugin-import'];
      delete devDependencies['eslint-plugin-jest'];
      delete devDependencies['eslint-plugin-jsx-a11y'];
      delete devDependencies['eslint-plugin-prettier'];
      delete devDependencies['eslint-plugin-react'];
      delete devDependencies['eslint-plugin-react-hooks'];

      return {
        ...input,
        devDependencies,
        scripts,
      };
    }
    return input;
  }
}
