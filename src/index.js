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

const {deleteMovie} = require('./functions.js');

// const deleteMovie = number => {
//
//     const url = `/api/movies/${number}`;
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: "",
//     };
//     fetch(url, options)
//         .then(response => response.json())
//         .catch((error) => {
//             alert('Oh no! Something went wrong.\nCheck the console for details.')
//             console.log(error);
//         })
// }


let editMe;
const wrapper = movie => {
    return `<div>${movie.string} <button>edit</button><button id =deleteBtn${movie.id}> delete</button></div>`;
};



const displayMovies = () => {
    let moviesAry = [];
    $('#movies').html('Loading...');
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        // console.log(movies);
        movies.forEach(({title, rating, id}) => {
            moviesAry.push({string:`<h3>id#${id} - ${title} - rating: ${rating}</h3>`,id:id});
    });
        // console.log('movies',moviesAry);
        return moviesAry;
    }).then(movies =>
    {
        console.log('movies',movies);
        $('#movies').html("");
        movies.map(movie =>{
        $('#movies').append(wrapper(movie));
        $(`#deleteBtn${movie.id}`).click((e) => {
            e.preventDefault();
            deleteMovie(movie.id);
            displayMovies();
        });
        })
    })
    .catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
}

$('form').submit(()=> event.preventDefault());
displayMovies();


const addNew = () => {
    const newMovies = {title: $('#title').val(), rating: $('#rating').val()};
    console.log(newMovies);
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovies),
    }
    fetch(url, options)
        .then(response => response.json())
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.')
            console.log(error);
        })
};



$('#postMovie').click((e)=>{
    e.preventDefault();
    addNew();
    console.log('after click', getMovies());
    displayMovies();
});

$('#editBtn').click((e)=>{
    e.preventDefault();
    addNew();
    console.log('after click', getMovies());
    displayMovies();
});
$('#deleteBtn').click((e)=>{
    e.preventDefault();
    deleteMovie(4);
    displayMovies();
});