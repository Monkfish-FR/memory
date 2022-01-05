import Memory from './js/Memory';

import './scss/main.scss';

const GRID_ROWS = 4;
const GRID_COLS = 7;

const $game = document.getElementById('game');
const $headerScroll = document.getElementById('headerScroll');

/* Défiler jusqu'à la div #game  */
$headerScroll.addEventListener('touchend', () => {
  $game.scrollIntoView({ behavior: 'smooth' });
});

/* Créer le jeu */
const memory = new Memory({
  rows: GRID_ROWS,
  cols: GRID_COLS,
  wrapper: $game,
});
memory.init();
