export default async function getTree(o, folder = "") {


  const {
    owner,
    repo,
    token,
    branch = "main"
  } = o;






  async function request(url) {


    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json"
      }
    });






    if (!response.ok) {


      let message = response.statusText;


      try {


        const err = await response.json();


        if (err.message) {
          message = err.message;
        }


      } catch {}






      throw new Error(message);


    }






    return response.json();


  }






  try {


    // Получаем tree sha branch
    const branchData = await request(
      `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`
    );






    const treeSha = branchData.commit.commit.tree.sha;






    // Получаем всё дерево
    const treeData = await request(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`
    );






    // Проверка truncated
    if (treeData.truncated) {


      qq.er("GitHub tree truncated");


    }






    let tree = treeData.tree;






    // Фильтр по папке
    if (folder) {


      const prefix = folder.endsWith("/")
        ? folder
        : folder + "/";






      tree = tree.filter(
        item => item.path.startsWith(prefix)
      );


    }






    // Нормализация
    return tree.map(item => ({


      path: item.path,


      name: item.path.split("/").pop(),


      type: item.type,


      sha: item.sha,


      size: item.size || 0,


      url: item.url


    }));


  } catch (err) {


    qq.er(`getTree error: ${err.message}`);


    throw err;


  }


}