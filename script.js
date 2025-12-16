// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const reservaForm = document.getElementById('reservaForm');
    const servicioSelect = document.getElementById('servicioSelect');
    
    // Menú móvil - toggle
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
    
    // Formulario de reserva
    reservaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = this.querySelector('input[type="text"]').value;
        const servicio = servicioSelect.value;
        
        // Validación básica
        if (!nombre || !servicio) {
            showAlert('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Simular envío de formulario
        showAlert(`¡Gracias ${nombre}! Tu reserva para ${getServiceName(servicio)} ha sido recibida. Te contactaremos pronto para confirmar los detalles.`, 'success');
        
        // Resetear formulario
        this.reset();
        servicioSelect.selectedIndex = 0;
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcular posición considerando el header fijo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de scroll para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(42, 42, 60, 0.95)';
            header.style.backdropFilter = 'blur(5px)';
        } else {
            header.style.backgroundColor = 'var(--dark)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Animación de cards al hacer scroll
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
    
    // Observar las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Función para mostrar alertas
    function showAlert(message, type) {
        // Crear elemento de alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        // Estilos de la alerta
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px 20px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.color = 'white';
        alertDiv.style.fontWeight = '600';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        alertDiv.style.maxWidth = '400px';
        alertDiv.style.animation = 'slideIn 0.3s ease';
        
        // Colores según tipo
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#4CAF50';
        } else {
            alertDiv.style.backgroundColor = '#F44336';
        }
        
        // Añadir al documento
        document.body.appendChild(alertDiv);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 4000);
    }
    
    // Función para obtener nombre del servicio
    function getServiceName(value) {
        const services = {
            'gamer': 'Manicure Gamer',
            'hotel': 'Experiencia Hotel',
            'jacuzzi': 'Jacuzzi Relajante',
            'cumpleaños': 'Fiesta de Cumpleaños'
        };
        return services[value] || 'servicio seleccionado';
    }
    
    // Añadir animación CSS para las alertas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .service-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .service-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
