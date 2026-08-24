// Navbar scroll state
const nav = document.getElementById('nav');
function onScroll() {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const overlay = document.getElementById('overlay');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});
overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}));

// Google Analytics: WhatsApp click tracking
function trackWhatsAppClick(modelo) {
  if (typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', { modelo: modelo });
  }
}

// Prototipos
const WHATSAPP_NUMBER = '524444116075';
function waLink(modelo) {
  const text = 'Vengo de casaslanka.mx y me interesa más información del modelo ' + modelo + '.';
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
}

const MODELOS = [
  { nombre: 'Azurita A', terreno: 81, construccion: 69.17, recamaras: 2, agotado: true,
    descripcion: 'Casa de 2 plantas con 2 recámaras, 1.5 baños, sala, comedor, patio con área de lavado y un balcón en la recámara principal. Muros individuales y tinaco oculto.',
    img: 'images/modelos/azurita-a.jpg' },
  { nombre: 'Azurita B', terreno: 81, construccion: 91.02, recamaras: 3, agotado: true,
    descripcion: 'Casa de 3 plantas con 3 recámaras, 2.5 baños, sala, comedor, patio con área de lavado. Recámara principal con vestidor y terraza en el tercer piso. Muros individuales y tinaco oculto.',
    img: 'images/modelos/azurita-b.jpeg' },
  { nombre: 'Azurita C', terreno: 81, construccion: 99.83, recamaras: 3, precio: 'Desde $1,440,000',
    descripcion: 'Casa de 3 plantas con 3 recámaras, 2.5 baños, sala, comedor, patio con área de lavado, recámara principal con vestidor y hall de TV en el tercer piso. Muros individuales y tinaco oculto.',
    img: 'images/modelos/azurita-c.jpeg' },
  { nombre: 'Granate A', terreno: 81, construccion: 76.50, recamaras: 2, agotado: true,
    descripcion: 'Casa de 2 plantas con 2 recámaras, 2 baños completos, sala, comedor, patio con área de lavado. Recámara principal con vestidor y terraza en planta alta. Muros individuales y tinaco oculto.',
    img: 'images/modelos/granate-a.jpg' },
  { nombre: 'Granate B', terreno: 81, construccion: 83.52, recamaras: 3, precio: 'Desde $1,399,000',
    descripcion: 'Casa de 2 plantas con 3 recámaras, 2 baños completos, sala, comedor, cocina, patio con área de lavado. Recámara principal con vestidor y baño. Muros individuales y tinaco oculto.',
    img: 'images/modelos/granate-b.jpg' },
  { nombre: 'Granate C', terreno: 81, construccion: 97.48, recamaras: 3, precio: 'Desde $1,489,000',
    descripcion: 'Casa de 2 plantas con 3 recámaras, 3 baños completos, sala, comedor, cocina, patio con área de lavado. Recámara principal y secundaria en planta alta con baño completo. Muros individuales y tinaco oculto.',
    img: 'images/modelos/granate-c.jpg' }
];

const grid = document.getElementById('modelo-grid');
MODELOS.forEach(m => {
  const card = document.createElement('div');
  card.className = 'modelo-card';
  card.innerHTML = `
    <div class="modelo-img-wrap">
      <img src="${m.img}" alt="Modelo ${m.nombre} - Privada Lanka" loading="lazy">
      ${m.agotado ? '<span class="modelo-badge">Modelo agotado</span>' : ''}
    </div>
    <div class="modelo-body">
      <h3 class="modelo-nombre">${m.nombre}</h3>
      <p class="modelo-specs">${m.terreno} m² de terreno &middot; ${m.construccion} m² de construcción &middot; ${m.recamaras} recámaras</p>
      <p class="modelo-desc">${m.descripcion}</p>
      ${m.precio ? `<p class="modelo-precio">${m.precio} pesos</p>` : '<p class="modelo-agotado-text">Modelo agotado</p>'}
      ${m.agotado
        ? `<button type="button" class="modelo-cta" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            No disponible
          </button>`
        : `<a class="modelo-cta" href="${waLink(m.nombre)}" target="_blank" rel="noopener noreferrer" onclick="trackWhatsAppClick('${m.nombre}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            Requiero más información
          </a>`
      }
    </div>`;
  grid.appendChild(card);
});

// Ubicación map (MapLibre + OpenStreetMap tiles)
if (window.maplibregl) {
  const map = new maplibregl.Map({
    container: 'lanka-map',
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors'
        }
      },
      layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
    },
    center: [-100.9426805, 22.2095343],
    zoom: 15
  });
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  const el = document.createElement('div');
  el.className = 'lanka-map-marker';
  new maplibregl.Marker({ element: el, anchor: 'bottom' })
    .setLngLat([-100.9426805, 22.2095343])
    .setPopup(new maplibregl.Popup({ offset: 28 }).setHTML('<strong>Privada Lanka</strong>'))
    .addTo(map);
}

// Footer year
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll-reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
