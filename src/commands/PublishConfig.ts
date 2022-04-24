import Path from 'path';
import fs from 'fs';

export default function PublishConfig(args: string[]) {
  console.log(args);
  console.log(process.cwd());
  const [, host, regName, id] = args;
  const confPath = Path.join(process.cwd(), 'package.json');
  if (fs.existsSync(confPath)) {
    const p = fs.readFileSync(confPath, 'utf-8');
    const ob = JSON.parse(p);
    const conf: any = {};
    conf[`${regName}:registry`] = `${host}/api/v4/projects/${id}/packages/npm/`;
    ob.publishConfig = conf;
    fs.writeFileSync(confPath, JSON.stringify(ob, null, 2));
  } else {
    throw new Error('No package.json found in current folder');
  }
}
