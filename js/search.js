document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
  
    if (searchForm) {
      searchForm.addEventListener('submit', handleSearch);
    }
  });
  
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const movieList = document.getElementById('movie-list');
  
    axios.get('http://localhost:3000/movies')
      .then(response => {
        const movies = response.data;
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
  
        movieList.innerHTML = '';
        filteredMovies.forEach(movie => {
          const movieCard = `
            <div class="col-md-4">
              <div class="card movie-card">
                <img src="${movie.poster}" class="card-img-top movie-poster" alt="${movie.title}">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.description}</p>
                  <a href="${movie.trailer}" class="btn btn-primary">Watch Trailer</a>
                </div>
              </div>
            </div>
          `;
          movieList.innerHTML += movieCard;
        });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  