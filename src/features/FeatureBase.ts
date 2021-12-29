export enum Features {
  'OPENAPI',
  'DOCKER',
  'ESLINT',
  'JEST',
  'TYPEDOC',
  'SOURCE',
  'INSTALL',
}
export interface FeatureStep {
  name: string;
  value: Features;
  checked: boolean;
  extra?: any[];
}

export interface FeatureFunc {
  projectName: string;
  projectPath: string;
  scripts: any;
  dependencies: any;
  devDependencies: any;
}

export default abstract class FeatureBase {
  name: string;

  value: Features;

  checked: boolean;

  extra?: any[];

  onComplete?: (input: FeatureFunc, enabled: boolean) => Promise<void>;

  constructor(prop: FeatureStep) {
    this.name = prop.name;
    this.value = prop.value;
    this.checked = prop.checked;
    this.extra = prop.extra;
  }

  abstract handle(input: FeatureFunc, enabled: boolean): Promise<FeatureFunc>;
}
