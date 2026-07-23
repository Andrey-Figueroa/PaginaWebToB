document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Móvil
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }

    // 2. Toggle de Idioma
    const langToggles = [document.getElementById('langToggle'), document.getElementById('langToggleMobile')];
    langToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentLang = toggle.getAttribute('data-lang');
                const newLang = currentLang === 'ES' ? 'EN' : 'ES';
                toggle.setAttribute('data-lang', newLang);

                const spans = toggle.querySelectorAll('.lang-text');
                spans.forEach(span => {
                    if (span.textContent === newLang) {
                        span.classList.add('active');
                    } else {
                        span.classList.remove('active');
                    }
                });
            });
        }
    });

    // 3. Loader
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        const loader = document.getElementById("loader-wrapper");
        if (loader) {
            loader.classList.add("loader-hidden");
            document.body.style.overflow = '';
        }
    }, 1500);
});
