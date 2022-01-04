import * as F from '../features/variants';
import CloneBase, { BaseCloneConf } from '../features/CloneBase';

const pkgConf: BaseCloneConf = {
  defaultName: 'grandlinex-project',
  repoName: 'https://github.com/GrandlineX/skeleton-project.git',
  main: 'dist/index.js',
  types: 'dist/index.d.ts',
  description: 'GrandLineX Express-Skeleton Project',
  steps: [
    new F.ESLintF(),
    new F.DockerF(),
    new F.JestF(),
    new F.OpenApiF(),
    new F.TypeDocF(),
    new F.SourceF(),
    new F.InstallF(),
    new F.PipeLineF(),
  ],
};

export default class CloneExpress extends CloneBase {
  constructor() {
    super(pkgConf);
  }
}
