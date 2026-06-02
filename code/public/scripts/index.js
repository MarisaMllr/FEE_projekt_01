import ThemeView from "./views/ThemeView.js";
import ThemeService from "./services/ThemeService.js";
import ThemeController from "./controllers/ThemeController.js";
import TodoView from "./views/TodoView.js";
import TodoController from "./controllers/TodoController.js";
import TodoService from "./services/TodoService.js";

//create components for todo
const todoView = new TodoView();
const todoService = new TodoService();

// Create components for theme
const themeView = new ThemeView();
const themeService = new ThemeService();

// Start app
new ThemeController(themeView, themeService);
new TodoController(todoView, todoService);