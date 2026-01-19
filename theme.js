(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    const html = document.documentElement;

    if (html.classList.contains('dark-theme')) {
        body.classList.add('dark-theme');
    }

    // тема
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        if (themeIcon) themeIcon.src = '1/Moon2.png';
    } else {
        if (themeIcon) themeIcon.src = '1/Moon1.png';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            html.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.src = '1/Moon2.png';
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.src = '1/Moon1.png';
            }
        });
    }
});