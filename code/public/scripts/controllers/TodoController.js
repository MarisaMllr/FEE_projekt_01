import Todo from '../models/Todo.js';

export default class TodoController {
  constructor(view, service) {
    this.view = view;
    this.service = service;

    this.sortDirection = 1;
    this.currentSort = null;

    this.filterActive = false;

    const savedSort = localStorage.getItem('sortOption') || 'title';
    const savedDirection = Number(localStorage.getItem('sortDirection')) || 1;
    this.sortDirection = savedDirection;
    this.handleSortTodos(savedSort);

    this.view.bindCreateTodo(this.handleOpenDialog.bind(this));
    this.view.bindCloseDialog(this.handleCloseDialog.bind(this));
    this.view.bindEditTodo(this.handleEditTodo.bind(this));
    this.view.bindSubmitForm(this.handleSubmitForm.bind(this));
    this.view.bindSortTodos(this.handleSortTodos.bind(this));
    this.view.bindFilterTodos(this.handleFilterTodos.bind(this));

    // load persisted todos on init
    this.handleRenderTodos();
  }

  handleFilterTodos() {
    this.filterActive = !this.filterActive;
    this.view.setFilterButton(this.filterActive);
    this.applyFilterAndSort();
  }

  handleSortTodos(sort) {
    if (this.currentSort === sort) {
      this.sortDirection *= -1;
    } else {
      this.sortDirection = 1;
    }
    this.currentSort = sort;

    localStorage.setItem('sortOption', sort);
    localStorage.setItem('sortDirection', this.sortDirection);

    this.view.setActiveSortButton(sort, this.sortDirection);
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    let todos = this.service.getAllTodos();

    // Filter
    if (this.filterActive) {
      todos = todos.filter(todo => !todo.completed);
    }

    // Sortierung
    if (this.currentSort) {
      todos = [...todos].sort((a, b) => {
        const valA = a[this.currentSort];
        const valB = b[this.currentSort];

        if (this.currentSort === 'dateDue' || this.currentSort === 'dateCreated') {
          const dateA = new Date(valA);
          const dateB = new Date(valB);
          
          if (isNaN(dateA)) return 1;
          if (isNaN(dateB)) return -1;
          
          return (dateA - dateB) * this.sortDirection;
        }

        if (!isNaN(valA)) {
          return (Number(valA) - Number(valB)) * this.sortDirection;
        }
        
        return valA.localeCompare(valB) * this.sortDirection;
      });
    }

    this.view.renderTodos(todos);
  }

  handleOpenDialog() {
    this.view.openCreateDialog();
  }

  handleEditTodo(id) {
    const todo = this.service.getTodoById(id);
    this.view.openEditDialog(todo);
  }

  handleCloseDialog(event) {
    event.preventDefault();
    this.view.closeDialog();
  }

  handleSubmitForm(formData) {
    if (formData.editingId) {
      this.service.updateTodo(formData.editingId, {
        title: formData.title,
        dateDue: formData.dateDue,
        importance: formData.importance,
        description: formData.description,
        completed: formData.completed,
      });
    } else {
      const newTodo = new Todo(
        formData.title,
        formData.dateDue,
        formData.importance,
        formData.description,
        formData.completed
      );
      this.service.saveTodo(newTodo);
      this.view.setEditingId(newTodo.id);
    }
    if (formData.action === 'create-overview') {
      this.view.closeDialog();
    } 
    this.handleRenderTodos();
  }

  handleRenderTodos(sort) {
    const todos = this.service.getAllTodos();
    this.view.renderTodos(todos, sort);
  }
}
