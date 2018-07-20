// module.exports = {
//     deleteMovie: (number) => {
// 	    console.log('delete');
// 	    const url = `/api/movies/${number}`;
//         const options = {
//                 method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: "",
//         };
//         fetch(url, options)
//             .then(response => response.json())
//             .catch((error) => {
//                 alert('Oh no! Something went wrong.\nCheck the console for details.')
//                 console.log(error);
//             })
//     },
// };