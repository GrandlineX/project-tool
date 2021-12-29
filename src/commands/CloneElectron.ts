import CloneBase, { BaseCloneConf } from '../features/CloneBase';
import * as F from '../features/variants';

const pkgConf: BaseCloneConf = {
  defaultName: 'grandlinex-project',
  repoName: 'https://github.com/GrandlineX/skeleton-project.git',
  main: 'dist/main.js',
  description: 'GrandLineX Electron-Skeleton Project',
  steps: [new F.ESLintF(), new F.SourceF(), new F.InstallF()],
};

export default class CloneElectron extends CloneBase {
  constructor() {
    super(pkgConf);
  }
}
