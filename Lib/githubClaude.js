export default function github(o) {
  // Функция загрузки файла с GitHub
  async function loadFile(path, sha) {
    /*
    Здесь нужно вывести функцию загрузки файла с GitHub,
    все необходимые значения (token и т.д.) в объекте o
    */
    const { owner, repo, token, branch = 'main' } = o;
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = decodeURIComponent(escape(atob(data.content)));
    
    return {
      content,
      sha: data.sha
    };
  }
  
  // Функция записи файла на GitHub
  async function saveFile(path, content, message, sha) {
    /*
    Здесь нужно вывести функцию записи файла на GitHub,
    все необходимые значения (token и т.д.) в объекте o
    */
    const { owner, repo, token, branch = 'main' } = o;
    
    // Если sha не передан, пытаемся получить его
    if (!sha) {
      try {
        const fileData = await loadFile(path);
        sha = fileData.sha;
      } catch (e) {
        // Файл не существует, sha не требуется
      }
    }
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const body = {
      message: message || 'Update file',
      content: btoa(unescape(encodeURIComponent(content))),
      branch
    };
    
    if (sha) {
      body.sha = sha;
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save file: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  // Функция загрузки файлов из path (папки или файла)
  async function getPath(targetPath) {
    const { owner, repo, token, branch = 'main' } = o;
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${targetPath}?ref=${branch}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get path: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Если это массив - значит это папка
    if (Array.isArray(data)) {
      return data.map(item => ({
        name: item.name,
        path: item.path,
        type: item.type,
        size: item.size,
        sha: item.sha,
        url: item.url,
        download_url: item.download_url
      }));
    }
    
    // Если это файл
    return {
      name: data.name,
      path: data.path,
      content: decodeURIComponent(escape(atob(data.content))),
      sha: data.sha,
      size: data.size
    };
  }
  
  // Функция удаления файла на GitHub
  async function deleteFile(path, sha, message) {
    const { owner, repo, token, branch = 'main' } = o;
    
    // Если sha не передан, получаем его
    if (!sha) {
      const fileData = await loadFile(path);
      sha = fileData.sha;
    }
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const body = {
      message: message || 'Delete file',
      sha: sha,
      branch
    };
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  return {
    load: loadFile,
    save: saveFile,
    delete: deleteFile,
    getPath: getPath
  };
}

