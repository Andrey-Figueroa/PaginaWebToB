document.addEventListener('DOMContentLoaded', () => {
    // Switch de idioma (ES/EN)
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const texts = langToggle.querySelectorAll('.lang-text');
            const isES = texts[0].classList.contains('active');
            
            if (isES) {
                // Cambiar a EN
                texts[0].classList.remove('active');
                texts[1].classList.add('active');
                langToggle.setAttribute('data-lang', 'EN');
            } else {
                // Cambiar a ES
                texts[1].classList.remove('active');
                texts[0].classList.add('active');
                langToggle.setAttribute('data-lang', 'ES');
            }
        });
    }

    // Efecto de sombra al navbar si hubiera scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            }
        });
    }

    // Lógica del menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });
    }

    // Switch de idioma para móvil
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            const texts = langToggleMobile.querySelectorAll('.lang-text');
            const isES = texts[0].classList.contains('active');
            
            if (isES) {
                texts[0].classList.remove('active');
                texts[1].classList.add('active');
                langToggleMobile.setAttribute('data-lang', 'EN');
                // Sincronizar con el principal
                if (langToggle && langToggle.getAttribute('data-lang') === 'ES') {
                    langToggle.click();
                }
            } else {
                texts[1].classList.remove('active');
                texts[0].classList.add('active');
                langToggleMobile.setAttribute('data-lang', 'ES');
                // Sincronizar con el principal
                if (langToggle && langToggle.getAttribute('data-lang') === 'EN') {
                    langToggle.click();
                }
            }
        });
    }
});
