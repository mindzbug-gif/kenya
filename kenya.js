document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       1. VERTICAL INFINITE SLIDER
       ========================================================= */

    function createVerticalInfiniteSlider(trackId, direction = "up", speed = 0.5) {

        const track = document.getElementById(trackId);

        if (!track) return;

        // Duplicate content
        track.innerHTML += track.innerHTML;

        let position = direction === "up"
            ? 0
            : track.scrollHeight / 2;

        function animate() {

            if (direction === "up") {

                position += speed;

                if (position >= track.scrollHeight / 2) {
                    position = 0;
                }

            } else {

                position -= speed;

                if (position <= 0) {
                    position = track.scrollHeight / 2;
                }

            }

            track.style.transform = `translateY(-${position}px)`;

            requestAnimationFrame(animate);
        }

        animate();
    }


    // Left column - UP
    createVerticalInfiniteSlider("track1", "up", 0.6);

    // Right column - DOWN
    createVerticalInfiniteSlider("track2", "down", 0.6);


    /* =========================================================
       2. MONTHLY / YEARLY PRICING TOGGLE
       ========================================================= */

    const buttons = document.querySelectorAll(".toggle-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            // Remove active class
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Add active class
            button.classList.add("active");

            const plan = button.dataset.plan;

            document.querySelectorAll(".price").forEach(priceBox => {

                const monthly = priceBox.dataset.monthly;
                const yearly = priceBox.dataset.yearly;

                const priceSpan =
                    priceBox.querySelector(".price-value span");

                const del =
                    priceBox.querySelector("del");

                const small =
                    priceBox.querySelector("small");

                if (!priceSpan || !del || !small) return;


                // Monthly
                if (plan === "monthly") {

                    del.style.display = "none";

                    priceSpan.textContent = monthly;

                    small.textContent =
                        "Price/Org/Month";

                }

                // Yearly
                else {

                    del.style.display = "inline";

                    del.textContent = "KSh" + monthly;

                    priceSpan.textContent = yearly;

                    small.textContent =
                        "Price/Org/Month Billed Annually";
                }

            });

        });

    });


    /* =========================================================
       3. HORIZONTAL INFINITE SLIDER
       ========================================================= */

    function createHorizontalInfiniteSlider(
        selector,
        direction = "left",
        speed = 0.6
    ) {

        document.querySelectorAll(selector).forEach(track => {

            // Duplicate content
            track.innerHTML += track.innerHTML;

            let position = direction === "left"
                ? 0
                : track.scrollWidth / 2;


            function animate() {

                if (direction === "left") {

                    position += speed;

                    if (position >= track.scrollWidth / 2) {
                        position = 0;
                    }

                } else {

                    position -= speed;

                    if (position <= 0) {
                        position = track.scrollWidth / 2;
                    }

                }

                track.style.transform =
                    `translateX(-${position}px)`;

                requestAnimationFrame(animate);
            }

            animate();

        });
    }


    // Left moving sliders
    createHorizontalInfiniteSlider(
        ".slider-left",
        "left",
        0.6
    );


    // Right moving sliders
    createHorizontalInfiniteSlider(
        ".slider-right",
        "right",
        0.6
    );


    /* =========================================================
       4. TESTIMONIAL SCROLL CHANGE
       ========================================================= */

    const section =
        document.getElementById("testimonialSection");

    const items =
        document.querySelectorAll(".testimonial-item");


    // Run only if testimonial section exists
    if (section && items.length >= 2) {

        let changed = false;

        window.addEventListener("scroll", function () {

            const rect =
                section.getBoundingClientRect();


            // Scroll Down
            if (
                rect.top < window.innerHeight * 0.3 &&
                !changed
            ) {

                items[0].classList.remove("active");
                items[1].classList.add("active");

                changed = true;
            }


            // Scroll Up
            if (
                rect.top > window.innerHeight * 0.3 &&
                changed
            ) {

                items[1].classList.remove("active");
                items[0].classList.add("active");

                changed = false;
            }

        });

    }

});

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       TOP TAB SWITCH
       IT SERVICES / DIGITAL MARKETING
    ========================================= */

    window.switchTopTab = function (type, button) {

        // Remove active from top buttons
        document.querySelectorAll(".top-tab-btn").forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        if (button) {
            button.classList.add("active");
        }

        // Hide all sidebar sections
        document.querySelectorAll(".sidebar-section").forEach(function (section) {
            section.classList.remove("active");
        });

        // Show selected sidebar
        const sidebar = document.getElementById("sidebar-" + type);

        if (sidebar) {
            sidebar.classList.add("active");
        }

        // Hide all content panes
        document.querySelectorAll(".tab-pane").forEach(function (pane) {
            pane.classList.remove("active");
        });

        // Remove active from all sidebar buttons
        document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Activate first button and corresponding pane
        if (sidebar) {

            const firstButton = sidebar.querySelector(".sidebar-btn");

            if (firstButton) {

                firstButton.classList.add("active");

                const onclickValue = firstButton.getAttribute("onclick");

                if (onclickValue) {

                    const match = onclickValue.match(
                        /switchTab\(['"]([^'"]+)['"]/
                    );

                    if (match && match[1]) {
                        const firstPane = document.getElementById(match[1]);

                        if (firstPane) {
                            firstPane.classList.add("active");

                            // Reset horizontal scroll
                            const scrollBox = firstPane.querySelector(".cards-scroll");

                            if (scrollBox) {
                                scrollBox.scrollLeft = 0;
                                updateScrollbar(scrollBox);
                            }
                        }
                    }
                }
            }
        }
    };


    /* =========================================
       SIDEBAR TAB SWITCH
    ========================================= */

    window.switchTab = function (tabId, button) {

        // Hide all content panes
        document.querySelectorAll(".tab-pane").forEach(function (pane) {
            pane.classList.remove("active");
        });

        // Remove active from ALL sidebar buttons
        document.querySelectorAll(".sidebar-btn").forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Activate clicked sidebar button
        if (button) {
            button.classList.add("active");
        }

        // Show selected content pane
        const selectedPane = document.getElementById(tabId);

        if (selectedPane) {

            selectedPane.classList.add("active");

            // Reset scroll position
            const scrollBox = selectedPane.querySelector(".cards-scroll");

            if (scrollBox) {
                scrollBox.scrollLeft = 0;

                // Update custom scrollbar after pane becomes visible
                setTimeout(function () {
                    updateScrollbar(scrollBox);
                }, 50);
            }
        }
    };


    /* =========================================
       CUSTOM ORANGE SCROLLBAR
    ========================================= */

    window.syncScrollbar = function (scrollBox) {
        updateScrollbar(scrollBox);
    };


    function updateScrollbar(scrollBox) {

        if (!scrollBox) {
            return;
        }

        const wrapper = scrollBox.closest(".cards-scroll-wrapper");

        if (!wrapper) {
            return;
        }

        const scrollbar = wrapper.querySelector(".orange-scrollbar");
        const thumb = wrapper.querySelector(".orange-scrollbar-thumb");

        if (!scrollbar || !thumb) {
            return;
        }

        const scrollWidth = scrollBox.scrollWidth;
        const clientWidth = scrollBox.clientWidth;
        const scrollLeft = scrollBox.scrollLeft;

        // No horizontal overflow
        if (scrollWidth <= clientWidth) {

            scrollbar.style.display = "none";

            return;
        }

        scrollbar.style.display = "block";

        // Calculate thumb width
        const scrollbarWidth = scrollbar.clientWidth;

        let thumbWidth =
            (clientWidth / scrollWidth) * scrollbarWidth;

        // Minimum thumb width
        thumbWidth = Math.max(thumbWidth, 40);

        thumb.style.width = thumbWidth + "px";

        // Maximum possible thumb movement
        const maxThumbMove =
            scrollbarWidth - thumbWidth;

        const maxScroll =
            scrollWidth - clientWidth;

        const scrollPercentage =
            maxScroll > 0
                ? scrollLeft / maxScroll
                : 0;

        const thumbPosition =
            scrollPercentage * maxThumbMove;

        thumb.style.transform =
            "translateX(" + thumbPosition + "px)";
    }


    /* =========================================
       INITIALIZE SCROLLBARS
    ========================================= */

    function initializeScrollbars() {

        document.querySelectorAll(".cards-scroll").forEach(function (scrollBox) {

            updateScrollbar(scrollBox);

            scrollBox.addEventListener("scroll", function () {
                updateScrollbar(scrollBox);
            });
        });
    }


    /* =========================================
       RESIZE HANDLER
    ========================================= */

    window.addEventListener("resize", function () {

        document.querySelectorAll(".cards-scroll").forEach(function (scrollBox) {
            updateScrollbar(scrollBox);
        });

    });


    /* =========================================
       DRAG CUSTOM SCROLLBAR
    ========================================= */

    document.querySelectorAll(".orange-scrollbar").forEach(function (scrollbar) {

        const thumb =
            scrollbar.querySelector(".orange-scrollbar-thumb");

        if (!thumb) {
            return;
        }

        let isDragging = false;
        let startX = 0;
        let startLeft = 0;

        thumb.addEventListener("mousedown", function (e) {

            e.preventDefault();

            isDragging = true;

            startX = e.clientX;

            startLeft =
                thumb.getBoundingClientRect().left -
                scrollbar.getBoundingClientRect().left;

            document.body.style.userSelect = "none";
        });


        document.addEventListener("mousemove", function (e) {

            if (!isDragging) {
                return;
            }

            const wrapper =
                scrollbar.closest(".cards-scroll-wrapper");

            if (!wrapper) {
                return;
            }

            const scrollBox =
                wrapper.querySelector(".cards-scroll");

            if (!scrollBox) {
                return;
            }

            const scrollbarWidth =
                scrollbar.clientWidth;

            const thumbWidth =
                thumb.offsetWidth;

            const maxLeft =
                scrollbarWidth - thumbWidth;

            let newLeft =
                startLeft + (e.clientX - startX);

            // Keep thumb inside scrollbar
            newLeft = Math.max(
                0,
                Math.min(newLeft, maxLeft)
            );

            const percentage =
                maxLeft > 0
                    ? newLeft / maxLeft
                    : 0;

            const maxScroll =
                scrollBox.scrollWidth -
                scrollBox.clientWidth;

            scrollBox.scrollLeft =
                percentage * maxScroll;

            thumb.style.transform =
                "translateX(" + newLeft + "px)";
        });


        document.addEventListener("mouseup", function () {

            if (isDragging) {

                isDragging = false;

                document.body.style.userSelect = "";
            }

        });

    });


    /* =========================================
       CLICK ON SCROLLBAR TRACK
    ========================================= */

    document.querySelectorAll(".orange-scrollbar").forEach(function (scrollbar) {

        scrollbar.addEventListener("click", function (e) {

            // Don't trigger when clicking the thumb
            if (
                e.target.classList.contains(
                    "orange-scrollbar-thumb"
                )
            ) {
                return;
            }

            const wrapper =
                scrollbar.closest(".cards-scroll-wrapper");

            if (!wrapper) {
                return;
            }

            const scrollBox =
                wrapper.querySelector(".cards-scroll");

            const thumb =
                scrollbar.querySelector(
                    ".orange-scrollbar-thumb"
                );

            if (!scrollBox || !thumb) {
                return;
            }

            const rect =
                scrollbar.getBoundingClientRect();

            const clickPosition =
                e.clientX - rect.left;

            const thumbWidth =
                thumb.offsetWidth;

            const maxThumbMove =
                scrollbar.clientWidth -
                thumbWidth;

            let thumbPosition =
                clickPosition -
                thumbWidth / 2;

            thumbPosition = Math.max(
                0,
                Math.min(
                    thumbPosition,
                    maxThumbMove
                )
            );

            const percentage =
                maxThumbMove > 0
                    ? thumbPosition / maxThumbMove
                    : 0;

            const maxScroll =
                scrollBox.scrollWidth -
                scrollBox.clientWidth;

            scrollBox.scrollLeft =
                percentage * maxScroll;

            updateScrollbar(scrollBox);
        });

    });


    /* =========================================
       INITIAL LOAD
    ========================================= */

    initializeScrollbars();


    /* =========================================
       FIX INITIAL ACTIVE TAB
    ========================================= */

    const activeTopButton =
        document.querySelector(".top-tab-btn.active");

    if (activeTopButton) {

        const onclickValue =
            activeTopButton.getAttribute("onclick");

        if (onclickValue) {

            const match =
                onclickValue.match(
                    /switchTopTab\(['"]([^'"]+)['"]/
                );

            if (match && match[1]) {

                const type = match[1];

                // Ensure correct sidebar is visible
                document.querySelectorAll(".sidebar-section")
                    .forEach(function (section) {
                        section.classList.remove("active");
                    });

                const sidebar =
                    document.getElementById(
                        "sidebar-" + type
                    );

                if (sidebar) {
                    sidebar.classList.add("active");
                }
            }
        }
    }

});