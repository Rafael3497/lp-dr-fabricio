// ==========================================
// Header shrink on scroll
// ==========================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ==========================================
// Mobile menu
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ==========================================
// FAQ accordion
// ==========================================
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ==========================================
// Scroll reveal
// ==========================================
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ==========================================
// Galeria de fotos (setas de navegação)
// ==========================================
const gallery = document.getElementById('gallery');
const prevBtn = document.querySelector('.gallery-prev');
const nextBtn = document.querySelector('.gallery-next');
if (gallery && prevBtn && nextBtn) {
  const scrollAmount = () => gallery.querySelector('.gallery-item').offsetWidth + 18;
  prevBtn.addEventListener('click', () => gallery.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => gallery.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
}

// ==========================================
// Banner de Cookies LGPD (Google Ads/Analytics)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookiesAccepted")) {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    
    // Injeção do HTML do banner (o estilo é puxado do style.css)
    banner.innerHTML = `
      <p>Utilizamos cookies para melhorar sua experiência, personalizar campanhas publicitárias e analisar nosso tráfego, em conformidade com a LGPD. Ao continuar, você concorda com nossa <a href="politica-de-privacidade.html">Política de Privacidade</a>.</p>
      <button id="accept-cookies">Aceitar e Fechar</button>
    `;
    
    document.body.appendChild(banner);

    // Pequeno delay para permitir que o navegador renderize o elemento antes de adicionar a classe "show" (acionando a animação CSS)
    setTimeout(() => {
      banner.classList.add("show");
    }, 100);

    // Lógica do clique no botão de aceite
    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.classList.remove("show");
      
      // Remove do DOM após a animação de saída terminar (500ms)
      setTimeout(() => banner.remove(), 500); 
    });
  }
});