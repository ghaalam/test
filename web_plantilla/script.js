// Galería de imágenes
let index = 0;
const images = document.querySelectorAll('.gallery img');

function showNextImage() {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}

setInterval(showNextImage, 3000); // Cambia de imagen cada 3 segundos

// Funcionalidad de WhatsApp
document.getElementById('whatsappButton').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (name && phone && message) {
        const whatsappURL = `https://wa.me/9541325839?text=${encodeURIComponent(
            `Hola, mi nombre es ${name}.\n\nDetalles del pedido:\n${message}\n\nTeléfono de contacto: ${phone}`
        )}`;
        window.open(whatsappURL, '_blank');
    } else {
        alert('Por favor, completa todos los campos antes de enviar por WhatsApp.');
    }
});
