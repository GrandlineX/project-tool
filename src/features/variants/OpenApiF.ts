import fs from 'fs';
import Path from 'path';
import FeatureBase, { FeatureFunc, Features } from '../FeatureBase';

export default class OpenApiF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'OpenApi config',
      value: Features.OPENAPI,
      extra: undefined,
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    if (!enabled) {
      const { projectPath, scripts } = input;
      fs.rmSync(Path.join(projectPath, 'glconf.json'));
      delete scripts.makeSpec;
      delete scripts.serveSpec;

      return {
        ...input,
        scripts,
      };
    }
    return input;
  }
}
