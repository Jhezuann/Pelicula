<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Search App</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Encabezado de navegación -->
    <header>
        <nav>
            <ul class="navbar">
                <li><a href="index.php">Home</a></li>
                <li>
                    <form id="movie-search-form">
                        <input type="text" id="movie-title" placeholder="Search movies..." required>
                        <button type="submit">Search</button>
                    </form>
                </li>
            </ul>
        </nav>
    </header>

    <!-- Sección para mostrar las películas más vistas -->
    <div class="container">
        <h1>Popular Movies of the Year</h1>
        <div id="popular-movies" class="movie-grid"></div>
        <div id="pagination" class="pagination"></div> <!-- Paginación -->
    </div>

    <!-- Sección para mostrar detalles de la película -->
    <div id="movie-details" class="movie-details"></div>

    <!-- Script JavaScript -->
    <script src="js/script.js"></script>
</body>
</html>
