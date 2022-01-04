import axios from 'axios';
import fs from 'fs';

export default async function MergeRequest(args: string[]) {
  console.log('Create MergeRequest');
  const [
    ,
    url,
    templatePath,
    token,
    title,
    projectId,
    source_branch,
    target_branch,
    assignee,
  ] = args;

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found ${templatePath}`);
  }

  const template = fs.readFileSync(templatePath, { encoding: 'utf8' });

  try {
    await axios.post<any>(
      url,
      {
        id: parseInt(projectId, 10),
        source_branch,
        target_branch,
        title,
        description: template,
        assignee_id: parseInt(assignee, 10),
        remove_source_branch: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Succsess');
  } catch (e) {
    console.error('Error in request: ');
    console.error(e);
    process.exit(2);
  }
}
