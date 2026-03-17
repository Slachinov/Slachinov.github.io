export default async function GhPanel(par = {}) {
    const edit = par.edit;
    const all = par.all;
    const parent = par.parent;


    let o = {
        token: qq.ls('token'),
        branch: 'master',
        owner: 'slachinov',
        repo: 'slachinov.github.io'
    };


    async function loadFile(path) {
        const { owner, repo, token, branch } = o;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
        const response = await fetch(url, {
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!response.ok) throw new Error(`Failed to load file: ${response.statusText}`);
        const data = await response.json();
        return { content: decodeURIComponent(escape(atob(data.content))), sha: data.sha };
    }


    async function saveFile(path, content, sha) {
        const { owner, repo, token, branch } = o;
        if (!sha) {
            try { sha = (await loadFile(path)).sha; } catch (e) {}
        }
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const body = { message: 'Update file', content: btoa(unescape(encodeURIComponent(content))), branch };
        if (sha) body.sha = sha;
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`Failed to save file: ${res.statusText}`);
    }


    async function deleteFile(path, sha) {
        const { owner, repo, token, branch } = o;
        if (!sha) sha = (await loadFile(path)).sha;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const body = { message: 'Delete file', sha, branch };
        const res = await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`Failed to delete file: ${res.statusText}`);
    }


    const skin = { style: { fontSize: '18px', margin: '3px' } };
    let mysk = qq.cs(skin, par.skinbutt || {});


    const container = qq.ce({
        tag: 'div',
        parent,
        style: { background: '#f9f9f9', border: '1px solid #ccc', padding: '6px', borderRadius: '6px', display: 'inline-block' }
    });


    qq.ce({
        tag: 'span',
        parent: container,
        it: 'Gh',
        style: { color: 'darkblue', background: 'orange', fontSize: '16px' }
    });


    let pathInput;
    const clButton = qq.ce({
        tag: 'button',
        it: 'CL',
        parent: container,
        style: {
            fontSize: '18px',
            margin: '6px',
            padding: '4px 10px',
            background: '#eee',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        event: {
            click() {
                pathInput.value = '';
                all.clear();
                all.hide();
            }
        }
    });


    pathInput = qq.ce({
        tag: 'input',
        parent: container,
        style: { width: '180px', marginLeft: '6px', marginRight: '6px' },
        attr: { type: 'text', placeholder: 'Введите path' }
    }, mysk);


    qq.ce({
        tag: 'button',
        parent: container,
        it: 'Load',
        event: {
            click: async () => {
                const path = pathInput.value.trim();
                if (!path) return;
                try { edit.innerText = (await loadFile(path)).content; }
                catch (e) { qq.cl('Ошибка: ' + e.message); }
            }
        }
    }, mysk);


    qq.ce({
        tag: 'button',
        parent: container,
        it: 'All',
        event: {
            click: async () => {
                all.clear();
                all.hide();
                try {
                    const { default: getAllTree } = await import('https://slachinov.github.io/Lib/github/getall.js');
                    const tree = await getAllTree({ owner: o.owner, repo: o.repo, token: o.token, branch: o.branch });
                    all.clear();
                    all.show();
                    tree.forEach(item => {
                        qq.ce({
                            tag: 'div',
                            parent: all,
                            it: item.path,
                            style: { border: '1px solid #aaa', padding: '2px', margin: '2px', cursor: 'pointer', borderRadius: '3px', background: '#fff','font-size':'24px' },
                            event: {
                                click: async () => {
                                    pathInput.value = item.path;
                                    edit.innerText = (await loadFile(item.path)).content;
                                    all.clear();
                                    all.hide();
                                }
                            }
                        });
                    });
                } catch (e) { qq.cl('Ошибка: ' + e.message); }
            }
        }
    }, mysk);


    const writeButton = qq.ce({
        tag: 'button',
        it: 'Write',
        parent: container,
        style: { background: 'red', color: 'white', fontSize: '16px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
        event: {
            click: async () => {
                const path = pathInput.value.trim();
                if (!path) return;
                const value = edit.innerText;
                writeButton.style.background = '#ffc0cb';
                try {
                    await saveFile(path, value);
                    setTimeout(() => { writeButton.style.background = 'red'; }, 200);
                } catch (err) {
                    writeButton.style.background = '#ff9999';
                    console.error('Ошибка записи:', err);
                }
            }
        }
    });


    qq.ce({
        tag: 'button',
        parent: container,
        it: 'Delete',
        style: qq.cs(mysk, { style: { background: 'red', color: 'white' } }).style,
        event: {
            click: async () => {
                const path = pathInput.value.trim();
                if (!path) return;
                all.clear();
                all.hide();
                let sha;
                try { sha = (await loadFile(path)).sha; } 
                catch(e) { qq.cl('Файл не найден'); all.clear(); all.hide(); return; }
                all.show();
                qq.ce({ tag: 'div', parent: all, it: `Удалить "${path}"?`, style: { padding: '6px', margin: '6px', fontSize: '16px', fontWeight: 'bold' } });
                qq.ce({
                    tag: 'button',
                    parent: all,
                    it: 'Да',
                    style: { background: 'red', color: 'white', margin: '12px', padding: '8px 16px', fontSize: '20px', fontWeight: 'bold', borderRadius: '6px' },
                    event: {
                        click: async () => {
                            try { await deleteFile(path, sha); edit.innerText = ''; all.clear(); all.hide(); qq.cl(`Файл "${path}" удалён`); } 
                            catch(e) { qq.cl('Ошибка: ' + e.message); }
                        }
                    }
                });
                qq.ce({
                    tag: 'button',
                    parent: all,
                    it: 'Нет',
                    style: { margin: '12px', padding: '8px 16px', fontSize: '20px', fontWeight: 'bold', borderRadius: '6px' },
                    event: { click: () => { all.clear(); all.hide(); } }
                });
            }
        }
    });


    return container;
}