// ===== SCRIPT PRINCIPAL LA GOMA =====

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // ===== ELEMENTOS DEL DOM =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // ===== MENÚ MÓVIL =====
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Bloquear scroll cuando el menú está abierto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                const icon = mobileMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
            document.body.style.overflow = ''; // Restaurar scroll
        });
    });
    
    // ===== FORMULARIO DE CONTACTO =====
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const nombre = this.querySelector('input[type="text"]').value;
            const servicio = this.querySelector('#servicioSelect').value;
            
            // Validación básica
            if (!nombre) {
                showAlert('Por favor ingresa tu nombre', 'error');
                return;
            }
            
            // Simular envío exitoso
            showAlert(`¡Gracias ${nombre}! Tu consulta ha sido recibida. Te contactaremos en menos de 24 horas.`, 'success');
            
            // Resetear formulario
            this.reset();
            this.querySelector('#servicioSelect').selectedIndex = 0;
        });
    }
    
    // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Si es un enlace vacío o a la misma página, no hacer nada
            if (targetId === '#' || targetId === '#inicio') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Si es un enlace interno
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular posición considerando el header fijo
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== EFECTO DE SCROLL PARA EL HEADER =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(42, 42, 60, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.backgroundColor = 'var(--dark)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        // Resaltar enlace activo en navegación
        highlightActiveNavLink();
    });
    
    // ===== ANIMACIÓN DE ELEMENTOS AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de servicio
    document.querySelectorAll('.servicio-completo').forEach(card => {
        observer.observe(card);
    });
    
    // Observar los items de servicio
    document.querySelectorAll('.servicio-item').forEach(item => {
        observer.observe(item);
    });
    
    // ===== FUNCIÓN PARA MOSTRAR ALERTAS =====
    function showAlert(message, type) {
        // Crear elemento de alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        // Estilos de la alerta
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px 25px';
        alertDiv.style.borderRadius = '10px';
        alertDiv.style.color = 'white';
        alertDiv.style.fontWeight = '600';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        alertDiv.style.maxWidth = '400px';
        alertDiv.style.animation = 'slideInRight 0.3s ease';
        alertDiv.style.display = 'flex';
        alertDiv.style.alignItems = 'center';
        alertDiv.style.gap = '10px';
        
        // Icono según tipo
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        alertDiv.prepend(icon);
        
        // Colores según tipo
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#4CAF50';
            alertDiv.style.borderLeft = '4px solid #2E7D32';
        } else {
            alertDiv.style.backgroundColor = '#F44336';
            alertDiv.style.borderLeft = '4px solid #C62828';
        }
        
        // Añadir al documento
        document.body.appendChild(alertDiv);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    document.body.removeChild(alertDiv);
                }
            }, 300);
        }, 4000);
    }
    
    // ===== RESALTAR ENLACE ACTIVO EN NAVEGACIÓN =====
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }
    
    // ===== ANIMACIONES CSS DINÁMICAS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .servicio-completo {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .servicio-completo.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .servicio-item {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .servicio-item:nth-child(even) {
            transform: translateX(20px);
        }
        
        .servicio-item.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Animación para precios */
        .precio-item {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .precio-item.animated {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
    
    // Observar elementos de precios
    document.querySelectorAll('.precio-item').forEach(item => {
        observer.observe(item);
    });
    
    // ===== INICIALIZAR ANIMACIONES AL CARGAR =====
    // Forzar un pequeño delay para que se apliquen las animaciones
    setTimeout(() => {
        highlightActiveNavLink();
        
        // Si hay hash en URL, hacer scroll a esa sección
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }, 100);
            }
        }
    }, 100);
    
    // ===== CONSOLA DE BIENVENIDA =====
    console.log(`
    %cLA GOMA - Hub Multidimensional
    %c===============================
    
    ¡Bienvenido a la consola de desarrollo de LA GOMA!
    
    Servicios disponibles:
    🎮 Centro de Videojuegos
    🏨 Experiencia Hotel
    ✂️ Cute & Care (Barbería + Manicure/Pedicure)
    🎉 Fiestas & Eventos
    
    Contacto: +57 315 302 7212
    Email: contacto@lagoma.com
    
    ===============================
    `, 'color: #8A2BE2; font-size: 16px; font-weight: bold;',
       'color: #00CED1; font-size: 12px;');
});

