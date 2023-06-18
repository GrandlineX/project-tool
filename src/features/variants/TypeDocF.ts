import FeatureBase, { FeatureFunc, Features } from '../FeatureBase.js';

export default class TypeDocF extends FeatureBase {
  constructor() {
    super({
      checked: true,
      name: 'TypeDoc config',
      value: Features.TYPEDOC,
      extra: [],
    });
  }

  async handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc> {
    if (!enabled) {
      const { scripts, devDependencies } = input;

      delete scripts.makeDocs;
      delete devDependencies.typedoc;
      return {
        ...input,
        scripts,
        devDependencies,
      };
    }
    return input;
  }
}
