import './scss/main.scss';

const $game = document.getElementById('game');
const $headerScroll = document.getElementById('headerScroll');

/* Défiler jusqu'à la div #game  */
$headerScroll.addEventListener('touchend', () => {
  $game.scrollIntoView({ behavior: 'smooth' });
});
