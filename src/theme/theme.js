(function theme() {
    var html = document.querySelector('html');
    var body = document.querySelector('body');
    var themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    var stylesheets = {
        ayuHighlight: document.querySelector("[href$='ayu-highlight.css']"),
        tomorrowNight: document.querySelector("[href$='tomorrow-night.css']"),
        highlight: document.querySelector("[href$='highlight.css']"),
    };

    window.getConfig = function(name, fallback) {
        var raw;
        try {
            raw = localStorage.getItem(name);
            if (raw.startsWith('"') && raw.endsWith('"')) {
                raw = raw.slice(1, raw.length - 1);
            }
        } catch (e) {}
        if (raw === null || raw === undefined) {
            try { localStorage.setItem(name, fallback); } catch(e) {}
            return fallback;
        } else {
            return raw;
        }
    }

    window.getTheme = function() {
        return getConfig('mdbook-theme', default_theme);
    }

    window.setTheme = function(theme) {
        let ace_theme;

        if (theme == 'coal' || theme == 'navy') {
            stylesheets.ayuHighlight.disabled = true;
            stylesheets.tomorrowNight.disabled = false;
            stylesheets.highlight.disabled = true;

            ace_theme = "ace/theme/tomorrow_night";
        } else if (theme == 'ayu') {
            stylesheets.ayuHighlight.disabled = false;
            stylesheets.tomorrowNight.disabled = true;
            stylesheets.highlight.disabled = true;

            ace_theme = "ace/theme/tomorrow_night";
        } else {
            stylesheets.ayuHighlight.disabled = true;
            stylesheets.tomorrowNight.disabled = true;
            stylesheets.highlight.disabled = false;

            ace_theme = "ace/theme/dawn";
        }

        setTimeout(function () {
            themeColorMetaTag.content = getComputedStyle(document.body).backgroundColor;
        }, 1);

        if (window.ace && window.editors) {
            window.editors.forEach(function (editor) {
                editor.setTheme(ace_theme);
            });
        }

        body.className = theme;
    }

    setTheme(getTheme());
    html.className = 'js sidebar-' + getConfig('mdbook-sidebar', 'visible');
})();
