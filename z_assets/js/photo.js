(function () {
    var lightbox = document.getElementById("photo-lightbox");
    var lightboxImg = document.getElementById("photo-lightbox-img");
    var lightboxIndex = document.getElementById("photo-lightbox-index");
    var btnPrev = document.getElementById("photo-lightbox-prev");
    var btnNext = document.getElementById("photo-lightbox-next");
    var btnClose = document.getElementById("photo-lightbox-close");
    if (!lightbox || !lightboxImg) return;

    var content = lightbox.querySelector(".photo-lightbox__content");
    var stage = lightbox.querySelector(".photo-lightbox__stage");

    if (!stage && content) {
        stage = document.createElement("div");
        stage.className = "photo-lightbox__stage";
        content.insertBefore(stage, lightboxImg);
        stage.appendChild(lightboxImg);
    }

    if (content && !lightbox.querySelector(".photo-lightbox__toolbar")) {
        var toolbar = document.createElement("div");
        toolbar.className = "photo-lightbox__toolbar";
        toolbar.innerHTML =
            '<button type="button" id="photo-lightbox-zoom-out" aria-label="縮小">−</button>' +
            '<button type="button" id="photo-lightbox-zoom-reset" aria-label="重設縮放">100%</button>' +
            '<button type="button" id="photo-lightbox-zoom-in" aria-label="放大">+</button>' +
            '<span class="photo-lightbox__zoom-hint">長圖可捲動 · Ctrl＋滾輪縮放 · 拖曳平移 · 雙擊重設</span>';
        content.appendChild(toolbar);
    }

    var btnZoomIn = document.getElementById("photo-lightbox-zoom-in");
    var btnZoomOut = document.getElementById("photo-lightbox-zoom-out");
    var btnZoomReset = document.getElementById("photo-lightbox-zoom-reset");

    if (lightboxIndex) lightboxIndex.hidden = true;

    var activeGallery = null;
    var current = 0;
    var scale = 1;
    var panX = 0;
    var panY = 0;
    var dragging = false;
    var dragStartX = 0;
    var dragStartY = 0;
    var panStartX = 0;
    var panStartY = 0;

    var MIN_SCALE = 0.5;
    var MAX_SCALE = 4;
    var SCALE_STEP = 0.25;
    var TALL_RATIO = 1.4;

    function updateScaleLabel() {
        if (btnZoomReset) btnZoomReset.textContent = Math.round(scale * 100) + "%";
        if (btnZoomIn) btnZoomIn.disabled = scale >= MAX_SCALE;
        if (btnZoomOut) btnZoomOut.disabled = scale <= MIN_SCALE;
    }

    function applyTransform() {
        lightboxImg.style.transform =
            "translate(" + panX + "px, " + panY + "px) scale(" + scale + ")";
        if (stage) {
            stage.classList.toggle("is-zoomed", scale > 1.02);
        }
        updateScaleLabel();
    }

    function resetZoom() {
        scale = 1;
        panX = 0;
        panY = 0;
        applyTransform();
    }

    function setScale(next) {
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
        applyTransform();
    }

    function updateLayoutMode() {
        if (!stage || !lightboxImg.naturalWidth) return;
        var ratio = lightboxImg.naturalHeight / lightboxImg.naturalWidth;
        stage.classList.toggle("is-tall", ratio >= TALL_RATIO);
    }

    function updateNavVisibility() {
        var single = !activeGallery || activeGallery.sources.length <= 1;
        if (btnPrev) btnPrev.hidden = single;
        if (btnNext) btnNext.hidden = single;
    }

    function render() {
        if (!activeGallery) return;
        resetZoom();
        lightboxImg.onload = updateLayoutMode;
        lightboxImg.src = activeGallery.sources[current];
        lightboxImg.alt = activeGallery.alts[current];
        updateNavVisibility();
        if (lightboxImg.complete && lightboxImg.naturalWidth) {
            updateLayoutMode();
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
        resetZoom();
        if (stage) stage.classList.remove("is-tall", "is-zoomed", "is-dragging");
    }

    function step(delta) {
        if (!activeGallery || activeGallery.sources.length <= 1) return;
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

        function openAt(index) {
            activeGallery = { sources: sources, alts: alts };
            current = index;
            open();
        }

        triggers.forEach(function (btn, index) {
            btn.addEventListener("click", function () {
                openAt(index);
            });
        });

        galleryRoot.querySelectorAll("[data-photo-cover]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                openAt(0);
            });
        });

        var caseRoot = galleryRoot.closest(".uiux-case");
        if (caseRoot) {
            caseRoot.querySelectorAll("[data-photo-open]").forEach(function (btn) {
                btn.addEventListener("click", function () {
                    openAt(0);
                });
            });
        }
    });

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
    if (btnNext) btnNext.addEventListener("click", function (e) { e.stopPropagation(); step(1); });

    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            setScale(scale + SCALE_STEP);
        });
    }
    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            setScale(scale - SCALE_STEP);
        });
    }
    if (btnZoomReset) {
        btnZoomReset.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            resetZoom();
        });
    }

    if (stage) {
        stage.addEventListener("wheel", function (e) {
            if (!lightbox.classList.contains("open")) return;
            var zoomIntent = e.ctrlKey || e.metaKey || scale > 1.02 || !stage.classList.contains("is-tall");
            if (!zoomIntent) return;
            e.preventDefault();
            setScale(scale + (e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP));
        }, { passive: false });

        stage.addEventListener("mousedown", function (e) {
            if (e.button !== 0 || scale <= 1) return;
            dragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            panStartX = panX;
            panStartY = panY;
            stage.classList.add("is-dragging");
        });

        stage.addEventListener("dblclick", function (e) {
            e.preventDefault();
            resetZoom();
        });
    }

    document.addEventListener("mousemove", function (e) {
        if (!dragging) return;
        panX = panStartX + (e.clientX - dragStartX);
        panY = panStartY + (e.clientY - dragStartY);
        applyTransform();
    });

    document.addEventListener("mouseup", function () {
        dragging = false;
        if (stage) stage.classList.remove("is-dragging");
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
        if (e.key === "+" || e.key === "=") setScale(scale + SCALE_STEP);
        if (e.key === "-") setScale(scale - SCALE_STEP);
        if (e.key === "0") resetZoom();
    });

    updateScaleLabel();
})();
