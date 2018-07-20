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
const movieForm = '<form action="/api/movies" method="PUT"><label for="title">Title:</label><input type="text" id="title" name="title" placeholder="movie title" required><br><label for="rating">Rating:</label><select id="rating" name="rating" required><option disabled selected value></option><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option></select><br><br><button id="postMovie">Submit</button></form>';

const displayMovies = () => {
    let moviesAry = [];
    $('#movies').html('Loading...');
    getMovies().then((movies) => {
        console.log('Here are all the movies:');
        console.log(movies);
        movies.forEach(({title, rating, id}) => {
            moviesAry.push(`<div class="test"><h3>id#${id} - ${title} - rating: ${rating}</h3><button id="editMovie">edit</button><button>delete</button></div>`);
        });
        $('#movies').html(moviesAry);
    $('#editMovie').on('click',function(){
        // e.preventDefault();
        console.log('edit clicked');
        editMovie();
        // displayMovies();
    });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};
$('form').submit(()=> event.preventDefault());
displayMovies();

const editMovie = () => {
        $(this).parent.append(movieForm)
};

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
        .then()
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


// const edit? = () => {
//     const newMovies = {title: $('#title').val(), rating: $('#rating').val()};
//     console.log(newMovies);
//     const url = '/api/movies';
//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newMovies),
//     }
//     fetch(url, options)
//         .then(response => response.json())
//         .then()
//         .catch((error) => {
//             alert('Oh no! Something went wrong.\nCheck the console for details.')
//             console.log(error);
//         })
// };


