(function () {
    var grid = document.querySelector('.illustration-grid');
    var filters = document.querySelector('.illus-filters');
    if (!grid || !filters) return;

    var themeLabels = {
        all: '全部',
        animal: '動物',
        food: '食物',
        holiday: '節日賀卡',
        character: '人物',
        ip: 'IP 角色',
        humanities: '社會人文',
        leisure: '休閒',
        scene: '自然',
        other: '其它'
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

    function staggerColumns() {
        return window.matchMedia('(min-width: 992px)').matches ? 3 : 2;
    }

    function applyStagger() {
        var cols = staggerColumns();
        items.forEach(function (item) {
            item.classList.remove('illus-item--stagger');
        });
        var visible = items.filter(function (item) {
            return !item.classList.contains('is-filtered-out');
        });
        visible.forEach(function (item, index) {
            if (index % cols === 1) {
                item.classList.add('illus-item--stagger');
            }
        });
    }

    function applyFilter(theme) {
        items.forEach(function (item) {
            var itemTheme = (item.getAttribute('data-theme') || '').trim();
            var match = theme === 'all' || itemTheme === theme;
            item.classList.toggle('is-filtered-out', !match);
            item.setAttribute('aria-hidden', match ? 'false' : 'true');
        });

        setActiveFilter(theme);
        applyStagger();
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
    window.addEventListener('resize', function () {
        applyStagger();
    });
    filterFromHash();
})();
