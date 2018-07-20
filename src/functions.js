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
    editMovie : () => {
        const newMovies = {title: $('#title').val(), rating: $('#rating').val()};
        console.log(newMovies);
        const url = '/api/movies';
        const options = {
            method: 'PUT',
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
    }

};