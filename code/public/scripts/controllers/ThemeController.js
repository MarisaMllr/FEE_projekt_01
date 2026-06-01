export default class ThemeController {
    constructor(themeView, themeService) {
        this.themeView = themeView;
        this.themeService = themeService;

        //load saved theme
        const savedTheme = this.themeService.loadTheme();
        this.themeView.setTheme(savedTheme);

        //bind theme toggle event
        this.themeView.bindThemeToggle(this.handleThemeToggle.bind(this));
    }

    handleThemeToggle() {
        const currentTheme = this.themeService.loadTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.themeService.saveTheme(newTheme);
        this.themeView.setTheme(newTheme);
    }
}