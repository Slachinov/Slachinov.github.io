const clear = document.querySelector('.clear-storage')
const date = document.querySelector('.date')
const list = document.querySelector('ul')
const input = document.querySelector('input')

let data = localStorage.getItem('todo')

let items, id
if (data) {
    items = JSON.parse(data)
    loadToDo(items)
    id = items.length
} else {
    items = []
    id = 0
}

function loadToDo(items) {
    items.forEach(item => {
        addToDo(item.name, item.id, item.done, item.false)
    })
}

function addToDo(text, id, done, trash) {
    const doneCheck = done ? 'fa-check-circle' : 'fa-circle-thin'
    const line = done ? 'line-throught' : ''

    if (trash) return

    const template =
        `<li>
        <i class="fa ${doneCheck} complete" data-id="${id}"></i>
        <p class="${line}">${text}</p>
        <i class="fa fa-trash-o delete" data-id="${id}"></i>
    </li>`

    list.insertAdjacentHTML('beforeend', template)
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        const text = input.value
        if (text) {
            addToDo(text, id, false, false)
            items.push({
                name: text,
                id: id,
                done: false,
                trash: false
            })
        }
        id++
        input.value = ''

        localStorage.setItem('todo', JSON.stringify(items))
    }
})

function complete(element) {
    element.classList.toggle('fa-check-circle')
    element.classList.toggle('fa-circle-thin')
    element.nextElementSibling.classList.toggle('line-through')

    items[element.dataset.id].done ? false : true
}

function remove(element) {
    list.removeChild(element.parentNode)
    items[element.dataset.id].trash = true
}

list.addEventListener('click', event => {
    if (event.target.classList.contains('complete')) {
        complete(event.target)
    } else if (event.target.classList.contains('delete')) {
        remove(event.target)
    } else return
})

clear.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})

date.innerHTML = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
}).format()