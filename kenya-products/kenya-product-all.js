document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       STATS COUNTER
    ============================== */

    const stats = document.querySelectorAll(".stat h2");
    const statsBox = document.querySelector(".stats-box");

    if (stats.length && statsBox) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    stats.forEach(stat => {

                        const originalText = stat.innerText;

                        const target =
                            parseInt(originalText.replace(/[^0-9]/g, "")) || 100;

                        const hasPercentage = originalText.includes("%");

                        let count = 0;

                        const interval = setInterval(() => {

                            count += Math.ceil(target / 60);

                            if (count >= target) {

                                stat.innerText = hasPercentage
                                    ? target + "%"
                                    : target + "+";

                                clearInterval(interval);

                            } else {

                                stat.innerText = hasPercentage
                                    ? count + "%"
                                    : count + "+";

                            }

                        }, 20);

                    });

                    observer.disconnect();

                }

            });

        });

        observer.observe(statsBox);
    }


    /* ==============================
       TOOL TABS
    ============================== */

    const tabs = document.querySelectorAll(".tool-tabs button");
    const contents = document.querySelectorAll(".tool-content");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(btn => {
                btn.classList.remove("active");
            });

            tab.classList.add("active");

            const id = tab.dataset.tab;

            contents.forEach(content => {
                content.classList.remove("active");
            });

            const targetContent = document.getElementById(id);

            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });


    /* ==============================
       CARD HOVER
    ============================== */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });

    });


    /* ==============================
       BUTTON HOVER
    ============================== */

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-3px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
        });

    });

});