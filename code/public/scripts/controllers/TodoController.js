import Todo from '../models/Todo.js';

export default class TodoController {
  constructor(view, service) {
    this.view = view;
    this.service = service;

    // Events mit Handlern verbinden
    this.view.bindCreateTodo(this.handleOpenDialog.bind(this));
    this.view.bindCloseDialog(this.handleCloseDialog.bind(this));
    this.view.bindSubmitForm(this.handleSubmitForm.bind(this));

    // Gespeicherte Todos beim Start laden
    this.handleRenderTodos();
  }

  handleOpenDialog() {
    this.view.openCreateDialog();
  }

  handleCloseDialog() {
    this.view.closeDialog();
  }

  // Neues Todo aus Formulardaten erstellen, speichern und Liste aktualisieren
  handleSubmitForm(formData) {
    const newTodo = new Todo(
      formData.title,
      formData.dateDue,
      formData.importance,
      formData.description,
      formData.completed
    );
    this.service.saveTodo(newTodo);
    this.view.closeDialog();
    this.handleRenderTodos();
  }

  handleRenderTodos() {
    const todos = this.service.getAllTodos();
    this.view.renderTodos(todos);
  }
}
