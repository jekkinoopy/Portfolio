(function () {
    var shell = document.querySelector('.nav-shell');
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
