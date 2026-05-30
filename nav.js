(function () {
    var shell = document.querySelector('.nav-shell');

    /*
     * 主導覽：預設中文；hover 換英文（寬度用 --nav-w，依英文長度設定，改 NAV_LABELS 即可）
     */
    if (shell) {
        var NAV_LABELS = [
            { match: /about\.html/i, zh: '關於', en: 'About', width: '5.25em' },
            { match: /graphic\.html/i, zh: '平面', en: 'Graphic', width: '6.5em' },
            { match: /illustration\.html/i, zh: '插畫', en: 'Illustration', width: '9em' },
            { match: /photo\.html/i, zh: '攝影', en: 'Photo', width: '5.25em' },
            { match: /uiux\.html/i, zh: '介面', en: 'UI/UX', width: '5.75em' },
            { match: /web\.html/i, zh: '網頁', en: 'Web', width: '3.75em' }
        ];

        shell.querySelectorAll('.nav-links--start > li > a, .nav-links--end > li > a').forEach(function (link) {
            var href = link.getAttribute('href') || '';
            for (var i = 0; i < NAV_LABELS.length; i++) {
                if (NAV_LABELS[i].match.test(href)) {
                    applyBilingualNavLink(link, NAV_LABELS[i]);
                    break;
                }
            }
        });
    }

    function applyBilingualNavLink(link, labels) {
        if (link.classList.contains('nav-link-bi')) return;
        link.classList.add('nav-link-bi');
        link.style.setProperty('--nav-w', labels.width);
        link.innerHTML =
            '<span class="nav-link-bi__zh">' + labels.zh + '</span>' +
            '<span class="nav-link-bi__en" aria-hidden="true">' + labels.en + '</span>';
        link.setAttribute('title', labels.en);
        link.setAttribute('aria-label', labels.zh + '（' + labels.en + '）');
    }

    var toggle = document.querySelector('.nav-toggle');
    if (!shell || !toggle) return;

    function setOpen(open) {
        shell.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
        document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
        setOpen(!shell.classList.contains('is-open'));
    });

    shell.querySelectorAll('.nav-menu a[href]').forEach(function (link) {
        if (link.closest('.downDisabled')) return;
        link.addEventListener('click', function () {
            setOpen(false);
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1400) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
})();
