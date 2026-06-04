import Todo from '../models/Todo.js';

export default class TodoController {
  constructor(view, service) {
    this.view = view;
    this.service = service;

    this.view.bindCreateTodo(this.handleOpenDialog.bind(this));
    this.view.bindCloseDialog(this.handleCloseDialog.bind(this));
    this.view.bindEditTodo(this.handleEditTodo.bind(this));
    this.view.bindSubmitForm(this.handleSubmitForm.bind(this));

    // load persisted todos on init
    this.handleRenderTodos();
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
    }
    if (formData.action === 'create-overview') {
      this.view.closeDialog();
    } 
    this.handleRenderTodos();
  }

  handleRenderTodos() {
    const todos = this.service.getAllTodos();
    this.view.renderTodos(todos);
  }
}
