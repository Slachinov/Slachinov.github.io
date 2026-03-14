import {m,butonsEditPanel,bottomPanel} from 'https://slachinov.github.io/Lib/pan/main.js';


export default async function GhPanel(par = {}) {
    let edit = par.edit;
    let all = par.all;
    let parent = par.parent;


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


    async function saveFile(path, content, message, sha) {
        const { owner, repo, token, branch = 'main' } = o;
        if (!sha) {
            try { sha = (await loadFile(path)).sha; } catch(e) {}
        }
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const body = { message: message || 'Update file', content: btoa(unescape(encodeURIComponent(content))), branch };
        if (sha) body.sha = sha;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`Failed to save file: ${response.statusText}`);
        return await response.json();
    }


    async function deleteFile(path, message) {
        const { owner, repo, token, branch = 'main' } = o;
        const sha = (await loadFile(path)).sha;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const body = { message: message || 'Delete file', sha, branch };
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`Failed to delete file: ${response.statusText}`);
        return await response.json();
    }


    const skin = { style: { fontSize: '18px', margin: '3px' } };
    let mysk = qq.cs(skin, par.skinbutt || {});


    let container = qq.ce({
        tag: 'div',
        parent: parent,
        style: { background: '#f9f9f9', border: '1px solid #ccc', padding: '6px', borderRadius: '6px', display: 'inline-block' }
    });


    qq.ce({tag: 'span', parent: container, it: 'Gh0', style: { color: 'darkblue', background: 'white', fontSize: '16px' }});


    qq.ce({tag: 'button', it: 'CL', parent: container, event: { click() { repoInput.value = ''; } } });


    let repoInput;
    let pathInput = qq.ce({ tag: 'input', parent: container, style: { width: '180px', marginLeft: '6px', marginRight: '6px' }, attr: { type: 'text', placeholder: 'Введите path' } }, mysk);


    qq.ce({
        tag: 'button',
        it: 'Load',
        parent: container,
        event: { click: async () => {
            try {
                let path = pathInput.value;
                if(!path) return;
                let file = await loadFile(path);
                edit.innerText = file.content;
            } catch (err) { qq.cl('Ошибка загрузки: ' + err.message); }
        }}
    }, mysk);


    let keyInput;


    qq.ce({
        tag: 'button',
        it: 'All',
        parent: container,
        event: { click: async () => {
            all.clear();
            all.hide();
            try {
                const { default: getAllTree } = await import('https://slachinov.github.io/Lib/github/getall.js');
                const tree = await getAllTree({ owner:o.owner, repo:o.repo, token:o.token, branch:o.branch });
                all.clear(); all.show();
                tree.forEach(item => {
                    qq.ce({
                        tag: 'div',
                        parent: all,
                        it: item.path,
                        className: 'gh-item',
                        style: { border:'1px solid #aaa', padding:'2px', margin:'2px', cursor:'pointer', borderRadius:'3px', background:'#fff' },
                        event: { click: async () => {
                            try { 
                                pathInput.value = item.path;
                                let file = await loadFile(item.path);
                                edit.innerText = file.content;
                                all.clear(); all.hide();
                            } catch(err) { qq.cl('Ошибка загрузки: ' + err.message); }
                        }}
                    });
                });
            } catch (err) { qq.cl('Ошибка загрузки: ' + err.message); }
        }}
    }, mysk);


    qq.ce({tag:'button', parent: container, it:'?', style: { fontSize: '18px', padding:'2px 6px' }});


    qq.ce({
        tag: 'button',
        it: 'Write',
        parent: container,
        event: { click: async () => {
            let path = repoInput.value.trim();
            if(!path) return;
            let value = edit.innerText;
            await saveFile(path, value);
            qq.cl(`Записано: "${path}"`);
        }}
    }, qq.cs(mysk, { style: { background:'red', color:'white' } }));


    qq.ce({
        tag: 'button',
        it: 'Delete',
        parent: container,
        event: { click: async () => {
            let path = repoInput.value.trim();
            if(!path) return;
            all.clear(); all.show();
            qq.ce({ tag:'div', parent:all, it:`Удалить ${path}?`, style:{margin:'10px', fontSize:'20px'} });
            let btnYes = qq.ce({tag:'button', parent:all, it:'Да', style:{margin:'10px', fontSize:'24px'}});
            let btnNo = qq.ce({tag:'button', parent:all, it:'Нет', style:{margin:'10px', fontSize:'24px'}});
            btnYes.addEventListener('click', async () => { 
                try { await deleteFile(path); edit.innerText=''; } 
                catch(e){ qq.cl('Ошибка удаления: '+e.message); } 
                all.clear(); all.hide(); 
            });
            btnNo.addEventListener('click', () => { all.clear(); all.hide(); });
        }}
    }, qq.cs(mysk, { style: { background:'red', color:'white' } }));


    qq.ce({
        tag: 'button',
        parent: container,
        it: '\u2699',
        style: { fontSize:'18px', padding:'2px 6px' },
        event: { click: () => { qq.cl('Нажата кнопка шестеренка'); } }
    });


    return container;
}