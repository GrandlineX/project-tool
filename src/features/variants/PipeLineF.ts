import fs from 'fs';
import Path from 'path';
import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

export default class PipeLineF extends FeatureBase {
  constructor() {
    super({
      checked: false,
      name: 'Pipeline config (not required)',
      value: Features.PIPELINE,
      extra: [],
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    if (!enabled) {
      const { projectPath } = input;
      fs.rmSync(Path.join(projectPath, '.gitlab-ci.yml'));
    }
    return input;
  }
}
