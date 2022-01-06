import memorySettings from './js/MemorySettings';
import Memory from './js/Memory';

import './scss/main.scss';

const $game = document.getElementById('game');
const $headerScroll = document.getElementById('headerScroll');

/* Défile jusqu'à la div #game  */
$headerScroll.addEventListener('touchend', () => {
  $game.scrollIntoView({ behavior: 'smooth' });
});

/* Crée le jeu */
const memory = new Memory({
  ...memorySettings,
  wrapper: $game,
});
memory.init();
