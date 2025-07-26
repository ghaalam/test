  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('menu-toggle');
    menu.classList.toggle('hidden');
    button.classList.toggle('open');
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

  
}
document.addEventListener('DOMContentLoaded', () => {
  mostrarReseñasDesdeLocalStorage(); // ← cargar reseñas al cargar la página

  const reseñas = document.querySelectorAll('.animacion-reseña');
  reseñas.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
  });
});
function mostrarReseñasDesdeLocalStorage() {
  const contenedor = document.getElementById("lista-reseñas");
  if (!contenedor) return;

  const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

  reseñas.reverse().forEach((r) => {
    const reseñaHTML = `
      <div class="bg-gray-700 border border-yellow-400 rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animacion-reseña">
        <div class="flex items-center mb-2">
          <svg class="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z" />
          </svg>
          <h4 class="text-yellow-300 font-semibold text-lg">${r.nombre}</h4>
        </div>
        <p class="text-sm text-white italic">“${r.mensaje}”</p>
      </div>
    `;
    contenedor.innerHTML += reseñaHTML;
  });
}



/*function enviarReseñaPorWhatsapp() {
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const gracias = document.getElementById('gracias-mensaje');

  if (!nombre || !mensaje) return;

  const texto = `Hola, soy ${nombre} y quiero dejar esta reseña:\n\n"${mensaje}"`;
  const telefono = "529541325839"; // ← Reemplaza con tu número real
  const url = `https://wa.me/529541325839?text=${encodeURIComponent(texto)}`;

  // Mostrar mensaje de agradecimiento
  gracias.classList.remove('hidden');

  // Abrir WhatsApp
  window.open(url, '_blank');

 
   // Crear nueva reseña
  const nuevaReseña = { nombre, mensaje };
  // Guardar en localStorage
  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
  reseñas.push(nuevaReseña);
  localStorage.setItem("reseñas", JSON.stringify(reseñas));
  // Agregar al DOM sin recargar
  agregarReseñaAlDOM(nuevaReseña); // ← 🔥 Esta línea es la clave

  // Limpiar campos
document.getElementById('form-reseña').reset();
}*/
function guardarReseña() {
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const gracias = document.getElementById('gracias-mensaje');

  if (!nombre || !mensaje) return;

  const nuevaReseña = { nombre, mensaje };

  // Mostrar mensaje de agradecimiento
  gracias.classList.remove('hidden');

  // Guardar en localStorage (opcional)
  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
  reseñas.push(nuevaReseña);
  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  // Agregar al DOM sin recargar
  agregarReseñaAlDOM(nuevaReseña);

  // Enviar a Google Sheets
  fetch('https://script.google.com/macros/s/AKfycbyg5UK6oXdVvbs_6QJWKMPuQBhvWNFL2pIEwGEhHmIT1_pRXRoS1xI9mtUiO0RMBP6M/exec', {
    method: 'POST',
    body: JSON.stringify(nuevaReseña),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => console.log("✔ Guardado en Sheets:", data))
  .catch(err => console.error("❌ Error al guardar en Sheets:", err));

  // Limpiar campos
  document.getElementById('form-reseña').reset();
}
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-reseña');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    guardarReseña();
  });
});

function agregarReseñaAlDOM(reseña) {
  const reseñasContenedor = document.getElementById('lista-reseñas');
  const reseñaHTML = `
    <div class="bg-gray-700 border border-yellow-400 rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animacion-reseña max-w-xs w-full break-words mx-auto">
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z" />
        </svg>
        <h4 class="text-yellow-300 font-semibold text-lg truncate w-full">${reseña.nombre}</h4>
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
    const contenidoActual = btn.nextElementSibling;
    const iconoActual = btn.querySelector('.icono');

    // Cerrar todas las preguntas primero
    document.querySelectorAll('.faq-content').forEach(contenido => {
      if (contenido !== contenidoActual) {
        contenido.classList.remove('abierta');
        contenido.previousElementSibling.querySelector('.icono').textContent = '+';
      }
    });

    // Alternar la actual
    const estaAbierta = contenidoActual.classList.contains('abierta');
    contenidoActual.classList.toggle('abierta');
    iconoActual.textContent = estaAbierta ? '+' : '−';
  });
});


