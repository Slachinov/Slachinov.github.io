

export default async function getAllTree (o) {
  const { owner, repo, token, branch = 'main' } = o;


  const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    headers: { 'Authorization': `token ${token}` }
  });
  if (!refRes.ok) throw new Error(`Failed to get branch SHA: ${refRes.statusText}`);
  const refData = await refRes.json();
  const commitSha = refData.object.sha;


  const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${commitSha}`, {
    headers: { 'Authorization': `token ${token}` }
  });
  if (!commitRes.ok) throw new Error(`Failed to get commit tree SHA: ${commitRes.statusText}`);
  const commitData = await commitRes.json();
  const treeSha = commitData.tree.sha;


  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`, {
    headers: { 'Authorization': `token ${token}` }
  });
  if (!treeRes.ok) throw new Error(`Failed to get tree: ${treeRes.statusText}`);
  const treeData = await treeRes.json();


  return treeData.tree;
};
//===

