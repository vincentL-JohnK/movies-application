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


let editMe;
const wrapper = movie => {
    return `<div>${movie.string}<button id =deleteBtn${movie.id}> delete</button></div>`;
};



const displayMovies = () => {
    let moviesAry = [];
    $('#movies').html('Loading...');
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        console.log(movies);
        movies.forEach(({title, rating, id}) => {
            moviesAry.push({string:`<h3>id#${id} - ${title} - rating: ${rating}</h3>`,id:id});
    });
        // console.log('movies',moviesAry);
        return moviesAry;
    }).then(movies => {
        createOptionList(movies);
        // console.log('movies',movies);
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
        alert('Oh no! Something went wrong.\nCheck the console for details.');
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
    };
    fetch(url, options)
        .then(response => response.json())
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        })
};

//needs completion for editing
let idToEdit = "";
const editMovie = () => {
    const movieToEdit = {title: $('#editTitle').val(), rating: $('#editRating').val()};
    console.log(movieToEdit);
    console.log(idToEdit.slice(3, 5).trim());
    idToEdit = idToEdit.slice(3, 5).trim();
    const url = '/api/movies/'+idToEdit;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieToEdit),
    };
    fetch(url, options)
        .then(response => response.json())
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.')
            console.log(error);
        })
     displayMovies();
};

const createOptionList = (movies) => {
    $('#editSelect').html("");
    const editWrapper = movie => {
         return `<option id="editBtn${movie.id}">${movie.string}</option>`;
    };
        $('#editSelect').append('<option disabled selected value>Select a movie to edit</option>');
    movies.map( movie => {
        $('#editSelect').append(editWrapper(movie))
     });
};

$('#postMovie').click((e)=>{
    e.preventDefault();
    addNew();
    console.log('after click', getMovies());
    displayMovies();
});

// $('#editSelect').click(e)=>{
//
// }

$('#editMovie').click((e)=>{
    console.log('movie being edited', getMovies());
    e.preventDefault();
    idToEdit = $('#editSelect').val()
	editMovie();
});

