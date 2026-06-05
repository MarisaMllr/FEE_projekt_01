export default class TodoDialogView {

  #openDialog() {
    const dialog = document.querySelector('#dialog-create-todo');
    const todoHeader = document.querySelector('.todos__header');
    const headerHeight = document.querySelector('#main-header').offsetHeight;
    const todoList = document.querySelector('#todos');
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    dialog.style.top = `${headerHeight + rem}px`;
    dialog.classList.add('dialog--open');
    todoList.classList.add('hidden');
    todoHeader.classList.add('hidden');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }

  openCreate() {
    this.#openDialog();
  }

  openEdit(todo) {
    this.#openDialog();
    const form = document.querySelector('#form-create-todo');
    form.querySelector('#editing-id').value = todo.id;
    form.querySelector('#title').value = todo.title;
    form.querySelector('#date_due').value = todo.dateDue;
    form.querySelector(`#importance-${todo.importance}`).checked = true;
    form.querySelector('#completed').checked = todo.completed;
    form.querySelector('#description').value = todo.description;
  }

  close() {
    const dialog = document.querySelector('#dialog-create-todo');
    const todoList = document.querySelector('#todos');
    const todoHeader = document.querySelector('.todos__header');
    todoList.classList.remove('hidden');
    todoHeader.classList.remove('hidden');
    dialog.classList.remove('dialog--open');
    document.querySelector('#form-create-todo').reset();
  }

  bindResetForm(handler) {
    const form = document.querySelector('#form-create-todo');
    form.addEventListener('reset', (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindClose(handler) {
    document.querySelector('.dialog__actions .btn--close')
    .addEventListener('click', handler);
  }

  bindSubmit(handler) {
    const form = document.querySelector('#form-create-todo');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const submitButton = event.submitter;
      handler({
        editingId: formData.get('editing_id') || null,
        title: formData.get('title'),
        dateDue: formData.get('date_due'),
        importance: formData.get('importance'),
        description: formData.get('description'),
        completed: formData.get('completed') === 'on',

        action: submitButton?.value || null,
      });
    });
  }
}
