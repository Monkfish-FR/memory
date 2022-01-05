const CARDS_SAMPLE = [
  'apple',
  'banana',
  'orange',
  'lime',
  'pomegranate',
  'apricot',
  'lemon',
  'strawberry',
  'greenapple',
  'peach',
  'grape',
  'watermelon',
  'plum',
  'peer',
  'cherry',
  'raspberry',
  'mango',
  'yellowcherry',
];

export default class Memory {
  constructor(options) {
    const { rows, cols, wrapper } = options;

    this.wrapper = wrapper;

    this.rows = rows;
    // On s'assure que le nombre de cases est pair
    this.cols = (rows * cols) % 2 === 0 ? cols : cols - 1;
    this.nbPairs = (this.rows * this.cols) / 2;

    this.cards = [...CARDS_SAMPLE];
    this.deck = this.setDeck();
    console.log(34, this.deck);

    this.firstCard = null;
    this.foundPairs = 0;
  }

  /**
   * Crée le paquet de cartes
   */
  setDeck() {
    // On mélange les cartes disponibles
    const cardsShuffled = Memory.shuffle(this.cards);
    // On prend le nombre de cartes nécessaires
    const cardsSet = cardsShuffled.slice(0, this.nbPairs);
    // On "double" le tableau pour avoir les paires
    const cardsDeck = cardsSet.concat(cardsSet);
    // On re-mélange les cartes
    return Memory.shuffle(cardsDeck);
  }

  /**
   * Initialise le jeu
   */
  init() {
    const board = Memory.buildBoard();
    const squareWidth = 100 / this.cols;

    this.deck.forEach((card) => {
      const square = this.buildSquare(squareWidth, card);
      board.append(square);
    });

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
   * @param {string} cardName Le numéro de la case
   *
   * @returns {HTMLDivElement}
   */
  buildSquare(width, cardName) {
    const square = document.createElement('div');
    square.classList.add(['game__square']);
    square.style.paddingBottom = `${width}%`;
    square.style.width = `${width}%`;

    const squareContent = document.createElement('div');
    squareContent.classList.add(['game__square__content']);

    const card = this.buildCard(cardName);

    squareContent.appendChild(card);
    square.appendChild(squareContent);

    return square;
  }

  /**
   * Crée une carte
   *
   * @param {string} cardName Le nom de la carte
   *
   * @returns {HTMLDivElement}
   */
  buildCard(cardName) {
    const card = document.createElement('div');
    card.classList.add(['card']);
    card.dataset.name = cardName;

    const inner = document.createElement('div');
    inner.classList.add(['card__inner']);

    const front = document.createElement('div');
    front.classList.add(['card__inner__front']);

    const back = document.createElement('div');
    back.classList.add(['card__inner__back']);
    back.textContent = cardName;

    inner.append(front, back);
    card.appendChild(inner);

    card.addEventListener('click', (e) => {
      // Si la carte n'est pas déjà retournée…
      if (
        !e.target.classList.contains('card--clicked')
        && !e.target.classList.contains('card--found')
      ) {
        // …on la traite
        this.clickCard(e.target);
      }
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
  clickCard(card) {
    console.log(153, card.dataset.name);
    card.classList.add('card--clicked');

    // Si c'est la 1ère carte…
    if (!this.firstCard) {
      // …on la garde en mémoire
      this.firstCard = card;
    } else {
      // C'est la seconde carte retournée…
      if (card.dataset.name === this.firstCard.dataset.name) {
        // …la paire est trouvée
        this.foundPairs += 1;

        this.firstCard.classList.replace('card--clicked', 'card--found');
        card.classList.replace('card--clicked', 'card--found');

        this.checkVictory();
      } else {
        // …c'est loupé !
        const first = this.firstCard;

        setTimeout(() => {
          first.classList.remove('card--clicked');
          card.classList.remove('card--clicked');
        }, 1500);
      }

      this.firstCard = null;
    }
  }

  /**
   * Détermine si c'est gagné
   */
  checkVictory() {
    if (this.foundPairs === this.nbPairs) {
      console.log(190, 'YES');
    }
  }

  /**
   * Mélange un tableau (ici les cartes)
   * Array.sort() présente des biais de randomisation,
   * on utilise ici le mélange de Fisher-Yates
   * [https://fr.wikipedia.org/wiki/M%C3%A9lange_de_Fisher-Yates]
   *
   * @param {Array} arr Le tableau à mélanger
   *
   * @returns {Array}
   */
  static shuffle(arr) {
    const shuffled = [...arr];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }
}
