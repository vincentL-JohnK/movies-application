const $ = require('jquery');

module.exports = {
    deleteMovie: number => {

        const url = `/api/movies/${number}`;
        const options = {
                method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: "",
        };
        fetch(url, options)
            .then(response => response.json())
            .catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.')
                console.log(error);
            })
    },
    editMovie : (id) => {
        const edited = {title: $('#editTitle').val(), rating: $('#editRating').val()};
        const url = '/api/movies/'+id;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(edited),
        };
        fetch(url, options)
            .then(response => response.json())
            .catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.')
                console.log(error);
            })
    }

};