export default class TodoService {

  getAllTodos() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  saveTodo(todo) {
    const todos = this.getAllTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodoById(id) {
    return this.getAllTodos().find(todo => todo.id === id);
  }

  updateTodo(id, data) {
    const todos = this.getAllTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...data };
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  deleteTodo(id) {
    const todos = this.getAllTodos();
    const filtered = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(filtered));
  }
}