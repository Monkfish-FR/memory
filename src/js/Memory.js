export default class Memory {
  constructor(options) {
    const { rows, cols, wrapper } = options;

    this.rows = rows;
    this.cols = cols;
    this.squares = rows * cols;
    this.wrapper = wrapper;
  }

  /**
   * Initialise le jeu
   */
  init() {
    const board = Memory.buildBoard();
    const squareWidth = 100 / this.cols;

    for (let i = 0; i < this.squares; i += 1) {
      const square = Memory.buildSquare(squareWidth, i);
      board.append(square);
    }

    this.wrapper.appendChild(board);
  }

  /**
   * Crée le plateau
   *
   * @returns {HTMLDivElement}
   */
  static buildBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    board.classList.add('game__board');

    return board;
  }

  /**
   * Crée une case
   *
   * @param {Number} width La largeur de la case en pourcentage (sans l'unité)
   * @param {Number} index Le numéro de la case
   *
   * @returns {HTMLDivElement}
   */
  static buildSquare(width, index) {
    const square = document.createElement('div');
    square.classList.add(['game__square']);
    square.style.paddingBottom = `${width}%`;
    square.style.width = `${width}%`;

    const squareContent = document.createElement('div');
    squareContent.classList.add(['game__square__content']);

    const card = this.buildCard(index);

    squareContent.appendChild(card);
    square.appendChild(squareContent);

    return square;
  }

  /**
   * Crée une carte
   *
   * @param {Number} index Le numéro de la case
   * @returns {HTMLDivElement}
   */
  static buildCard(index) {
    const card = document.createElement('div');
    card.classList.add(['card']);
    card.dataset.index = index;

    const inner = document.createElement('div');
    inner.classList.add(['card__inner']);

    const front = document.createElement('div');
    front.classList.add(['card__inner__front']);

    const back = document.createElement('div');
    back.classList.add(['card__inner__back']);
    back.textContent = index;

    inner.append(front, back);
    card.appendChild(inner);

    card.addEventListener('click', (e) => {
      this.clickCard(e.target);
    });

    return card;
  }

  /**
   * Sélectionne la carte
   *
   * @param {HTMLDivElement} card La carte sélectionnée
   * @TODO: si 1ère ou 2ème carte
   * @TODO: si 2ème carte et bonne ou mauvaise
   */
  static clickCard(card) {
    console.log(96, card.dataset.index);
    card.classList.add('card-clicked');
  }
}
