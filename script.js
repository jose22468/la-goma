// ===== SCRIPT PRINCIPAL LA GOMA - VERSIÓN CORREGIDA =====

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script cargado correctamente');
    
    // ===== ELEMENTOS DEL DOM =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
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
    
    // ===== INICIALIZAR MODALES DE SERVICIOS =====
    inicializarModalesServicios();
    
    // ===== RESALTAR ENLACE ACTIVO EN NAVEGACIÓN =====
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        const navItems = document.querySelectorAll('.nav-links a');
        
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
    
    // ===== INICIALIZAR AL CARGAR =====
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
    Email: LAGOMA@gmail.com
    
    ===============================
    `, 'color: #8A2BE2; font-size: 16px; font-weight: bold;',
       'color: #00CED1; font-size: 12px;');
});

// ===== MODAL PARA DETALLES DE SERVICIOS =====

// Datos de los servicios
const serviciosDetalles = {
    videojuegos: {
        titulo: "Centro de Videojuegos",
        icono: "fas fa-gamepad",
        descripcion: `
            <p>Sumérgete en el universo gaming más completo con nuestra sala de videojuegos de última generación.</p>
            
            <h4><i class="fas fa-list-check"></i> Lo que ofrecemos:</h4>
            <ul>
                <li><strong>Consolas de última generación:</strong> Xbox Series X, Xbox One y Xbox 360</li>
                <li><strong>Juegos actualizados:</strong> Contamos con los últimos lanzamientos y clásicos</li>
                <li><strong>Área gaming premium:</strong> Sillas ergonómicas, monitores de alta frecuencia</li>
                <li><strong>Torneos y eventos:</strong> Competencias regulares con premios</li>
                <li><strong>Mercancía gamer:</strong> Camisetas, figuras y accesorios exclusivos</li>
            </ul>
            
            <h4><i class="fas fa-clock"></i> Horarios:</h4>
            <p>Lunes a viernes: 2:00 PM - 10:00 PM<br>
            Sábados y domingos: 10:00 AM - 10:00 PM</p>
            
            <h4><i class="fas fa-tags"></i> Tarifas:</h4>
            <ul>
                <li>Hora individual: $15.000</li>
                <li>Paquete 3 horas: $40.000</li>
                <li>Día completo: $80.000</li>
            </ul>
        `,
        imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    hotel: {
        titulo: "Experiencia Hotel",
        icono: "fas fa-hotel",
        descripcion: `
            <p>Escapa de la rutina y disfruta del descanso que mereces en nuestras suites premium.</p>
            
            <h4><i class="fas fa-list-check"></i> Lo que ofrecemos:</h4>
            <ul>
                <li><strong>Habitaciones de lujo:</strong> Con vistas panorámicas y todas las comodidades</li>
                <li><strong>Jacuzzi exterior:</strong> Relájate en nuestro jacuzzi climatizado</li>
                <li><strong>Amenidades premium:</strong> Minibar, TV inteligente, wifi de alta velocidad</li>
                <li><strong>Servicio personalizado:</strong> Recepción 24/7 y atención al huésped</li>
                <li><strong>Desayuno incluido:</strong> Buffet gourmet todas las mañanas</li>
            </ul>
            
            <h4><i class="fas fa-home"></i> Tipos de habitación:</h4>
            <ul>
                <li><strong>Suite Estándar:</strong> 2 personas, 30m², $180.000/noche</li>
                <li><strong>Suite Ejecutiva:</strong> 2 personas, 45m², jacuzzi privado, $250.000/noche</li>
                <li><strong>Suite Familiar:</strong> 4 personas, 60m², dos habitaciones, $350.000/noche</li>
            </ul>
            
            <h4><i class="fas fa-concierge-bell"></i> Servicios adicionales:</h4>
            <p>Room service, lavandería, gimnasio, sala de reuniones y traslados.</p>
        `,
        imagen: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    "cute-care": {
        titulo: "Cute & Care",
        icono: "fas fa-spa",
        descripcion: `
            <p>La fusión perfecta entre estilo y cuidado personal en un ambiente premium.</p>
            
            <h4><i class="fas fa-list-check"></i> Servicios de Barbería:</h4>
            <ul>
                <li><strong>Cortes de cabello:</strong> Estilo moderno y clásico para hombres</li>
                <li><strong>Afeitado tradicional:</strong> Con navaja y productos premium</li>
                <li><strong>Arreglo de barba:</strong> Diseño, perfilado y mantenimiento</li>
                <li><strong>Tratamientos capilares:</strong> Hidratación, nutrición y reparación</li>
                <li><strong>Depilación masculina:</strong> Con técnicas profesionales</li>
            </ul>
            
            <h4><i class="fas fa-hand-sparkles"></i> Servicios de Manicure & Pedicure:</h4>
            <ul>
                <li><strong>Manicure básico y spa:</strong> Limado, cutículas, hidratación</li>
                <li><strong>Pedicure terapéutico:</strong> Exfoliación, masaje, cuidado de pies</li>
                <li><strong>Uñas acrílicas y gel:</strong> Extensiones y esculpidas</li>
                <li><strong>Diseños artísticos:</strong> Personalizados a tu estilo</li>
                <li><strong>Esmaltado semipermanente:</strong> Larga duración y brillo</li>
            </ul>
            
            <h4><i class="fas fa-tags"></i> Paquetes recomendados:</h4>
            <ul>
                <li><strong>Combo Estilo Total:</strong> Corte + Barba + Manicure = $85.000</li>
                <li><strong>Spa Completo:</strong> Manicure + Pedicure + Facial = $95.000</li>
                <li><strong>Experiencia Premium:</strong> Todos los servicios = $150.000</li>
            </ul>
        `,
        imagen: "https://images.unsplash.com/photo-1607779097040-65de8dde6e69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    fiestas: {
        titulo: "Fiestas & Eventos",
        icono: "fas fa-birthday-cake",
        descripcion: `
            <p>Celebra tus momentos especiales en un espacio diseñado para crear recuerdos inolvidables.</p>
            
            <h4><i class="fas fa-list-check"></i> Tipos de eventos que organizamos:</h4>
            <ul>
                <li><strong>Cumpleaños:</strong> Para todas las edades, con decoración temática</li>
                <li><strong>Aniversarios:</strong> Bodas, compromisos, fechas especiales</li>
                <li><strong>Despedidas:</strong> De soltero/a, de trabajo, graduaciones</li>
                <li><strong>Eventos corporativos:</strong> Lanzamientos, reuniones, team building</li>
                <li><strong>Fiestas temáticas:</strong> Años 80s, superhéroes, cóctel, etc.</li>
            </ul>
            
            <h4><i class="fas fa-cogs"></i> Servicios incluidos:</h4>
            <ul>
                <li><strong>Espacio privado:</strong> Acondicionado para tu evento</li>
                <li><strong>Decoración:</strong> Personalizada según tu tema</li>
                <li><strong>Sonido e iluminación:</strong> Equipo profesional DJ incluido</li>
                <li><strong>Catering:</strong> Opciones de menú básico, premium o gourmet</li>
                <li><strong>Coordinador de evento:</strong> Asistencia durante toda la celebración</li>
            </ul>
            
            <h4><i class="fas fa-boxes"></i> Paquetes disponibles:</h4>
            <ul>
                <li><strong>Básico (4 horas):</strong> Hasta 30 personas, $800.000</li>
                <li><strong>Premium (6 horas):</strong> Hasta 50 personas, $1.200.000</li>
                <li><strong>VIP (8 horas):</strong> Hasta 80 personas, open bar, $1.800.000</li>
            </ul>
        `,
        imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
};

// Función para inicializar los modales
function inicializarModalesServicios() {
    console.log('Inicializando modales de servicios...');
    
    // Agregar eventos a los botones "Ver detalles"
    document.querySelectorAll('.btn-detalles').forEach(boton => {
        boton.addEventListener('click', function() {
            const servicioId = this.getAttribute('data-servicio');
            console.log('Mostrando modal para:', servicioId);
            mostrarModalServicio(servicioId);
        });
    });
    
    console.log('Botones encontrados:', document.querySelectorAll('.btn-detalles').length);
}

// Crear y mostrar modal
function mostrarModalServicio(servicioId) {
    const servicio = serviciosDetalles[servicioId];
    if (!servicio) {
        console.error('Servicio no encontrado:', servicioId);
        return;
    }
    
    // Crear modal
    const modalHTML = `
        <div class="modal-servicio" id="modal-servicio">
            <div class="modal-contenido">
                <button class="modal-cerrar" id="modal-cerrar">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="modal-header">
                    <div class="modal-icono">
                        <i class="${servicio.icono}"></i>
                    </div>
                    <h3>${servicio.titulo}</h3>
                </div>
                
                <div class="modal-body">
                    <div class="modal-imagen">
                        <img src="${servicio.imagen}" alt="${servicio.titulo}">
                    </div>
                    <div class="modal-descripcion">
                        ${servicio.descripcion}
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-contacto" id="btn-contactar-servicio">
                        <i class="fas fa-calendar-check"></i> Reservar este servicio
                    </button>
                    <button class="btn btn-secondary" id="btn-cerrar-modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al cuerpo
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
    
    // Configurar eventos del modal
    const modal = document.getElementById('modal-servicio');
    const btnCerrar = document.getElementById('modal-cerrar');
    const btnCerrar2 = document.getElementById('btn-cerrar-modal');
    const btnContactar = document.getElementById('btn-contactar-servicio');
    
    // Función para cerrar modal
    function cerrarModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Eventos para cerrar
    btnCerrar.addEventListener('click', cerrarModal);
    btnCerrar2.addEventListener('click', cerrarModal);
    
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Evento para contactar
    btnContactar.addEventListener('click', function() {
        cerrarModal();
        setTimeout(() => {
            // Scroll a la sección de contacto
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = contactoSection.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }, 400);
    });
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Asegurarse de que los estilos del modal estén presentes
function agregarEstilosModal() {
    if (!document.querySelector('#estilos-modal')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilos-modal';
        estilo.textContent = `
            .modal-servicio {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.85);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
                overflow-y: auto;
            }
            
            .modal-contenido {
                background: white;
                border-radius: 20px;
                width: 100%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                animation: modalAppear 0.4s ease;
            }
            
            @keyframes modalAppear {
                from {
                    opacity: 0;
                    transform: translateY(-30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-cerrar {
                position: absolute;
                top: 20px;
                right: 20px;
                background: var(--dark);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 10;
                transition: var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-cerrar:hover {
                background: var(--primary);
                transform: rotate(90deg);
            }
            
            .modal-header {
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white;
                padding: 40px;
                border-radius: 20px 20px 0 0;
                text-align: center;
                position: relative;
            }
            
            .modal-icono {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            
            .modal-header h3 {
                color: white;
                font-size: 2.2rem;
                margin-bottom: 0;
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                padding: 40px;
            }
            
            .modal-imagen img {
                width: 100%;
                height: 350px;
                object-fit: cover;
                border-radius: 15px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            .modal-descripcion {
                line-height: 1.7;
            }
            
            .modal-descripcion h4 {
                color: var(--primary);
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 1.3rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .modal-descripcion ul {
                list-style: none;
                padding-left: 0;
            }
            
            .modal-descripcion ul li {
                margin-bottom: 8px;
                padding-left: 25px;
                position: relative;
            }
            
            .modal-descripcion ul li:before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--primary);
                font-weight: bold;
            }
            
            .modal-footer {
                padding: 30px 40px;
                background-color: #f8f9fa;
                border-radius: 0 0 20px 20px;
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .btn-contacto {
                background: linear-gradient(135deg, #4CAF50, #2E7D32);
                color: white;
            }
            
            .btn-contacto:hover {
                background: linear-gradient(135deg, #2E7D32, #1B5E20);
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                }
                
                .modal-imagen img {
                    height: 250px;
                }
                
                .modal-footer {
                    flex-direction: column;
                }
                
                .modal-header {
                    padding: 30px 20px;
                }
                
                .modal-body, .modal-footer {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(estilo);
    }
}

// Agregar estilos al cargar
document.addEventListener('DOMContentLoaded', function() {
    agregarEstilosModal();
});
