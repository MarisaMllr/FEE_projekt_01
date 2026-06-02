export default class TodoView {

  // Öffnen-Button mit Handler verbinden
  bindCreateTodo(handler) {
    const btn = document.querySelector('#btn-create-todo');
    btn.addEventListener('click', handler);
  }

  // Dialog unterhalb des Headers einblenden
  openCreateDialog() {
    const dialog = document.querySelector('#dialog-create-todo');
    const headerHeight = document.querySelector('#main-header').offsetHeight;
    const rem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    dialog.style.top = `${headerHeight + rem}px`;
    dialog.classList.add('dialog--open');
  }

  // Schliessen-Button mit Handler verbinden
  bindCloseDialog(handler) {
    const btn = document.querySelector('#btn-close');
    btn.addEventListener('click', handler);
  }

  // Dialog ausblenden
  closeDialog() {
    const dialog = document.querySelector('#dialog-create-todo');
    dialog.classList.remove('dialog--open');
  }

  // Formular-Submit mit Handler verbinden und Formulardaten übergeben
  bindSubmitForm(handler) {
    const form = document.querySelector('#form-create-todo');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      handler({
        title: formData.get('title'),
        dateDue: formData.get('date_due'),
        importance: formData.get('importance'),
        description: formData.get('description'),
        completed: formData.get('completed') === 'on',
      });
      event.target.reset();
    });
  }

  // Todo-Liste neu rendern
  renderTodos(todos) {
    const todoList = document.querySelector('#todos');
    todoList.innerHTML = '';

    todos.forEach(todo => {
      const listItem = document.createElement('div');
      listItem.classList.add('todo-item');

      // Struktur mit innerHTML, Nutzerdaten via textContent (XSS-Schutz)
      listItem.innerHTML = `
        <div class="todo-content">
          <span class="todo-date-due"></span>
          <h3></h3>
          <span class="todo-importance"></span>
          <label>Erledigt
            <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
          </label>
          <p></p>
        </div>
        <button class="btn btn--edit btn--default" data-id="${todo.id}">Bearbeiten</button>
      `;

      listItem.querySelector('.todo-date-due').textContent = this.getRelativeDueDate(todo.dateDue);
      listItem.querySelector('h3').textContent = todo.title;
      listItem.querySelector('.todo-importance').textContent = '⚡'.repeat(Number(todo.importance));
      listItem.querySelector('p').textContent = todo.description;

      todoList.appendChild(listItem);
    });
  }

  // Fälligkeitsdatum als relative Angabe ausgeben (z.B. "in 3 Tagen")
  getRelativeDueDate(dateDue) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dateDue);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Heute fällig';
    if (diffDays === 1) return 'in 1 Tag';
    if (diffDays > 1) return `in ${diffDays} Tagen`;
    if (diffDays === -1) return 'vor 1 Tag';
    return `vor ${Math.abs(diffDays)} Tagen`;
  }
}
