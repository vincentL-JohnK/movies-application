import {deleteMovie} from './functions.js'
module.exports = {
  getMovies: () => {
    let removeMovie = deleteMovie;
    return fetch('/api/movies')
        .then(response => response.json());
  }
};
