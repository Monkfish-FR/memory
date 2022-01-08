/**
 * @class Modal
 */
export default class Modal {
  /**
   * Crée une nouvelle instance de Modal
   */
  constructor() {
    this.modal = document.getElementById('modal') || Modal.buildModal();

    this.insert();
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

  populate({
    title,
    content,
    button,
    buttonHandle,
  }) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('modalButton').textContent = button;

    if (buttonHandle) {
      document.getElementById('modalButton').addEventListener('click', (e) => {
        e.preventDefault();
        buttonHandle();
      });
    } else {
      this.addHideEvent();
    }
  }

  addHideEvent() {
    this.modal.addEventListener('click', () => {
      this.hide();
    });
  }

  insert() {
    const app = document.getElementById('app');
    const parent = app.parentNode;

    parent.insertBefore(this.modal, app);
  }

  show(type, data) {
    this.populate(data);
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
