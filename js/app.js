//VARIABLES
const formulario = document.querySelector('#formulario'); 
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//EVENT LISTENERS
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //CUANDO EL DOCUMENTO ESTA LISTO
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets') || []);

        crearHTML();
    });
}


//FUNCIONES
function agregarTweet(e){
    e.preventDefault();

    //TEXTAREA DONDE EL USUARIO ESCRIBE
    const tweet = document.querySelector('#tweet').value;
    
    //VALIDAR SI NO SE ENVIA NADA
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj ={
        id: Date.now(),
        tweet
    }

    //ANADIR EL ARREGLO DE TWEETS
    tweets = [...tweets, tweetObj];

    crearHTML();
    formulario.reset();
}

//MOSTRAR MENSAJE DE ERROR
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //INSERTARLO NE EL CONTENIDO
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //ELIMINA ALERTA DESPUES DE 3 SEGUNDOS
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000)
}   

//MUESTRA UN LISTADO DE LOS TWEETS
function crearHTML(){
    limpiarHTML();

    if(tweets.length){
        tweets.forEach( tweet =>{
            //CREAR UN BOTON
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'x';

            //ANADIR LA FUNCION DE ELIMINAR 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //CREA EL HTML
            const li = document.createElement('li');
            
            //ANADE EL TEXTO
            li.innerHTML = tweet.tweet;

            //ASIGNAR EL BOTON
            li.appendChild(btnEliminar);

            //INSERTA EN EL HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//LOCALSTORAGE
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//BORRAR TWEET
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

//LIMIPIAR HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}