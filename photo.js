(function () {
    var lightbox = document.getElementById("photo-lightbox");
    var lightboxImg = document.getElementById("photo-lightbox-img");
    var lightboxIndex = document.getElementById("photo-lightbox-index");
    var btnPrev = document.getElementById("photo-lightbox-prev");
    var btnNext = document.getElementById("photo-lightbox-next");
    var btnClose = document.getElementById("photo-lightbox-close");
    if (!lightbox || !lightboxImg) return;

    var activeGallery = null;
    var current = 0;

    function render() {
        if (!activeGallery) return;
        lightboxImg.src = activeGallery.sources[current];
        lightboxImg.alt = activeGallery.alts[current];
        if (lightboxIndex) {
            lightboxIndex.textContent = (current + 1) + " / " + activeGallery.sources.length;
        }
    }

    function open() {
        render();
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function close() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        activeGallery = null;
    }

    function step(delta) {
        if (!activeGallery) return;
        var len = activeGallery.sources.length;
        current = (current + delta + len) % len;
        render();
    }

    document.querySelectorAll("[data-photo-gallery]").forEach(function (galleryRoot) {
        var triggers = Array.prototype.slice.call(
            galleryRoot.querySelectorAll("[data-photo-lightbox]")
        );
        if (!triggers.length) return;

        var sources = triggers.map(function (btn) {
            return btn.getAttribute("data-src") || (btn.querySelector("img") && btn.querySelector("img").src);
        });
        var alts = triggers.map(function (btn) {
            var img = btn.querySelector("img");
            return btn.getAttribute("data-alt") || (img && img.alt) || "";
        });

        triggers.forEach(function (btn, index) {
            btn.addEventListener("click", function () {
                activeGallery = { sources: sources, alts: alts };
                current = index;
                open();
            });
        });
    });

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", function () { step(-1); });
    if (btnNext) btnNext.addEventListener("click", function () { step(1); });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
    });
})();
