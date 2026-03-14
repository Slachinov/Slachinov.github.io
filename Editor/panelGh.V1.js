export default function GitHubPanel(par = {}) {
    let edit = par.edit;      // textarea или div для вывода/редактирования
    let all = par.all;        // контейнер для списка элементов
    let parent = par.parent;  // куда вставлять панель


    const skin = { style: { fontSize: '20px', margin: '2px' } };
    let mysk = qq.cs(skin, par.skinbutt || {});


    // контейнер
    let container = qq.ce({ tag: 'div', parent: parent });


    // метка
    qq.ce({
        tag: 'span',
        parent: container,
        it: 'GitHub',
        style: { color: 'blue', background: 'white', marginRight: '6px', fontSize: '16px' }
    });


    // input для адреса репозитория / API
    let repoInput = qq.ce({
        tag: 'input',
        parent: container,
        style: { width: '300px', marginRight: '6px' },
        attr: { type: 'text', placeholder: 'Введите репозиторий или API URL' }
    }, mysk);


    // кнопка очистки input
    qq.ce({
        tag: 'button',
        it: 'CL',
        parent: container,
        event: { click() { repoInput.value = ''; } }
    });


    qq.ce({ tag: 'br', parent: container });


    // All
    qq.ce({
        tag: 'button',
        it: 'All',
        parent: container,
        event: {
            click: async () => {
                let repo = repoInput.value.trim();
                if (!repo) return;
                // вызываем твою функцию для получения всех элементов
                let items = await par.githubAll(repo); // должна вернуть массив
                renderItems(items);
            }
        }
    }, mysk);


    // Write
    qq.ce({
        tag: 'button',
        it: 'Write',
        parent: container,
        event: {
            click: async () => {
                let repo = repoInput.value.trim();
                if (!repo) return;
                let key = keyInput.value.trim();
                if (!key) return;
                let value = edit.innerText;
                await par.githubWrite(repo, key, value);
                qq.cl(`Записано: "${key}"`);
            }
        }
    }, mysk);


    // Delete
    qq.ce({
        tag: 'button',
        it: 'Delete',
        parent: container,
        event: {
            click: async () => {
                let repo = repoInput.value.trim();
                if (!repo) return;
                let key = keyInput.value.trim();
                if (!key) return;
                await par.githubDelete(repo, key);
                edit.innerText = '';
                qq.cl(`Удалено: "${key}"`);
            }
        }
    }, mysk);


    // Load
    qq.ce({
        tag: 'button',
        it: 'Load',
        parent: container,
        event: {
            click: async () => {
                let repo = repoInput.value.trim();
                if (!repo) return;
                let key = keyInput.value.trim();
                if (!key) return;
                let value = await par.githubLoad(repo, key);
                edit.innerText = value || '';
                if (!value) qq.cl(`Нет значения: "${key}"`);
            }
        }
    }, mysk);


    qq.ce({ tag: 'br', parent: container });


    // input для ключа / имени файла / элемента
    let keyInput = qq.ce({
        tag: 'input',
        parent: container,
        style: { width: '250px', marginRight: '6px' },
        attr: { type: 'text', placeholder: 'Введите имя элемента' }
    }, mysk);


    // контейнер для рендеринга элементов
    function renderItems(items) {
        if (!items || items.length === 0) return;
        all.innerHTML = '';
        all.show();
        for (let key of items) {
            qq.ce({
                tag: 'div',
                parent: all,
                it: key,
                style: { border: '1px solid black', padding: '2px', margin: '2px', cursor: 'pointer' },
                event: {
                    click() {
                        keyInput.value = key;
                        edit.innerText = ''; // можно вызвать githubLoad по клику, если нужно
                        all.hide();
                    }
                }
            });
        }
    }


    return container;
}