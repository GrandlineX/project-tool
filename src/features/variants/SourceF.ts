import * as fs from 'fs';
import Path from 'path';
import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

export default class SourceF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'Example - Skeleton classes',
      value: Features.SOURCE,
      extra: [],
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    const { projectPath } = input;
    if (!enabled) {
      fs.rmSync(Path.join(projectPath, 'src'), {
        recursive: true,
        force: true,
      });
      fs.mkdirSync(Path.join(projectPath, 'src'));
    }

    return input;
  }
}
