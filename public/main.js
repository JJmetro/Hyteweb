import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { showJoke } from './joke.js';
import { showPics } from './catpics.js';
import { fetchData } from './fetch.js';

document.querySelector('#app').innerHTML = 'Moi täällä ollaan';

// haetaan nappula ja tarjotaan showJoke funktiolle
let element = document.querySelector('.chuck');
console.log(element);
showJoke(element);
showJoke(document.querySelector('.toinen'));

showPics(document.querySelector('.pics'));


// tehtävä 4
fetchData(document.querySelector('.json-data'));

