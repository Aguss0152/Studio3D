document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el input del checkbox por su ID
    const burgerCheckbox = document.getElementById('burger');
    // Selecciona el menú de navegación
    const navLinks = document.querySelector('.nav-links');

    // Agrega un listener para el evento 'change' en el checkbox

    burgerCheckbox.addEventListener('change', () => {
        // Al cambiar el estado, alterna la clase 'active' en el menú de navegación
        // `toggle` con un segundo argumento (true/false) es perfecto para esto
        navLinks.classList.toggle('active', burgerCheckbox.checked);
    });
});

// Activa las funciones de redes sociales y enlace hacia tienda. 
document.addEventListener('DOMContentLoaded', function() {
    const whatsapp = document.getElementById('whatsapp');
    const instagram = document.getElementById('instagram');
    const facebook = document.getElementById('facebook');
    const btnTienda = document.getElementById('btn_tienda');
    const btnDisenar = document.getElementById('btn-disenar');
    const btnExplorar = document.getElementById('btn-explorar');

    btnDisenar.addEventListener('click', () => {
        window.open('https://wa.me/5492617129357?text=Que%20tienes%en%20mente?')
    }); 

    btnTienda.addEventListener('click', () => {
        window.location.href = 'templates/tienda.html'
    });

    btnExplorar.addEventListener('click', () => {
        window.location.href = 'templates/tienda.html'
    });

    instagram.addEventListener('click', () => {
        window.open('https://www.instagram.com/studio3d_mza?igsh=dzFrNDNnZHA0cTU5')
    });

    whatsapp.addEventListener('click', () => {
        window.open('https://wa.me/5492617129357')
    });

    facebook.addEventListener('click', () => {
        window.open('https://www.facebook.com/share/1NsC2pTmVe/')
    })
});
