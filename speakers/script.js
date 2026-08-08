document.addEventListener('DOMContentLoaded', () => {

    // LOADER — se oculta al cargar la página
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Al cargar todo (imágenes incluidas)
        window.addEventListener('load', () => {
            loader.classList.add('loader-hidden');
        });
        // Fallback: máximo 1.5s para que no quede bloqueado
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 1500);
    }

    // NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // HAMBURGER MENU
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav  = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('open');
            }
        });
    }

    // LANG TOGGLE
    ['langToggle', 'langToggleMobile'].forEach(id => {
        const toggle = document.getElementById(id);
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            const isES = toggle.getAttribute('data-lang') === 'ES';
            toggle.setAttribute('data-lang', isES ? 'EN' : 'ES');
            const [t0, t1] = toggle.querySelectorAll('.lang-text');
            t0.classList.toggle('active', !isES);
            t1.classList.toggle('active', isES);
        });
    });

    // MODAL "Error del sistema" del botón cerrar
    const closeBtn  = document.getElementById('termCloseBtn');
    const sysModal  = document.getElementById('sysErrorModal');
    const sysClose  = document.getElementById('sysErrorCloseBtn');

    if (closeBtn && sysModal) {
        closeBtn.addEventListener('click', () => {
            sysModal.classList.add('visible');
        });
        sysClose?.addEventListener('click', () => {
            sysModal.classList.remove('visible');
        });
    }

    // SCROLL TOP BUTTON
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // LÓGICA DE SPEAKERS (Expositores)
    const speakersData = [
        { foto: "../imagenes/speakers/speaker01.jpg", nombre: "Pedro Gutiérrez", puesto: "Avify", descripcion: "CEO de Avify. Compartirá el camino de construir una startup.", linkedin: "#", instagram: "#", charla: "Empresa de 0 a 1M" },
        { foto: "../imagenes/speakers/speaker02.jpg", nombre: "Tamara Sancho", puesto: "P&G", descripcion: "Transformando el miedo en una herramienta de crecimiento profesional.", linkedin: "#", instagram: "#", charla: "Extraordinary Fears" },
        { foto: "../imagenes/speakers/speaker03.jpg", nombre: "Pilar Sánchez", puesto: "Avify", descripcion: "Líder de la industria compartiendo su visión en resiliencia.", linkedin: "#", instagram: "#", charla: "Panel Mujeres en Tech" },
        { foto: "../imagenes/speakers/speaker04.jpg", nombre: "Wendy Badilla", puesto: "Microsoft", descripcion: "Experta de Microsoft enfocada en empoderamiento femenino en STEM.", linkedin: "#", instagram: "#", charla: "Panel Mujeres en Tech" },
        { foto: "../imagenes/speakers/speaker05.jpg", nombre: "Aaron Omodeo", puesto: "Doji Club", descripcion: "Especialista en finanzas prácticas y toma de decisiones de inversión.", linkedin: "#", instagram: "#", charla: "Finanzas personales en inversiones" },
        { foto: "../imagenes/speakers/speaker06.jpg", nombre: "Cynthia Navarrete", puesto: "P&G", descripcion: "Especialista en impacto y claridad en comunicación profesional.", linkedin: "#", instagram: "#", charla: "Comunicación Efectiva" },
        { foto: "../imagenes/speakers/speaker07.jpg", nombre: "María José Artavia", puesto: "Directora", descripcion: "Directora dando apertura oficial a TOB-ATI 2026.", linkedin: "#", instagram: "#", charla: "Inauguración" },
        { foto: "../imagenes/speakers/speaker08.jpg", nombre: "Nicole", puesto: "Líder Tecnológica", descripcion: "Experta en liderazgo adaptativo en entornos de cambio acelerado.", linkedin: "#", instagram: "#", charla: "Liderazgo en la era de la transformación digital" },
        { foto: "../imagenes/speakers/speaker09.jpg", nombre: "Alejandro Hidalgo", puesto: "P&G", descripcion: "Aplicación de metodologías ágiles para entregar valor más rápido.", linkedin: "#", instagram: "#", charla: "Metodologías ágiles" },
        { foto: "../imagenes/speakers/speaker10.jpg", nombre: "Gerardo Nájera", puesto: "Sefisa", descripcion: "Estrategias de ciberseguridad para proteger información vital.", linkedin: "#", instagram: "#", charla: "Ciberseguridad" },
        { foto: "../imagenes/speakers/speaker11.jpg", nombre: "Karla Córdoba", puesto: "Aso Blockchain CR", descripcion: "Aplicaciones reales de la confianza digital más allá de cripto.", linkedin: "#", instagram: "#", charla: "Blockchain" },
        { foto: "../imagenes/speakers/speaker12.jpg", nombre: "Diego Loud", puesto: "Loud", descripcion: "Estrategias de mercadeo para conectar con audiencias saturadas.", linkedin: "#", instagram: "#", charla: "Mercadeo en la era digital" },
        { foto: "../imagenes/speakers/speaker13.jpg", nombre: "Ronald Arce", puesto: "INCAE", descripcion: "Cómo la IA está redefiniendo los modelos de negocio.", linkedin: "#", instagram: "#", charla: "IA" }
    ];

    const speakersGrid = document.getElementById('speakersGrid');
    
    function renderSpeakerCard(speaker, index, isHidden = false) {
        const hiddenClass = isHidden ? 'style="display:none;"' : '';
        const i18nId = String(index + 1).padStart(2, '0');
        
        return `
            <div class="speaker-simple-card" data-index="${index}" ${hiddenClass}>
                <div class="speaker-avatar-wrap">
                    <img src="${speaker.foto}" alt="${speaker.nombre}" class="speaker-avatar">
                </div>
                <h3 class="speaker-simple-name" data-i18n="speaker_${i18nId}_name">${speaker.nombre}</h3>
                <p class="speaker-simple-role" data-i18n="speaker_${i18nId}_role">${speaker.puesto}</p>
            </div>
        `;
    }

    if (speakersGrid) {
        const showAll = speakersGrid.hasAttribute('data-show-all');
        const cardsHTML = speakersData.map((sp, i) => renderSpeakerCard(sp, i, showAll ? false : i >= 6)).join('');
        speakersGrid.innerHTML = cardsHTML;
    }

    if (typeof applyTranslations === 'function') {
        applyTranslations(localStorage.getItem('tob_lang') || 'es');
    }

});
