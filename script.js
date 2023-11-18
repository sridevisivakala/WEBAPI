const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');

searchInput.addEventListener('input', debounce(searchMovies, 500));

async function searchMovies() {
    const query = searchInput.value;
    if (query === '') {
        movieList.innerHTML = '';
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=YOUR_OMDB_API_KEY`);
    const data = await response.json();

    if (data.Search) {
        movieList.innerHTML = data.Search.map(movie => createMovieCard(movie)).join('');
    } else {
        movieList.innerHTML = '<p>No results found.</p>';
    }
}

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <h3>${movie.Title}</h3>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <p>Year: ${movie.Year}</p>
        </div>
    `;
}

function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

