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

    // =========================================
    // LÓGICA DEL HERO Y SISTEMA SOLAR
    // =========================================

    // 1. Contador de tiempo (Hasta 18 Agosto 2026 08:30:00)
    const countdownDate = new Date("August 18, 2026 08:30:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                // Evento ya empezó
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        };

        updateCountdown(); // Llamada inicial
        setInterval(updateCountdown, 1000); // Actualizar cada segundo
    }

    // 2. Efecto Parallax con el Mouse para el Sistema Solar
    const solarSystem = document.getElementById('solarSystem');
    const heroSection = document.getElementById('hero');

    if (solarSystem && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcular el centro de la sección hero
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calcular la rotación en base a la distancia del centro (máximo 15 grados)
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            // Aplicar transformación
            solarSystem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Al sacar el mouse, volver al centro suavemente
        heroSection.addEventListener('mouseleave', () => {
            solarSystem.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            solarSystem.style.transition = `transform 0.5s ease-out`;
            
            // Quitar transición después para que el movimiento del mouse sea responsivo de nuevo
            setTimeout(() => {
                solarSystem.style.transition = `transform 0.1s ease-out`;
            }, 500);
        });
    }

    // 3. Animación de "Moneda" al hacer clic en el Logo (Isotipo)
    const heroLogo = document.getElementById('heroLogo');
    if (heroLogo) {
        heroLogo.addEventListener('click', () => {
            if (!heroLogo.classList.contains('coin-spin')) {
                heroLogo.classList.add('coin-spin');
                
                // Quitar clase después de la animación para poder repetirlo
                setTimeout(() => {
                    heroLogo.classList.remove('coin-spin');
                }, 1000); // Mismo tiempo que la transición CSS
            }
        });
    }

    // 4. Interactividad de Planetas (Atenuar los demás al hacer clic)
    const planets = document.querySelectorAll('.planet');
    const orbits = document.querySelectorAll('.orbit');

    if (planets.length > 0) {
        planets.forEach(planet => {
            planet.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el click llegue al document

                // Si ya estaba seleccionado, resetear todo
                if (planet.classList.contains('highlighted')) {
                    resetPlanets();
                    return;
                }

                // Resetear todos primero
                resetPlanets();

                // Aplicar estado seleccionado a este planeta
                planet.classList.add('highlighted');
                
                // Atenuar a los demás
                orbits.forEach(orbit => {
                    // Si el planeta clickeado no está dentro de esta órbita, atenuar la órbita completa
                    if (!orbit.contains(planet)) {
                        orbit.classList.add('dimmed');
                    }
                });
                
                // Atenuar también el sol (opcional, para resaltar más la palabra)
                if (heroLogo) heroLogo.classList.add('dimmed');
            });
        });

        // Clic fuera de los planetas resetea todo
        document.addEventListener('click', resetPlanets);

        function resetPlanets() {
            planets.forEach(p => p.classList.remove('highlighted'));
            orbits.forEach(o => o.classList.remove('dimmed'));
            if (heroLogo) heroLogo.classList.remove('dimmed');
        }
    }
});
