// Script para el menú hamburguesa y carga de la galería
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('toggle');
    });

    // Cargar la galería dinámicamente
    fetch('js/gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const galleryContainer = document.getElementById('gallery-container');

            data.images.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const imgElement = document.createElement('img');
                imgElement.src = `images/${image.filename}`;
                imgElement.alt = image.description || 'Imagen de la galería';

                // Añadir evento para abrir la lightbox
                imgElement.addEventListener('click', () => {
                    openLightbox(`images/${image.filename}`, image.description);
                });

                galleryItem.appendChild(imgElement);
                galleryContainer.appendChild(galleryItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const galleryContainer = document.getElementById('gallery-container');
            galleryContainer.innerHTML = '<p>Lo sentimos, no se pudo cargar la galería en este momento.</p>';
        });

    // Funciones para la Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close');

    function openLightbox(src, caption) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    // Cerrar la lightbox al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', closeLightbox);

    // Cerrar la lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar la lightbox al presionar la tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
