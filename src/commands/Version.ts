import Path from 'path';
import * as fs from 'fs';

export function getVersion(): string {
  const file = fs.readFileSync(
    Path.join(__dirname, '..', '..', 'package.json'),
    {
      encoding: 'utf8',
    }
  );
  const json = JSON.parse(file);
  return json.version || '0.0.0';
}
export default function Version(): void {
  console.log(`Version: ${getVersion()}`);
}
