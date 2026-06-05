export default class TodoService {

  constructor() {
    this.todos = this.getAllTodos();
  }

  getAllTodos() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  saveTodo(todo) {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodoById(id) {
    return this.getAllTodos().find(todo => todo.id === id);
  }

  updateTodo(id, data) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...data };
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  deleteTodo(id) {
    const filteredTodos = this.todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  }
}
