import sprite from '../assets/images/cards.png';

const GRID_ROWS = 2;
const GRID_COLS = 2;
const CARDS_DESCRIPTION = [
  {
    name: 'apple',
    index: 0,
  },
  {
    name: 'banana',
    index: 1,
  },
  {
    name: 'orange',
    index: 2,
  },
  {
    name: 'lime',
    index: 3,
  },
  {
    name: 'pomegranate',
    index: 4,
  },
  {
    name: 'apricot',
    index: 5,
  },
  {
    name: 'lemon',
    index: 6,
  },
  {
    name: 'strawberry',
    index: 7,
  },
  {
    name: 'greenapple',
    index: 8,
  },
  {
    name: 'peach',
    index: 9,
  },
  {
    name: 'grape',
    index: 10,
  },
  {
    name: 'watermelon',
    index: 11,
  },
  {
    name: 'plum',
    index: 12,
  },
  {
    name: 'peer',
    index: 13,
  },
  {
    name: 'cherry',
    index: 14,
  },
  {
    name: 'raspberry',
    index: 15,
  },
  {
    name: 'mango',
    index: 16,
  },
  {
    name: 'yellowcherry',
    index: 17,
  },
];

const memorySettings = {
  rows: GRID_ROWS,
  cols: GRID_COLS,
  cards: [...CARDS_DESCRIPTION],
  sprite,
};

export default memorySettings;
