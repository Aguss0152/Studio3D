document.addEventListener('DOMContentLoaded', function () {
    // Lógica para el menú de navegación (hamburguesa)
    const burgerInput = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');

    if (burgerInput && navLinks) {
        burgerInput.addEventListener('click', () => {
            navLinks.classList.toggle('active', burgerInput.checked);
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                burgerInput.checked = false;
                navLinks.classList.remove('active');
            });
        });
    }

    // Lógica para el carrito de compras
    const botonesComprar = document.querySelectorAll('.btn_buy');
    const carritoContenedor = document.getElementById('carrito-contenedor');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElemento = document.getElementById('total-carrito');
    const botonComprarFinal = document.getElementById('btn-comprar-final');
    const botonVaciar = document.getElementById('btn-vaciar-carrito');
    const botonMinimizar = document.getElementById('btn-minimizar');
    const carritoContent = document.getElementById('carrito-content');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Funciones de inicialización
    actualizarVistaCarrito();
    
    // Inicia el carrito en estado minimizado si hay productos, o lo oculta si está vacío.
    if (carritoContenedor) {
        if (carrito.length > 0) {
            minimizarCarrito();
        } else {
            carritoContenedor.style.display = 'none';
        }
    }

    // Event listeners para los botones de los productos
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoElemento = boton.closest('.producto');
            
            if (productoElemento) {
                const producto = {
                    id: productoElemento.dataset.id,
                    nombre: productoElemento.dataset.nombre,
                    precio: parseInt(productoElemento.dataset.precio),
                    cantidad: 1
                };

                agregarAlCarrito(producto);
                maximizarCarrito();
            }
        });
    });

    // Event listeners para los botones del carrito
    if (botonComprarFinal) {
        botonComprarFinal.addEventListener('click', finalizarCompraPorWhatsApp);
    }

    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }
    
    if (botonMinimizar) {
        botonMinimizar.addEventListener('click', () => {
            if (carritoContenedor.classList.contains('minimizado')) {
                maximizarCarrito();
            } else {
                minimizarCarrito();
            }
        });
    }

    // Delegación de eventos para los botones de cambiar cantidad
    if (listaCarrito) {
        listaCarrito.addEventListener('click', (evento) => {
            if (evento.target.classList.contains('cambiar-cantidad')) {
                const idProducto = evento.target.dataset.id;
                const accion = evento.target.dataset.accion;
                
                const productoEncontrado = carrito.find(item => item.id === idProducto);
    
                if (productoEncontrado) {
                    if (accion === 'sumar') {
                        productoEncontrado.cantidad++;
                    } else if (accion === 'restar') {
                        if (productoEncontrado.cantidad > 1) {
                            productoEncontrado.cantidad--;
                        } else {
                            carrito = carrito.filter(item => item.id !== idProducto);
                        }
                    }
                    guardarCarritoEnLocalStorage();
                    actualizarVistaCarrito();
                }
            }
        });
    }


    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push(producto);
        }
        
        guardarCarritoEnLocalStorage();
        actualizarVistaCarrito();
    }

    function vaciarCarrito() {
        carrito = [];
        guardarCarritoEnLocalStorage();
        actualizarVistaCarrito();
        minimizarCarrito();
    }

    function actualizarVistaCarrito() {
        if (!listaCarrito || !totalCarritoElemento) return;
        
        listaCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length > 0) {
            carrito.forEach(item => {
                const listItem = document.createElement('li');
                listItem.classList.add('item-carrito');
                listItem.innerHTML = `
                    <span>${item.nombre}</span>
                    <div class="cantidad-botones">
                        <button class="cambiar-cantidad" data-id="${item.id}" data-accion="restar">-</button>
                        <span class="contador-producto">${item.cantidad}</span>
                        <button class="cambiar-cantidad" data-id="${item.id}" data-accion="sumar">+</button>
                    </div>
                    <span class="precio-producto">$${item.precio * item.cantidad}</span>
                `;
                listaCarrito.appendChild(listItem);
                total += item.precio * item.cantidad;
            });
            if (carritoContenedor) carritoContenedor.style.display = 'block';
        } else {
            if (carritoContenedor) carritoContenedor.style.display = 'none';
        }

        totalCarritoElemento.textContent = total;
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function finalizarCompraPorWhatsApp() {
        if (carrito.length === 0) {
            alert('El carrito está vacío. Por favor, agrega productos antes de finalizar la compra.');
            return;
        }

        let mensaje = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n";
        let total = 0;

        carrito.forEach(item => {
            mensaje += `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
            total += item.precio * item.cantidad;
        });

        mensaje += `\nTotal: $${total}\n\n`;
        mensaje += "¡Muchas gracias!";

        const mensajeCodificado = encodeURIComponent(mensaje);
        const numeroTelefono = '5492617129357';
        const whatsappURL = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;

        window.open(whatsappURL, '_blank');
    }

    function minimizarCarrito() {
        if (carritoContenedor && carritoContent && botonMinimizar) {
            carritoContenedor.classList.add('minimizado');
            carritoContent.style.display = 'none';
            botonMinimizar.textContent = '+';
        }
    }

    function maximizarCarrito() {
        if (carritoContenedor && carritoContent && botonMinimizar && carrito.length > 0) {
            carritoContenedor.classList.remove('minimizado');
            carritoContent.style.display = 'block';
            botonMinimizar.textContent = '-';
        }
    }
});

// Activa las funciones de redes sociales y enlace hacia tienda. 
document.addEventListener('DOMContentLoaded', function() {
    const instagram = document.getElementById('instagram');
    const facebook = document.getElementById('facebook');

    instagram.addEventListener('click', () => {
        window.open('https://www.instagram.com/studio3d_mza?igsh=dzFrNDNnZHA0cTU5')
    });

    facebook.addEventListener('click', () => {
        window.open('https://www.facebook.com/share/1NsC2pTmVe/')
    });
});
