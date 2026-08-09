/* =========================================================
   ANURAG SHUKLA — PORTFOLIO JAVASCRIPT
   Responsive • Theme • Mobile Menu • Scroll Animation
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const navToggle =
    document.getElementById("navToggle");

const navLinks =
    document.getElementById("navLinks");

const yearElement =
    document.getElementById("year");

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

const revealElements =
    document.querySelectorAll(".reveal");


/* =========================================================
   THEME SYSTEM
========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-theme");

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );

    } else {

        body.classList.remove("light-theme");

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );
    }

    localStorage.setItem(
        "portfolio-theme",
        theme
    );
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme) {

    applyTheme(savedTheme);

} else {

    /*
       If the user has never selected a theme,
       follow the device/browser preference.
    */

    const prefersLight =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

    applyTheme(
        prefersLight
            ? "light"
            : "dark"
    );
}


/* =========================================================
   THEME TOGGLE
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                body.classList.contains(
                    "light-theme"
                );

            applyTheme(
                isLight
                    ? "dark"
                    : "light"
            );
        }
    );
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMobileMenu() {

    if (!navLinks || !navToggle) {
        return;
    }

    navLinks.classList.remove(
        "open"
    );

    navToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    navToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );

    navToggle.textContent = "☰";
}


function openMobileMenu() {

    if (!navLinks || !navToggle) {
        return;
    }

    navLinks.classList.add(
        "open"
    );

    navToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    navToggle.setAttribute(
        "aria-label",
        "Close navigation"
    );

    navToggle.textContent = "✕";
}


if (navToggle) {

    navToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.contains(
                    "open"
                );

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();
            }
        }
    );
}


/* =========================================================
   CLOSE MENU WHEN NAV LINK IS CLICKED
========================================================= */

navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );
    }
);


/* =========================================================
   CLOSE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeMobileMenu();
        }
    }
);


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (!navLinks || !navToggle) {
            return;
        }

        const clickedInsideNav =
            navLinks.contains(
                event.target
            );

        const clickedToggle =
            navToggle.contains(
                event.target
            );

        if (
            !clickedInsideNav &&
            !clickedToggle
        ) {

            closeMobileMenu();
        }
    }
);


/* =========================================================
   RESPONSIVE NAVIGATION
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 767
        ) {

            closeMobileMenu();
        }
    }
);


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );
        }
    );

} else {

    /*
       Fallback for very old browsers.
    */

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "show"
            );
        }
    );
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection =
        "home";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >=
                sectionTop
            ) {

                currentSection =
                    section.id;
            }
        }
    );


    navigationLinks.forEach(
        (link) => {

            const target =
                link.getAttribute(
                    "href"
                );

            const isActive =
                target ===
                `#${currentSection}`;


            link.classList.toggle(
                "active",
                isActive
            );
        }
    );
}


/* =========================================================
   SCROLL LISTENER
========================================================= */

let scrollTicking = false;


window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                () => {

                    updateActiveNavigation();

                    scrollTicking = false;
                }
            );

            scrollTicking = true;
        }
    },
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                   Update URL without
                   jumping the page.
                */

                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        targetId
                    );
                }
            }
        );
    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    card.classList.toggle(
                        "focused"
                    );
                }
            }
        );
    }
);


/* =========================================================
   SYSTEM THEME CHANGE
   Only applies when user has not manually
   selected a theme.
========================================================= */

if (
    window.matchMedia
) {

    const systemTheme =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        );


    systemTheme.addEventListener(
        "change",
        (event) => {

            const saved =
                localStorage.getItem(
                    "portfolio-theme"
                );


            if (!saved) {

                applyTheme(
                    event.matches
                        ? "light"
                        : "dark"
                );
            }
        }
    );
}


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateActiveNavigation();


        /*
           If user opens the page with
           #projects / #contact etc.
        */

        const currentHash =
            window.location.hash;


        if (currentHash) {

            const target =
                document.querySelector(
                    currentHash
                );


            if (target) {

                setTimeout(
                    () => {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    100
                );
            }
        }
    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            !document.hidden
        ) {

            updateActiveNavigation();
        }
    }
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "🚀 Anurag Shukla Portfolio Loaded Successfully."
);
