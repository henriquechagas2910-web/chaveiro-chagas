const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-question span').textContent = '+';
    });

    if (!wasActive) {
      item.classList.add('active');
      button.querySelector('span').textContent = '−';
    }
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counter = document.querySelector('.counter');
let counterStarted = false;

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      let value = 0;
      const target = Number(counter.dataset.target);
      const timer = setInterval(() => {
        value += 1;
        counter.textContent = value;
        if (value >= target) clearInterval(timer);
      }, 35);
    }
  });
}, { threshold: 0.5 });

if (counter) counterObserver.observe(counter);

document.getElementById('year').textContent = new Date().getFullYear();

/*
  Espaço para integração com Google Analytics / Google Ads.
  Substitua 'AW-XXXXXXXXX' pelo seu identificador quando criar a conta.

  Exemplo de evento:
  gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/XXXXXXXX'});
*/
document.querySelectorAll('.track-whatsapp').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', { event_category: 'contato' });
    }
  });
});

document.querySelectorAll('.track-call').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'click_ligacao', { event_category: 'contato' });
    }
  });
});
