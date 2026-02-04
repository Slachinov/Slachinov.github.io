export default function github(o) {
  const cfg = { branch: 'master', ...o };


  async function loadFile(path) {
    const { owner, repo, token, branch } = cfg;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return { content: atob(data.content), sha: data.sha };
  }


  async function saveFile(path, content, message) {
    const { owner, repo, token, branch } = cfg;
    let sha;
    try { sha = (await loadFile(path)).sha; } catch {}
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const body = { message: message || 'Update', content: btoa(content), branch };
    if (sha) body.sha = sha;
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!putRes.ok) throw new Error(await putRes.text());
    return await putRes.json();
  }


  async function getPath(targetPath) {
    const { owner, repo, token, branch } = cfg;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${branch}`;
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' } });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    if (Array.isArray(data)) return data.map(item => ({ name: item.name, path: item.path, type: item.type, size: item.size, sha: item.sha, url: item.url, download_url: item.download_url }));
    return { name: data.name, path: data.path, content: atob(data.content), sha: data.sha, size: data.size };
  }


  return { loadFile, saveFile, getPath };
}