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

    var frame = lightbox.querySelector(".photo-lightbox__frame");
    if (stage && !frame) {
        frame = document.createElement("div");
        frame.className = "photo-lightbox__frame";
        stage.appendChild(frame);
        frame.appendChild(lightboxImg);
    } else if (!frame && stage) {
        frame = stage;
    }

    if (content && !lightbox.querySelector(".photo-lightbox__toolbar")) {
        var toolbar = document.createElement("div");
        toolbar.className = "photo-lightbox__toolbar";
        toolbar.innerHTML =
            '<button type="button" id="photo-lightbox-zoom-out" aria-label="縮小">−</button>' +
            '<button type="button" id="photo-lightbox-zoom-reset" aria-label="重設縮放">100%</button>' +
            '<button type="button" id="photo-lightbox-zoom-in" aria-label="放大">+</button>';
        content.appendChild(toolbar);
    }

    var btnZoomIn = document.getElementById("photo-lightbox-zoom-in");
    var btnZoomOut = document.getElementById("photo-lightbox-zoom-out");
    var btnZoomReset = document.getElementById("photo-lightbox-zoom-reset");

    if (lightboxIndex) lightboxIndex.hidden = true;

    var activeGallery = null;
    var current = 0;
    var scale = 1;

    var MIN_SCALE = 0.5;
    var MAX_SCALE = 1.25;
    var SCALE_STEP = 0.25;
    var TALL_RATIO = 1.4;

    function updateScaleLabel() {
        if (btnZoomReset) btnZoomReset.textContent = Math.round(scale * 100) + "%";
        if (btnZoomIn) btnZoomIn.disabled = scale >= MAX_SCALE;
        if (btnZoomOut) btnZoomOut.disabled = scale <= MIN_SCALE;
    }

    function applyZoom() {
        if (frame) frame.style.zoom = scale;
        else lightboxImg.style.zoom = scale;
        updateScaleLabel();
    }

    function resetZoom() {
        scale = 1;
        applyZoom();
    }

    function setScale(next) {
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
        applyZoom();
    }

    function onImageReady() {
        if (!lightboxImg.naturalWidth || !stage) return;
        var ratio = lightboxImg.naturalHeight / lightboxImg.naturalWidth;
        stage.classList.toggle("is-tall", ratio >= TALL_RATIO);
        resetZoom();
    }

    function updateNavVisibility() {
        var single = !activeGallery || activeGallery.sources.length <= 1;
        if (btnPrev) btnPrev.hidden = single;
        if (btnNext) btnNext.hidden = single;
    }

    function render() {
        if (!activeGallery) return;
        scale = 1;
        if (frame) frame.style.zoom = 1;
        else lightboxImg.style.zoom = 1;
        lightboxImg.onload = onImageReady;
        lightboxImg.src = activeGallery.sources[current];
        lightboxImg.alt = activeGallery.alts[current];
        updateNavVisibility();
        if (lightboxImg.complete && lightboxImg.naturalWidth) {
            onImageReady();
        }
    }

    function open() {
        render();
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        requestAnimationFrame(onImageReady);
    }

    function close() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        activeGallery = null;
        scale = 1;
        if (frame) frame.style.zoom = 1;
        else lightboxImg.style.zoom = 1;
        if (stage) stage.classList.remove("is-tall");
        updateScaleLabel();
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
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            setScale(scale + (e.deltaY < 0 ? SCALE_STEP : -SCALE_STEP));
        }, { passive: false });
    }

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
})();
