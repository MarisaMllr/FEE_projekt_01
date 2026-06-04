export default class TodoListView {

  render(todos) {
    const todoList = document.querySelector('#todos');
    todoList.innerHTML = '';

    todos.forEach(todo => {
      const listItem = document.createElement('div');
      listItem.classList.add('todo-item');

      // set structure with innerHTML, user data via textContent to prevent XSS
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

      listItem.querySelector('.todo-date-due').textContent = this.#getRelativeDueDate(todo.dateDue);
      listItem.querySelector('h3').textContent = todo.title;
      listItem.querySelector('.todo-importance').textContent = '⚡'.repeat(Number(todo.importance));
      listItem.querySelector('p').textContent = todo.description;

      todoList.appendChild(listItem);
    });
  }

  // event delegation catches dynamically rendered buttons
  bindEdit(handler) {
    document.querySelector('#todos').addEventListener('click', (event) => {
      const btn = event.target.closest('.btn--edit');
      if (btn) handler(btn.dataset.id);
    });
  }

  #getRelativeDueDate(dateDue) {
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
