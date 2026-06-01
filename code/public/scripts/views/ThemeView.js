export default class ThemeView {
    //register click event listener for theme button
    bindThemeToggle(handler) {
        const viewToggle = document.querySelector('#btn-change-theme');
        viewToggle.addEventListener('click', handler);
    }

    //apply selected theme to the document body
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
    }
}