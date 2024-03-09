document.addEventListener("DOMContentLoaded", () => {
    cargarChistes()
})

let botonJoke= document.getElementById('fetchJoke')
let clearAll = document.getElementById("clearAll")
let listaUl = document.getElementById('jokeList')
const url = 'https://api.chucknorris.io/jokes/random'
let index = parseInt(localStorage.getItem('index')) || 0

clearAll.addEventListener('click', () => {
    localStorage.clear()
    listaUl.innerHTML = ''
})

botonJoke.addEventListener('click', ()=>{
    recibirChiste()
})

function cargarChistes() {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i)
        let valor = localStorage.getItem(clave)
        if (clave.startsWith('chiste')) {
            crearElementoLista(valor, clave.split('-')[1])
        }
    }
}

function crearElementoLista(valor,index){
    let nuevoLi = document.createElement("li")

    let parrafo = document.createElement('p')
    parrafo.textContent = valor
    parrafo.id = `parrafo-${index}`

    let boton_borrar = document.createElement('button')
    boton_borrar.textContent = 'Borrar chiste'
    boton_borrar.id = `boton-${index}`
    boton_borrar.addEventListener('click', () => {
        localStorage.removeItem(`chiste${index}`)
        nuevoLi.remove()
    });

    nuevoLi.appendChild(parrafo)
    parrafo.insertAdjacentElement('afterend',boton_borrar)

    listaUl.appendChild(nuevoLi)

}

function recibirChiste(){
    fetch(url)
        .then((response)=>{
            if(!response.ok)
            {
                throw new Error ('Hay un error en acceder a la API')
            }
            return response.json()
        })
        .then((data)=>{
            localStorage.setItem(`chiste${index}`,data.value)
            crearElementoLista(data.value,index)
            index++
        })
        .catch((error)=>{
            console.log(error)
        })
}