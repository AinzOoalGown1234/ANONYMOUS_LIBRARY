const generos = ['ISEKAI', 'ACCION', 'AVENTURA', 'FANTASIA', "SLICE OF LIFE", 'DRAMA', 'COMEDIA', 'ROMANCE', 'FICCION', 'MISTERIO', 'HORROR', 'THRILLER', 'MAGIA', 'DEPORTES', 'MECHA','HAREM INVERSO','HENTAI'];
const bookShelfNovela = document.querySelector('.book-shelf-Novela');
import {librosNovela} from "../Data/dataNovela.js"
document.addEventListener('DOMContentLoaded', async function () {
    Iniciar();
});

function Iniciar() {
    const formId = 'NovelaGenreForm';
    const libros = librosNovela;  // Ajusta según tus necesidades reales
    const bookShelf = bookShelfNovela;  // Ajusta según tus necesidades reales
    const genreForm = document.getElementById(formId);

    let genresContainer = genreForm.querySelector('.genres-container') || (() => {
        const container = document.createElement('div');
        container.classList.add('genres-container');
        genreForm.appendChild(container);
        generarCasillasYBotonNinguno(libros, bookShelf, genreForm, container);
        organizarLibrosEnEstante(libros, bookShelf);
        return container;
    })();

    genreForm.addEventListener('change', () => realizarBusqueda(libros, bookShelf));
}


//Listo
function realizarBusquedaYMostrar(libros, bookShelf) {
    const generoSeleccionado = document.querySelector('input[name="generos[]"]:checked');
    const genero = generoSeleccionado ? generoSeleccionado.value.toLowerCase() : '';

    // Organiza y filtra los libros
    const librosFiltrados = libros.filter(libro => {
        const generosElemento = libro.generos.map(g => g.toLowerCase());
        return genero === '' || generosElemento.includes(genero);
    });

    // Actualiza la presentación en el estante y muestra u oculta los elementos
    libros.forEach(libro => {
        const libroElemento = document.getElementById(libro.id);
        if (libroElemento) {
            libroElemento.style.display = librosFiltrados.includes(libro) ? 'block' : 'none';
        }
    });

    // Organiza los libros filtrados en el estante
    organizarLibrosEnEstante(librosFiltrados, bookShelf);
}


//Listo
function generarCasillasYBotonNinguno(libros, bookShelf, genreForm, genresContainer) {
    const GeneralgenreForm = genreForm;
    const tituloGenero = document.createElement('h2');
    tituloGenero.textContent = 'Género';
    genresContainer.appendChild(tituloGenero);

    const botonNinguno = document.createElement('button');
    botonNinguno.classList.add('ninguno-button');
    botonNinguno.textContent = 'REINICIAR';
    botonNinguno.addEventListener('click', function (e) {
        e.preventDefault();
        realizarBusquedaYMostrar(libros, bookShelf, name);
    });
    genresContainer.appendChild(botonNinguno);

    generos.forEach(function (genero) {
        const label = document.createElement('label');
        label.textContent = genero;
        label.style.fontSize = '0.9em';
        label.style.cursor = 'pointer';
        label.style.border = '1px solid #ccc'; // Borde del género
        label.style.borderRadius = '5px'; // Borde redondo
        label.style.padding = '5px'; // Espaciado interno
        label.style.textAlign = 'center'; // Texto centrado
        label.addEventListener('click', function () {
            // Llamar a la función para mostrar libros por género seleccionado
            mostrarLibrosPorGeneroSeleccionado(libros, bookShelf, genero);
        });

        const labelContainer = document.createElement('div');
        labelContainer.style.display = 'flex';
        labelContainer.style.justifyContent = 'center'; // Centrar horizontalmente
        labelContainer.appendChild(label);
        genresContainer.appendChild(labelContainer);
    });

    GeneralgenreForm.appendChild(genresContainer);
}

function organizarLibrosEnEstante(libros, bookShelf) {
    bookShelf.innerHTML = '';

    // Crear un objeto para almacenar libros por género
    const librosPorGenero = {};

    // Organizar libros por género
    libros.forEach((libro) => {
        libro.generos.forEach((genero) => {
            if (!librosPorGenero[genero]) {
                librosPorGenero[genero] = [];
            }
            librosPorGenero[genero].push(libro);
        });
    });

    // Obtener un arreglo de géneros y ordenarlos aleatoriamente
    const generosAleatorios = shuffleArray(Object.keys(librosPorGenero));

    // Crear una fila para cada género
    for (const genero of generosAleatorios) {
        const generoElemento = document.createElement('div');
        generoElemento.classList.add('genre-row');

        // Agregar título del género encima de la fila
        const tituloGenero = document.createElement('h2');
        tituloGenero.textContent = genero;
        generoElemento.appendChild(tituloGenero);

        // Agregar la fila de libros para el género actual
        const filaElemento = document.createElement('div');
        filaElemento.classList.add('row');
        filaElemento.style.display = 'flex';
        filaElemento.style.overflowX = 'auto';

        // Obtener los libros del género actual
        const librosDelGenero = shuffleArray(librosPorGenero[genero]);

        // Mostrar los libros del género en la fila
        librosDelGenero.forEach((libro) => {
            const libroElemento = document.createElement('div');
            const infoElemento = document.createElement('div');

            libroElemento.classList.add('download-link');
            libroElemento.setAttribute('id', libro.id);
            libroElemento.setAttribute('data-generos', JSON.stringify(libro.generos));

            const imagenElemento = document.createElement('img');
            imagenElemento.src = libro.imagen;
            imagenElemento.alt = libro.nombre;
            imagenElemento.addEventListener('click', function () {
                window.location.href = `./Generico/genericoGeneral.html?id=${libro.id}`;
            });

            const h3Elemento = document.createElement('h3');
            h3Elemento.textContent = libro.nombre;

            const generosElemento = document.createElement('p');
            generosElemento.textContent = `Géneros: ${libro.generos.join(', ')}`;

            infoElemento.classList.add('info');
            infoElemento.addEventListener('click', function () {
                window.location.href = `./Generico/genericoGeneral.html?id=${libro.id}`;
            });

            infoElemento.appendChild(h3Elemento);

            libroElemento.appendChild(imagenElemento);
            libroElemento.appendChild(infoElemento);

            filaElemento.appendChild(libroElemento);
        });

        generoElemento.appendChild(filaElemento);

        // Agregar la fila con el nombre del género al estante
        bookShelf.appendChild(generoElemento);
    }
}

function mostrarLibrosPorGeneroSeleccionado(libros, bookShelf, generoSeleccionado) {
    bookShelf.innerHTML = '';

    const generoElemento = document.createElement('div');
    generoElemento.classList.add('genre-row');

    const tituloGenero = document.createElement('h2');
    tituloGenero.textContent = generoSeleccionado;
    generoElemento.appendChild(tituloGenero);

    const filaElemento = document.createElement('div');
    filaElemento.classList.add('row');
    filaElemento.style.display = 'flex';
    filaElemento.style.overflowX = 'auto';

    // Mezclar aleatoriamente los libros del género
    const librosDelGenero = shuffleArray(libros.filter(libro => libro.generos.includes(generoSeleccionado)));

    librosDelGenero.forEach((libro) => {
        const libroElemento = document.createElement('div');
        const infoElemento = document.createElement('div');

        libroElemento.classList.add('download-link');
        libroElemento.setAttribute('id', libro.id);
        libroElemento.setAttribute('data-generos', JSON.stringify(libro.generos));

        const imagenElemento = document.createElement('img');
        imagenElemento.src = libro.imagen;
        imagenElemento.alt = libro.nombre;
        imagenElemento.addEventListener('click', function () {
            window.location.href = `./Generico/genericoGenerela.html?id=${libro.id}`;
        });

        const h3Elemento = document.createElement('h3');
        h3Elemento.textContent = libro.nombre;

        const generosElemento = document.createElement('p');
        generosElemento.textContent = `Géneros: ${libro.generos.join(', ')}`;

        infoElemento.classList.add('info');
        infoElemento.addEventListener('click', function () {
            window.location.href = `./Generico/genericoGeneral.html?id=${libro.id}`;
        });

        infoElemento.appendChild(h3Elemento);

        libroElemento.appendChild(imagenElemento);
        libroElemento.appendChild(infoElemento);

        filaElemento.appendChild(libroElemento);
    });

    generoElemento.appendChild(filaElemento);
    bookShelf.appendChild(generoElemento);
}

// Función para mezclar aleatoriamente un array usando el algoritmo Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    