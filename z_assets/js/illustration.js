(function () {
    var grid = document.querySelector('.illustration-grid');
    var filters = document.querySelector('.illus-filters');
    var statusEl = document.getElementById('illus-filter-status');
    if (!grid || !filters) return;

    var themeLabels = {
        all: '全部',
        animal: '動物',
        food: '食物',
        holiday: '節日賀卡',
        character: '人物',
        scene: '氛圍場景'
    };

    var items = Array.prototype.slice.call(grid.querySelectorAll('.illus-item'));

    items.forEach(function (item) {
        var img = item.querySelector('img');
        if (!img) return;
        var src = img.getAttribute('src') || '';
        var fileName = src.split('/').pop().replace(/\.[^/.]+$/, '');
        if (!img.alt || img.alt === '作品名稱') {
            img.alt = fileName;
        }
    });

    function setActiveFilter(theme) {
        filters.querySelectorAll('.illus-filter').forEach(function (btn) {
            var on = btn.getAttribute('data-theme') === theme;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }

    function applyFilter(theme) {
        var visible = 0;
        items.forEach(function (item) {
            var match = theme === 'all' || item.getAttribute('data-theme') === theme;
            item.classList.toggle('is-filtered-out', !match);
            item.hidden = !match;
            if (match) visible += 1;
        });

        if (statusEl) {
            if (theme === 'all') {
                statusEl.textContent = '共 ' + items.length + ' 件作品';
            } else if (visible === 0) {
                statusEl.textContent = '「' + themeLabels[theme] + '」目前沒有作品，請選其他主題。';
            } else {
                statusEl.textContent = '「' + themeLabels[theme] + '」' + visible + ' 件';
            }
        }

        setActiveFilter(theme);
    }

    filters.addEventListener('click', function (e) {
        var btn = e.target.closest('.illus-filter');
        if (!btn) return;
        var theme = btn.getAttribute('data-theme');
        applyFilter(theme);
        if (theme === 'all') {
            history.replaceState(null, '', location.pathname);
        } else {
            history.replaceState(null, '', '#' + theme);
        }
    });

    function filterFromHash() {
        var initial = (location.hash || '').replace(/^#/, '');
        applyFilter(themeLabels[initial] ? initial : 'all');
    }

    window.addEventListener('hashchange', filterFromHash);
    filterFromHash();
})();
