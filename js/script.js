let botonJoke= document.getElementById('fetchJoke');
const url='https://api.chucknorris.io/jokes/random';
let index=0;
console.log(botonJoke);

botonJoke.addEventListener('click', ()=>{
    recibirChiste();
    crearElementoLista();
}



function crearElementoLista(){
    let listaUl=getElementById('jokeList');
    let nuevoLiHTML = `
    <li>
        <p id="parrafo-${indice}>¡Esta es una broma genial!</p>
        <button id="boton-${indice}">Borrar broma</button>
    </li>
    `;
    listaUl.appendchild(nuevoLiHTML);
    console.log(listaUl);

}

function recibirChiste(){
    fetch(url)
        .then((response)=>{
            if(!response.ok)
            {
                throw new Error ('Hay un error en acceder a la API');
            }
            return response.json();
        })
        .then((data)=>{
            localStorage.setItem('chiste',data.value);
        })
        .catch((error)=>{
            console.log(error);
        })
}