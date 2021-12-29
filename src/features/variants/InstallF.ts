import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

import BaseCommand from '../../utils/command/BaseCommand';

export default class InstallF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'Install after creating project',
      value: Features.INSTALL,
      extra: [],
    });
    this.onComplete = this.complete;
  }

  async complete(input: FeatureFunc, enabled: boolean): Promise<void> {
    if (enabled) {
      console.log('# Perform  install');
      await BaseCommand.runComand('npm install', input.projectPath);
    }
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    return input;
  }
}
