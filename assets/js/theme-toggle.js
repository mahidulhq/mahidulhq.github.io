(function () {
  var modes = ['light', 'dark', 'auto'];
  var icons = { light: '🌙', dark: '☀️', auto: '🌗' };

  function getTheme() {
    return localStorage.getItem('theme') || 'auto';
  }

  function applyTheme(theme) {
    document.body.setAttribute('a', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = icons[theme];
  }

  function cycleTheme() {
    var current = getTheme();
    var idx = modes.indexOf(current);
    var next = modes[(idx + 1) % modes.length];
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getTheme());
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', cycleTheme);
  });
})();
