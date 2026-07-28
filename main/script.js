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

    // Efecto transparente en hero, fondo sólido al bajar
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    if (navbar) {
        const updateNavbar = () => {
            const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
            if (window.scrollY > heroHeight - 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Ejecutar al cargar
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
    // LÍNEA ROTATIVA DEL HERO
    // =========================================
    const DISPLAY_TIME = 2000; // ms que se muestra cada frase (ajustar aquí)
    const TRANSITION_TIME = 400; // ms de la animación de salida (debe coincidir con phrase-leave en CSS)

    const PHRASES = [
        { text: '15 Aniversario del TOB' },
        { text: 'Mundo BANI' },
        { text: '2 días' },
        { text: '6 bloques' },
        { text: '18 conferencias' },
        { html: 'Estudiantes de <a href="#ati" class="text-cyan" style="text-decoration:underline;text-underline-offset:4px">ATI</a>' },
        { text: 'Congreso de tecnología' },
        { text: '18-19 de agosto 2026' },
    ];

    const phraseEl = document.getElementById('rotatorPhrase');
    if (phraseEl) {
        let currentIndex = 0;

        function showPhrase(index) {
            const phrase = PHRASES[index];
            if (phrase.html) {
                phraseEl.innerHTML = phrase.html;
            } else {
                phraseEl.textContent = phrase.text;
            }
            phraseEl.classList.remove('leaving');
            void phraseEl.offsetWidth; // Forzar reflow para reiniciar la animación
            phraseEl.classList.add('entering');
        }

        function nextPhrase() {
            phraseEl.classList.remove('entering');
            phraseEl.classList.add('leaving');
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % PHRASES.length;
                showPhrase(currentIndex);
            }, TRANSITION_TIME);
        }

        // Mostrar primera frase y arrancar el ciclo
        showPhrase(0);
        setInterval(nextPhrase, DISPLAY_TIME + TRANSITION_TIME);
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

    // =========================================
    // PANTALLA DE CARGA
    // =========================================
    // Bloquear el scroll mientras carga
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        const loader = document.getElementById("loader-wrapper");
        if (loader) {
            loader.classList.add("loader-hidden");
            // Restaurar el scroll
            document.body.style.overflow = '';
        }
    }, 1500);

    // =========================================
    // ANIMACIÓN SCROLL REVEAL Y CONTADORES (ABOUT)
    // =========================================
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(numEl => {
            if (numEl.classList.contains('counted')) return;
            numEl.classList.add('counted');

            const target = parseInt(numEl.getAttribute('data-target'), 10);
            const suffix = numEl.getAttribute('data-suffix') || '';
            const duration = 2400; // 2.4s para que se aprecie cada número
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                // Curva de progreso suave para apreciar la subida de números
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                numEl.textContent = currentVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    numEl.textContent = target + suffix;
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    const aboutContainer = document.querySelector('.about-container');
    if (aboutContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Iniciar los contadores justo cuando aparecen los cuadros (Paso 3)
                    setTimeout(() => {
                        animateCounters();
                    }, 500);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(aboutContainer);
    }

    // =========================================
    // ★ STAR TRAIL CURSOR GLOBAL
    // =========================================
    if (window.matchMedia('(pointer: fine)').matches) { 

        const starCanvas = document.getElementById('globalStarCanvas');

        if (starCanvas) {
            const ctx = starCanvas.getContext('2d');

            function resizeCanvas() {
                starCanvas.width  = window.innerWidth;
                starCanvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            const MAX_PARTICLES  = 100;
            const SPAWN_PER_MOVE = 2;
            const LIFETIME_MIN   = 500;
            const LIFETIME_MAX   = 800;
            const COLORS = ['255,255,255', '33,208,255', '4,116,196'];

            let particles = [];
            let rafId     = null;
            let isMouseIn = false;

            function spawnParticles(x, y) {
                if (particles.length >= MAX_PARTICLES) return;
                const count = Math.min(SPAWN_PER_MOVE, MAX_PARTICLES - particles.length);
                for (let i = 0; i < count; i++) {
                    const lifetime = LIFETIME_MIN + Math.random() * (LIFETIME_MAX - LIFETIME_MIN);
                    particles.push({
                        x:       x + (Math.random() - 0.5) * 6,
                        y:       y + (Math.random() - 0.5) * 6,
                        radius:  1.5 + Math.random() * 2,
                        color:   COLORS[Math.floor(Math.random() * COLORS.length)],
                        alpha:   0.7 + Math.random() * 0.3,
                        vx:      (Math.random() - 0.5) * 0.6,
                        vy:      -0.3 - Math.random() * 0.5,
                        born:    performance.now(),
                        lifetime,
                    });
                }
            }

            function drawFrame(now) {
                ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

                particles = particles.filter(p => {
                    const age      = now - p.born;
                    const progress = age / p.lifetime;
                    if (progress >= 1) return false;

                    const alpha = p.alpha * (1 - progress);

                    ctx.save();
                    ctx.shadowBlur  = 8;
                    ctx.shadowColor = `rgba(${p.color}, ${alpha})`;
                    ctx.fillStyle   = `rgba(${p.color}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();

                    p.x += p.vx;
                    p.y += p.vy;

                    return true;
                });

                if (isMouseIn || particles.length > 0) {
                    rafId = requestAnimationFrame(drawFrame);
                } else {
                    rafId = null;
                }
            }

            function startLoop() {
                if (!rafId) {
                    rafId = requestAnimationFrame(drawFrame);
                }
            }

            window.addEventListener('mousemove', (e) => {
                isMouseIn = true;
                startLoop();
                spawnParticles(e.clientX, e.clientY);
            });

            document.addEventListener('mouseleave', () => {
                isMouseIn = false;
            });
        }
    }

    // =========================================
    // EFECTO TERMINAL TYPEWRITER (WHY ATTEND)
    // =========================================
    const typewriterText = document.getElementById('typewriterText');
    const terminalWindow = document.getElementById('terminalWindow');
    
    if (typewriterText && terminalWindow) {
        const fullText = "Technology on Business (ToB) es una oportunidad única en Costa Rica para estudiantes, profesionales, emprendedores y apasionados por la tecnología que desean impulsar su crecimiento personal y profesional. Durante dos días podrás aprender de expertos de la industria, descubrir las tendencias que transforman el mundo, fortalecer tus habilidades y conectar con personas que comparten tus intereses.\n\nAdemás, ToB 2026 es un evento completamente gratuito y abierto al público, brindando acceso a conferencias, experiencias y networking de alto nivel.\n\nSi buscas aprender, inspirarte y construir conexiones que impulsen tu futuro, este es el lugar para hacerlo.";
        
        let index = 0;
        let isTyping = false;
        let typingTimeout = null;
        
        function typeWriter() {
            if (index < fullText.length) {
                typewriterText.textContent += fullText.charAt(index);
                index++;
                // Velocidad de tipeo variable (simula a un humano tecleando en terminal)
                const delay = Math.random() * 25 + 15; 
                typingTimeout = setTimeout(typeWriter, delay);
            }
        }

        function restartTypewriter() {
            if (typingTimeout) clearTimeout(typingTimeout);
            typewriterText.textContent = '';
            index = 0;
            setTimeout(typeWriter, 400); // Pequeña pausa antes de reiniciar
        }

        // IntersectionObserver para activar el efecto solo cuando la terminal es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    // Breve pausa para simular el enter del comando
                    setTimeout(typeWriter, 600);
                    observer.unobserve(terminalWindow); 
                }
            });
        }, { threshold: 0.4 });

        observer.observe(terminalWindow);

        // --- LÓGICA DE BOTONES DEL TERMINAL ---
        const termCloseBtn = document.getElementById('termCloseBtn');
        const termMinBtn = document.getElementById('termMinBtn');
        const termMaxBtn = document.getElementById('termMaxBtn');
        const sysErrorModal = document.getElementById('sysErrorModal');
        const sysErrorCloseBtn = document.getElementById('sysErrorCloseBtn');

        // Botón Rojo (Cerrar) -> Muestra Modal de Error
        if (termCloseBtn && sysErrorModal) {
            termCloseBtn.addEventListener('click', () => {
                sysErrorModal.classList.add('active');
            });
        }

        // Botón del Modal para cerrar el error
        if (sysErrorCloseBtn && sysErrorModal) {
            sysErrorCloseBtn.addEventListener('click', () => {
                sysErrorModal.classList.remove('active');
            });
        }

        // Botón Amarillo (Minimizar) -> Quita maximizado si lo tiene y reinicia el texto
        if (termMinBtn) {
            termMinBtn.addEventListener('click', () => {
                terminalWindow.classList.remove('maximized');
                restartTypewriter();
            });
        }

        // Botón Verde (Maximizar) -> Alterna maximizado y reinicia el texto
        if (termMaxBtn) {
            termMaxBtn.addEventListener('click', () => {
                terminalWindow.classList.toggle('maximized');
                restartTypewriter();
            });
        }
    }

    // 3. Botón de Registro con Animación de Avión de Papel
    const btnPaperPlane = document.getElementById('btnPaperPlane');
    const planeIcon = document.getElementById('planeIcon');
    let isRegistering = false;

    if (btnPaperPlane && planeIcon) {
        btnPaperPlane.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (isRegistering) return; // Debounce
            isRegistering = true;

            // Animar el avión
            planeIcon.classList.add('flying');

            // Redirigir tras finalizar la animación (~800ms)
            setTimeout(() => {
                // Cambiar por la URL final si es necesario (ej: Lu.ma)
                window.location.href = '#'; 
                
                // Resetear estado después de redirigir
                setTimeout(() => {
                    planeIcon.classList.remove('flying');
                    isRegistering = false;
                }, 500);
            }, 800);
        });
    }

});


