import CloneBase, { BaseCloneConf } from '../features/CloneBase';
import * as F from '../features/variants';

const pkgConf: BaseCloneConf = {
  defaultName: 'grandlinex-electron-project',
  repoName: 'https://github.com/GrandlineX/electron-skeleton-project.git',
  main: 'dist/main.js',
  description: 'GrandLineX Electron-Skeleton Project',
  steps: [
    new F.ESLintF(),
    new F.SourceF(),
    new F.InstallF(),
    new F.PipeLineF(),
  ],
};

export default class CloneElectron extends CloneBase {
  constructor() {
    super(pkgConf);
  }
}
