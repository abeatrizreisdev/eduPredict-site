(function () {
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menu recolhível (celular)
  var botao = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu-principal');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('aberto');
        botao.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animação de entrada: cartões, indicadores, etapas do TRL e tags
  var alvos = Array.prototype.slice.call(
    document.querySelectorAll('.secao .cartao, .secao .indicador, .secao .trl, .secao .tags li')
  );
  alvos.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = ((i % 4) * 90) + 'ms';
  });

  if (reduz || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
    return;
  }

  // Contagem dos indicadores (valores ilustrativos)
  function contar(el) {
    var alvo = parseInt(el.getAttribute('data-count'), 10);
    var inicio = null, dur = 1200;
    function passo(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / dur, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  var contadores = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  contadores.forEach(function (el) { el.textContent = '0'; });

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('visivel');
      if (el.hasAttribute('data-count') && !el.dataset.feito) {
        el.dataset.feito = '1';
        contar(el);
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.2 });

  alvos.forEach(function (el) { obs.observe(el); });
  contadores.forEach(function (el) { obs.observe(el); });
})();

// Logo grande na capa; ao rolar, desce até o cabeçalho
(function () {
  var voo = document.querySelector('.logo-voo');
  var marca = document.querySelector('.logo-marca');
  if (!voo || !marca) return;
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz) { marca.style.opacity = 1; return; }

  function ajustar() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var w0 = Math.min(vw * 0.6, 640);
    voo.style.width = w0 + 'px';
    var h0 = voo.offsetHeight;
    var x0 = (vw - w0) / 2, y0 = (vh - h0) / 2;
    var alvo = marca.getBoundingClientRect();
    var p = Math.min(Math.max(window.scrollY / (vh * 0.6), 0), 1);
    var e = p * p * (3 - 2 * p);
    voo.style.left = (x0 + (alvo.left - x0) * e) + 'px';
    voo.style.top = (y0 + (alvo.top - y0) * e) + 'px';
    voo.style.width = (w0 + (alvo.width - w0) * e) + 'px';
    var chegou = p >= 0.85;
    voo.style.opacity = chegou ? 0 : 1;
    marca.style.opacity = chegou ? 1 : 0;
  }

  window.addEventListener('scroll', ajustar, { passive: true });
  window.addEventListener('resize', ajustar);
  ajustar();
})();
