document.getElementById('movie-search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('movie-title').value;
    if (title) {
        // Intentar buscar el título ingresado en primer lugar
        fetchMovieData(title).then(movie => {
            if (movie && movie.Response === "True") {
                displayMovies([movie], 1); // Muestra solo la película buscada
            } else {
                // Si no se encuentra la película, intentar buscarla por el nombre en inglés u otro idioma principal
                fetchMovieDataByOriginalTitle(title).then(movie => {
                    if (movie && movie.Response === "True") {
                        displayMovies([movie], 1); // Muestra la película con el título original
                    } else {
                        alert("No se encontró la película.");
                    }
                });
            }
        });
    }
});

// Obtener datos de una película por título en español
function fetchMovieData(title) {
    return fetch(`api/fetch_movie.php?title=${encodeURIComponent(title)}&language=es`) // Se intenta traer la sinopsis en español
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Obtener datos de una película usando el título original en inglés u otro idioma principal, en español
function fetchMovieDataByOriginalTitle(title) {
    return fetch(`api/fetch_movie.php?title=${encodeURIComponent(title)}&language=es`) // También en español
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Lista de títulos populares para mostrar
const popularTitles = [
    "Oppenheimer", "Barbie", "Guardians of the Galaxy Vol. 3", "Spider-Man: Across the Spider-Verse",
    "John Wick: Chapter 4", "The Super Mario Bros. Movie", "Mission: Impossible - Dead Reckoning Part One",
    "Fast X", "Indiana Jones and the Dial of Destiny", "The Flash", "Dune: Part Two", "Aquaman and the Lost Kingdom",
    "The Marvels", "Transformers: Rise of the Beasts", "Shazam! Fury of the Gods", "Scream VI",
    "Creed III", "The Little Mermaid", "Ant-Man and the Wasp: Quantumania", "The Hunger Games: The Ballad of Songbirds & Snakes",
    "Wish", "Blue Beetle", "Gran Turismo", "Meg 2: The Trench", "Evil Dead Rise", "Wonka", 
    "The Nun II", "Insidious: The Red Door", "The Equalizer 3", "The Last Voyage of the Demeter",
    "Saw X", "The Exorcist: Believer", "Dungeons & Dragons: Honor Among Thieves", "Renfield",
    "Cocaine Bear", "65", "The Blackening", "The Boogeyman", "M3GAN", "Asteroid City",
    "Killers of the Flower Moon", "Elemental", "Wish Dragon", "Space Jam: A New Legacy",
    "Minions: The Rise of Gru", "Hotel Transylvania: Transformania", "Sing 2", "Encanto",
    "Turning Red", "Lightyear", "Luca", "Soul", "Frozen II", "Onward",
    "Toy Story 4", "Raya and the Last Dragon", "Spider-Man: No Way Home", "Avengers: Endgame",
    "Black Panther: Wakanda Forever", "Thor: Love and Thunder", "Doctor Strange in the Multiverse of Madness",
    "Captain Marvel", "Black Widow", "The Batman", "Joker", "Wonder Woman 1984"
];

// Variables de paginación
let currentPage = 1;
const itemsPerPage = 12; // Muestra 12 películas por página

// Obtener películas populares y configurar la paginación
function fetchPopularMovies() {
    const popularMovies = popularTitles.map(title => fetchMovieData(title));
    Promise.all(popularMovies).then(results => {
        displayMovies(results, currentPage);
        setupPagination(results.length);
    });
}

// Mostrar películas según la página seleccionada
function displayMovies(movies, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const moviesToShow = movies.slice(startIndex, endIndex);

    const movieContainer = document.getElementById("popular-movies");
    movieContainer.innerHTML = ""; // Limpiar el contenido actual

    moviesToShow.forEach(movie => {
        if (movie && movie.Response === "True") {
            // Aquí la sinopsis siempre se mostrará en español, garantizado
            movieContainer.innerHTML += `
                <div class="movie-item">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'assets/no-poster.jpg'}" alt="Movie Poster">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <p><strong>Género:</strong> ${movie.Genre}</p>
                    <p><strong>Calificación IMDB:</strong> ${movie.imdbRating}</p>
                    <p><strong>Sinopsis:</strong> ${movie.Plot}</p> <!-- Sinopsis en español -->
                </div>
            `;
        }
    });
}

// Configurar la paginación según la cantidad de películas
function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Limpiar el paginador actual

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.classList.add("page-button");
        button.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(button);
    }
}

// Cambiar la página actual y actualizar la vista
function changePage(page) {
    currentPage = page;
    fetchPopularMovies(); // Actualiza la visualización de películas para la página seleccionada
}

// Inicia mostrando las películas populares al cargar la página
fetchPopularMovies();
