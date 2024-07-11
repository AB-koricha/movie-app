document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
  
    axios.get('http://localhost:3000/movies')
      .then(response => {
        const movies = response.data;
        movies.forEach(movie => {
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
  });
  