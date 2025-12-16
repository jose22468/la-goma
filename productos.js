// ===== CATÁLOGO DE PRODUCTOS LA GOMA =====
// ¡FÁCIL DE ACTUALIZAR! Solo modifica este array para agregar, eliminar o editar productos

const productos = [
    {
        id: 1,
        nombre: "Camiseta Gamer Exclusive",
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$45.000",
        categoria: "gamer",
        descripcion: "Camiseta 100% algodón con diseño exclusivo LA GOMA, disponible en varias tallas."
    },
    {
        id: 2,
        nombre: "Figura Coleccionable Xbox",
        imagen: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$75.000",
        categoria: "gamer",
        descripcion: "Figura de acción premium de personajes icónicos de Xbox, edición limitada."
    },
    {
        id: 3,
        nombre: "Kit Cuidado Barba Premium",
        imagen: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$68.000",
        categoria: "cuidado",
        descripcion: "Kit completo con aceite para barba, cepillo de madera y bálsamo hidratante."
    },
    {
        id: 4,
        nombre: "Esmaltes Semi-Permanentes",
        imagen: "https://images.unsplash.com/photo-1607779097040-65de8dde6e69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$32.000",
        categoria: "cuidado",
        descripcion: "Set de 6 esmaltes semi-permanentes en tendencia, larga duración y fácil aplicación."
    },
    {
        id: 5,
        nombre: "Gorra LA GOMA",
        imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$40.000",
        categoria: "ropa",
        descripcion: "Gorra ajustable con logo bordado LA GOMA."
    },
    {
        id: 6,
        nombre: "Mouse Gamer RGB",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$120.000",
        categoria: "gamer",
        descripcion: "Mouse gaming con iluminación RGB personalizable, 8 botones programables."
    },
    {
        id: 7,
        nombre: "Aceites Esenciales Relax",
        imagen: "https://images.unsplash.com/photo-1603718117780-d2b6d638d9e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$55.000",
        categoria: "cuidado",
        descripcion: "Set de 3 aceites esenciales para masajes y relajación después del gaming."
    },
    {
        id: 8,
        nombre: "Taza Térmica Gamer",
        imagen: "https://images.unsplash.com/photo-1577937927131-5a1a6df12b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        precio: "$28.000",
        categoria: "otros",
        descripcion: "Taza térmica con diseño gamer, mantiene la temperatura por 4 horas."
    }
];

// ===== FUNCIONES PARA MOSTRAR PRODUCTOS =====

// Función para renderizar todos los productos
function renderizarProductos(productosAMostrar) {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = `
            <div class="no-productos">
                <i class="fas fa-search"></i>
                <h3>No hay productos en esta categoría</h3>
                <p>Prueba con otra categoría o vuelve pronto para ver novedades.</p>
            </div>
        `;
        return;
    }
    
    productosAMostrar.forEach(producto => {
        const productoHTML = `
            <div class="producto-card" data-categoria="${producto.categoria}">
                <div class="producto-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                </div>
                <div class="producto-content">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-descripcion">${producto.descripcion}</p>
                    <p class="producto-precio">${producto.precio}</p>
                    <p class="producto-disponibilidad">
                        <i class="fas fa-store"></i> Disponible solo en tienda física
                    </p>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Función para inicializar los filtros
function inicializarFiltros() {
    const botonesCategoria = document.querySelectorAll('.categoria-btn');
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase active de todos los botones
            botonesCategoria.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar productos
            const categoria = this.getAttribute('data-categoria');
            filtrarProductos(categoria);
        });
    });
}

// ===== INICIALIZAR PÁGINA DE PRODUCTOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar en la página de productos
    if (document.querySelector('.catalogo')) {
        // Renderizar todos los productos al cargar
        renderizarProductos(productos);
        
        // Inicializar los filtros por categoría
        inicializarFiltros();
        
        // Si hay un hash en la URL (ej: #catalogo), hacer scroll suave
        if (window.location.hash === '#catalogo') {
            setTimeout(() => {
                document.querySelector('#catalogo').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    // ===== INSTRUCCIONES PARA ACTUALIZAR EL CATÁLOGO =====
    console.log(`
    ============================================
    🛍️  INSTRUCCIONES PARA ACTUALIZAR EL CATÁLOGO
    ============================================
    
    1. PARA AGREGAR UN NUEVO PRODUCTO:
       --------------------------------
       Agrega un nuevo objeto al array 'productos' en este archivo (productos.js).
       
       Ejemplo:
       {
           id: 9,  // Sigue la numeración
           nombre: "Nombre del producto",
           imagen: "https://url-de-la-imagen.com/foto.jpg",
           precio: "$XX.XXX",
           categoria: "gamer", // Opciones: gamer, cuidado, ropa, otros
           descripcion: "Descripción detallada del producto"
       }
    
    2. PARA ELIMINAR UN PRODUCTO:
       ---------------------------
       Simplemente elimina el objeto del array 'productos'.
    
    3. PARA MODIFICAR UN PRODUCTO:
       ---------------------------
       Edita cualquier propiedad del objeto del producto que quieras cambiar.
    
    4. CATEGORÍAS DISPONIBLES:
       -----------------------
       - "gamer": Mercancía gamer
       - "cuidado": Productos de cuidado personal
       - "ropa": Ropa y accesorios
       - "otros": Otros productos
    
    ¡El catálogo se actualizará automáticamente al guardar los cambios!
    ============================================
    `);
});
