const CARDS_SAMPLE = [
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

export default class Memory {
  constructor(options) {
    const { rows, cols, wrapper } = options;

    this.wrapper = wrapper;
    this.board = null;

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
    this.board = Memory.buildBoard();
    const squareWidth = 100 / this.cols;

    this.deck.forEach(({ name, index }) => {
      const square = this.buildSquare(squareWidth, name, index);
      this.board.append(square);
    });

    this.wrapper.appendChild(this.board);
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
   * @param {string} cardName Le numéro de la carte
   * @param {Number} index L'index de la carte
   *
   * @returns {HTMLDivElement}
   */
  buildSquare(width, cardName, index) {
    const square = document.createElement('div');
    square.classList.add('game__square');
    square.style.paddingBottom = `${width}%`;
    square.style.width = `${width}%`;

    const squareContent = document.createElement('div');
    squareContent.classList.add('game__square__content');

    const card = this.buildCard(cardName, index);

    squareContent.appendChild(card);
    square.appendChild(squareContent);

    return square;
  }

  /**
   * Crée une carte
   *
   * @param {string} cardName Le nom de la carte
   * @param {Number} index L'index de la carte
   *
   * @returns {HTMLDivElement}
   */
  buildCard(cardName, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = cardName;

    const inner = document.createElement('div');
    inner.classList.add('card__inner');

    const front = document.createElement('div');
    front.classList.add('card__inner__front');

    const back = document.createElement('div');
    back.classList.add('card__inner__back', `card-back--${index}`);

    inner.append(front, back);
    card.appendChild(inner);

    card.addEventListener('click', (e) => {
      // Si la carte n'est pas déjà retournée…
      if (
        !e.target.classList.contains('card--clicked')
        && !e.target.classList.contains('card--found')
        && !this.board.classList.contains('disabled')
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
   */
  clickCard(card) {
    // this.checkVictory(true); // TODO: remove this line
    card.classList.add('card--clicked');

    // Si c'est la 1ère carte…
    if (!this.firstCard) {
      // …on la garde en mémoire
      this.firstCard = card;
    } else {
      // C'est la seconde carte retournée…
      // …on bloque les prochains clics
      this.board.classList.add('disabled');

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
          // on "réactive" le jeu
          this.board.classList.remove('disabled');

          first.classList.remove('card--clicked');
          card.classList.remove('card--clicked');
        }, 1500);
      }

      this.firstCard = null;
    }
  }

  /**
   * Détermine si c'est gagné
   *
   * @param {Boolean} [force=false] Force la victoire ?
   */
  checkVictory(force = false) {
    if (force || this.foundPairs === this.nbPairs) {
      const modal = document.getElementById('win');
      modal.classList.add('modal--win');

      modal.addEventListener('click', () => {
        modal.classList.add('modal--out');

        setTimeout(() => {
          modal.classList.remove('modal--win', 'modal--out');
        }, 500);
      });
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
