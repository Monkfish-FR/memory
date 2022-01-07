/**
 * @class Modal
 */
export default class Modal {
  /**
   * Crée une nouvelle instance de Modal
   */
  constructor() {
    this.modal = document.getElementById('modal') || Modal.buildModal();

    this
      .insert()
      .addEvent();
  }

  static buildModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.classList.add('modal');

    const overlay = document.createElement('div');
    overlay.classList.add('modal__overlay');

    const content = document.createElement('div');
    content.classList.add('modal__content');

    const title = document.createElement('h2');
    title.id = 'modalTitle';

    const p = document.createElement('p');
    p.id = 'modalContent';

    const button = Modal.buildButton();

    content.append(title, p, button);
    overlay.appendChild(content);
    modal.appendChild(overlay);

    return modal;
  }

  static buildButton() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('t-center');

    const button = document.createElement('button');
    button.id = 'modalButton';
    button.type = 'button';
    button.classList.add('button', 'button--primary');

    wrapper.appendChild(button);

    return wrapper;
  }

  static populate({ title, content, button }) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('modalButton').textContent = button;
  }

  addEvent() {
    this.modal.addEventListener('click', () => {
      this.hide();
    });

    return this;
  }

  insert() {
    const app = document.getElementById('app');
    const parent = app.parentNode;

    parent.insertBefore(this.modal, app);

    return this;
  }

  show(type, data) {
    Modal.populate(data);
    this.modal.classList.add(`modal--${type}`);
  }

  success() {
    this.show('success');
  }

  error() {
    this.show('error');
  }

  hide() {
    this.modal.classList.add('modal--out');

    setTimeout(() => {
      this.modal.className = 'modal';
    }, 500);
  }
}
