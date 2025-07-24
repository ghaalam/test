function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function mostrarAppsPorSistema() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const appsAndroid = document.getElementById('apps-android');
  const appsIOS = document.getElementById('apps-ios');
  const appsWindows = document.getElementById('apps-windows');
  const appsSmartTV = document.getElementById('apps-smarttv');

  if (/android/i.test(userAgent)) {
    appsAndroid.classList.remove('hidden');
    appsIOS.classList.add('hidden');
    appsWindows.classList.add('hidden');
    appsSmartTV.classList.remove('hidden');
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    appsIOS.classList.remove('hidden');
    appsAndroid.classList.add('hidden');
    appsWindows.classList.add('hidden');
    appsSmartTV.classList.remove('hidden');
  } else if (/Win/.test(userAgent)) {
    appsWindows.classList.remove('hidden');
    appsAndroid.classList.add('hidden');
    appsIOS.classList.add('hidden');
    appsSmartTV.classList.remove('hidden');
  } else {
    appsAndroid.classList.remove('hidden');
    appsIOS.classList.remove('hidden');
    appsWindows.classList.remove('hidden');
    appsSmartTV.classList.remove('hidden');
  }

  mostrarReseñasDesdeLocalStorage(); // ← cargar reseñas al cargar la página
}

function enviarReseñaPorWhatsapp() {
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const gracias = document.getElementById('gracias-mensaje');

  if (!nombre || !mensaje) return;

  const texto = `Hola, soy ${nombre} y quiero dejar esta reseña:\n\n"${mensaje}"`;
  const telefono = "529541325839"; // ← Reemplaza con tu número real
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

  // Mostrar mensaje de agradecimiento
  gracias.classList.remove('hidden');

  // Abrir WhatsApp
  window.open(url, '_blank');

  // Guardar en localStorage
  const nuevaReseña = { nombre, mensaje };
  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
  reseñas.push(nuevaReseña);
  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  // Mostrar en pantalla
  agregarReseñaAlDOM(nuevaReseña);

  // Limpiar campos
  document.getElementById('nombre').value = "";
  document.getElementById('mensaje').value = "";
}

function agregarReseñaAlDOM(reseña) {
  const reseñasContenedor = document.getElementById('lista-reseñas');
  const reseñaHTML = `
    <div class="bg-gray-700 border border-yellow-400 rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animacion-reseña">
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z" />
        </svg>
        <h4 class="text-yellow-300 font-semibold text-lg">${reseña.nombre}</h4>
      </div>
      <p class="text-sm text-white italic">“${reseña.mensaje}”</p>
    </div>
  `;
  reseñasContenedor.innerHTML = reseñaHTML + reseñasContenedor.innerHTML;
}
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-gray-900", "shadow-lg");
      header.classList.remove("bg-gray-800");
    } else {
      header.classList.remove("bg-gray-900", "shadow-lg");
      header.classList.add("bg-gray-800");
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
document.querySelectorAll('.toggle-faq').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icono = btn.querySelector('.icono');

      // Cerrar todos los demás
      document.querySelectorAll('.faq-content').forEach(el => {
        if (el !== content) {
          el.style.maxHeight = null;
          el.style.padding = '0';
        }
      });
      document.querySelectorAll('.toggle-faq .icono').forEach(ic => {
        if (ic !== icono) ic.textContent = "+";
      });

      // Abrir o cerrar el actual
      const abierto = content.style.maxHeight;
      if (abierto) {
        content.style.maxHeight = null;
        content.style.padding = '0';
        icono.textContent = "+";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = '1rem';
        icono.textContent = "−";
      }
    });
  });



