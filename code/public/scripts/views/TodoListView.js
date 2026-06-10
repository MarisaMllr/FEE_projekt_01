export default class TodoListView {

  bindSort(handler) {
    const sortsOptions = document.querySelectorAll('.btn--sort');
    sortsOptions.forEach(btn => btn.addEventListener('click', () => {
      handler(btn.dataset.sort);
    }))
  }

  bindFilterTodos(handler) {
    const filterBtn = document.querySelector('.btn--filter');
    filterBtn.addEventListener('click', () => handler());
  }

  setActiveSortButton(sort, direction) {
    document.querySelectorAll('.btn--sort').forEach(btn => {
      btn.classList.remove('active-asc', 'active-desc');
    });
    const activeClass = direction === 1 ? 'active-asc' : 'active-desc';
    document.querySelector(`[data-sort="${sort}"]`).classList.add(activeClass);
  }

  setFilterButton(active) {
    const btn = document.querySelector('.btn--filter');
    btn.classList.toggle('active', active);
    btn.textContent = active ? 'Alle' : 'Offene';
  }

  render(todos) {
    const todoList = document.querySelector('#todos');
    todoList.innerHTML = '';

    if (todos.length === 0) {
      todoList.innerHTML = `
        <div class="empty-todos">
          Keine Todos gefunden !?
        </div>
      `;
    }

    todos.forEach(todo => {
      const listItem = document.createElement('div');
      listItem.classList.add('todo-item');

      // set structure with innerHTML, user data via textContent to prevent XSS
      listItem.innerHTML = `
        <div class="todo-content">
          <span class="todo-date-due"></span>
          <h3 class="todo-title"></h3>
          <span class="todo-importance"></span>
          <label class="todo-state">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
            ${todo.completed ? 'Erledigt' : 'Offen'}
          </label>
          <p class="todo-description"></p>
        </div>
        <button class="btn btn--edit btn--default" data-id="${todo.id}">Bearbeiten</button>
      `;

      listItem.querySelector('.todo-date-due').textContent = this.#getRelativeDueDate(todo.dateDue);
      listItem.querySelector('.todo-title').textContent = todo.title;
      listItem.querySelector('.todo-importance').textContent = '⚡'.repeat(Number(todo.importance));
      listItem.querySelector('.todo-description').textContent = todo.description;

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
    if (!isNaN(due)) {
      due.setHours(0, 0, 0, 0);
      const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Heute fällig';
      if (diffDays === 1) return 'in 1 Tag';
      if (diffDays > 1) return `in ${diffDays} Tagen`;
      if (diffDays === -1) return 'vor 1 Tag';
      return `vor ${Math.abs(diffDays)} Tagen`;
    } else {
      return 'Irgendwann';
    }
    
  }
}
