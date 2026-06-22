export default class ThemeService {
    //load saved theme mode or detect system preference
    loadTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    //save selected theme mode
    saveTheme(theme) {
        localStorage.setItem("theme", theme);
    }
}
