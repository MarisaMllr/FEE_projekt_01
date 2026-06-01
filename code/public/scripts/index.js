import ThemeView from "./views/ThemeView.js";
import ThemeService from "./services/ThemeService.js";
import ThemeController from "./controllers/ThemeController.js";

// Create components
const view = new ThemeView();
const service = new ThemeService();

// Start app
new ThemeController(view, service);