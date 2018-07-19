/**
 * es6 modules and imports
 */
const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

const displayMovies = () => {
    let moviesAry = [];
    $('#movies').html('Loading...');
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        console.log(typeof movies);
        movies.forEach(({title, rating, id}) => {
            moviesAry.push(`<h3>id#${id} - ${title} - rating: ${rating}</h3>`);
        });
        $('#movies').html(moviesAry);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};
// $('form').submit(()=> event.preventDefault());
displayMovies();

