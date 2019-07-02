console.log("wow");

// fetch('http://localhost:3012/api/artists', {
//     method: 'GET',
// })
//     .then((data) => {
//         return data.json()
//     }) 
//     .then((user) => {
//         console.log(user);
//     }) 

import { getArtists } from "./src/utils/artistAPI";

getArtists('http://localhost:3012/api/artists')
    .then(artist => console.log(artist));

// JSONP example

var script = document.createElement('script');
script.src = 'http://localhost:3012/api/artists/?callback=getArtist';
document.getElementsByTagName('head')[0].appendChild(script);

const getArtist = (artists) => {
    console.log(artists);
}