export default function GhPanel(par = {}) {
    let edit = par.edit;      // textarea или div для вывода/редактирования
    let all = par.all;        // контейнер для списка элементов
    let parent = par.parent;  // куда вставлять панель


    const skin = { style: { fontSize: '18px', margin: '3px' } };
    let mysk = qq.cs(skin, par.skinbutt || {});


    // контейнер с мягким фоном и бордером
    let container = qq.ce({
        tag: 'div',
        parent: parent,
        style: { background: '#f0f8ff', border: '1px solid #ccc', padding: '6px', borderRadius: '6px', display: 'inline-block' }
    });


    // метка
    qq.ce({
        tag: 'span',
        parent: container,
        it: 'Gh',
        style: { color: 'darkblue', background: 'white', marginRight: '6px', fontSize: '16px', padding: '2px 4px', borderRadius: '3px' }
    });


    // кнопка очистки input
    qq.ce({
        tag: 'button',
        it: 'CL',
        parent: container,
        event: { click() { repoInput.value = ''; } }
    }, mysk);


    // input для репозитория / path
    let repoInput = qq.ce({
        tag: 'input',
        parent: container,
        style: { width: '300px', marginLeft: '6px', marginRight: '6px' },
        attr: { type: 'text', placeholder: 'Введите path' }
    }, mysk);


    // Load репозиторий
    qq.ce({
        tag: 'button',
        it: 'Load',
        parent: container,
        event: {
            click: async () => {
                let path = repoInput.value.trim();
                if (!path) return;
                let items = await par.githubLoadRepo(path); // твоя функция получения элементов репозитория
                renderItems(items);
            }
        }
    }, mysk);


    qq.ce({ tag: 'br', parent: container });


    // input для ключа / имени элемента
    let keyInput = qq.ce({
        tag: 'input',
        parent: container,
        style: { width: '250px', marginRight: '6px', marginTop: '3px' },
        attr: { type: 'text', placeholder: 'Введите имя элемента' }
    }, mysk);


    // кнопки All / Write / Delete
    qq.ce({
        tag: 'button',
        it: 'All',
        parent: container,
        event: {
            click: async () => {
                let path = repoInput.value.trim();
                if (!path) return;
                let items = await par.githubAll(path);
                renderItems(items);
            }
        }
    }, mysk);


    qq.ce({
        tag: 'button',
        it: 'Write',
        parent: container,
        event: {
            click: async () => {
                let path = repoInput.value.trim();
                if (!path) return;
                let key = keyInput.value.trim();
                if (!key) return;
                let value = edit.innerText;
                await par.githubWrite(path, key, value);
                qq.cl(`Записано: "${key}"`);
            }
        }
    }, mysk);


    qq.ce({
        tag: 'button',
        it: 'Delete',
        parent: container,
        event: {
            click: async () => {
                let path = repoInput.value.trim();
                if (!path) return;
                let key = keyInput.value.trim();
                if (!key) return;
                await par.githubDelete(path, key);
                edit.innerText = '';
                qq.cl(`Удалено: "${key}"`);
            }
        }
    }, mysk);


    // рендер списка элементов
    function renderItems(items) {
        if (!items || items.length === 0) return;
        all.innerHTML = '';
        all.show();
        for (let key of items) {
            qq.ce({
                tag: 'div',
                parent: all,
                it: key,
                style: { border: '1px solid #aaa', padding: '2px', margin: '2px', cursor: 'pointer', borderRadius: '3px', background:'#fff' },
                event: {
                    click: async () => {
                        keyInput.value = key;
                        let path = repoInput.value.trim();
                        if (!path) return;
                        edit.innerText = await par.githubLoad(path, key) || '';
                        all.hide();
                    }
                }
            });
        }
    }


    return container;
}