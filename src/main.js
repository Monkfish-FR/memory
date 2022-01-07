import memorySettings from './js/MemorySettings';
import Memory from './js/Memory';
import Timer from './js/Timer';

import './scss/main.scss';

const $game = document.getElementById('game');
const $headerScroll = document.getElementById('headerScroll');

/* Défile jusqu'à la div #game  */
$headerScroll.addEventListener('touchend', () => {
  $game.scrollIntoView({ behavior: 'smooth' });
});

/* Crée le jeu */
// On crée le compte à rebours
// null si pas de décompte
// const timer = new Timer();
const timer = new Timer({ duration: '4s' });

const memory = new Memory({
  ...memorySettings,
  wrapper: $game,
  timer,
});
memory.init();
