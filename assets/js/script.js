'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
};

/* ---------- idiomas ---------- */
const I18N = {
  pt: {
    nav_about: 'Sobre', nav_skills: 'Habilidades', nav_projects: 'Projetos', nav_contact: 'Contato',
    hero_hi: 'Olá, eu sou', hero_make: 'Eu crio sites',
    hero_sub: 'Desenvolvedor web apaixonado por transformar ideias em aplicações limpas, rápidas e fáceis de usar.',
    cta_projects: 'Ver projetos', cta_contact: 'Fale comigo',
    st1: 'anos de experiência', st2: 'projetos concluídos', st3: 'projetos no ar',
    about_title: 'Preciso de um produto criativo? Posso ajudar.',
    about_text: 'Sou Francisco Lisboa, desenvolvedor com paixão por criar aplicações web limpas e com funcionalidades intuitivas. Gosto de transformar ideias em realidade com soluções criativas e estou sempre aprendendo novas ferramentas e conceitos. Além de projetos full stack solo, já trabalhei em equipes criativas, com reuniões diárias, controle de versão e gestão de projetos.',
    hire: 'Contrate-me', cv: 'Baixar currículo',
    skills_title: 'O que eu uso no dia a dia', proj_title: 'Projetos para explorar',
    f_all: 'Todos', f_game: 'Jogos', f_site: 'Sites',
    p1: 'Jogo de ação feito em JavaScript.', p2: 'Corrida 2D com pontuação e obstáculos.',
    p3: 'Corrida em 3D com loja de carros (em testes).', p4: 'Site responsivo para uma marca de panetones.',
    p5: 'Projeto particular para uma rede de postos.', p6t: 'Estágio em Engenharia de Minas', p6: 'Trabalho desenvolvido durante o estágio.',
    more: 'Ver mais no GitHub',
    contact_title: 'Tem um projeto? Mande uma mensagem.',
    contact_text: 'Conte como posso ajudar. Preencha o formulário e eu respondo o quanto antes.',
    l_name: 'Nome', l_phone: 'Telefone', l_msg: 'Mensagem', send: 'Enviar mensagem',
    ok: 'Mensagem enviada. Obrigado!', err: 'Não foi possível enviar. Tente novamente ou use o email.',
    rights: 'Todos os direitos reservados.',
    nav_journey: 'Trajetória', journey_title: 'Minha trajetória', wa: 'Chamar no WhatsApp', avail: 'Aberto a novos projetos', open: 'Abrir projeto',
    t1: 'Estágio em Engenharia de Minas', t1d: 'Trabalho desenvolvido durante o estágio.',
    t2: 'Game Corrida e Projeto Panetone', t2d: 'Corrida 2D e site responsivo.',
    t3: 'Jogo DeadZone', t3d: 'Jogo de ação feito em JavaScript.',
    t4: 'Rede Modesto', t4d: 'Projeto particular para uma rede de postos.',
    t5: 'Super Racer 3D', t5d: 'Corrida em 3D com loja de carros, em testes.',
    words: ['rápidos.', 'interativos.', 'responsivos.', 'com cara de profissional.']
  },
  en: {
    nav_about: 'About', nav_skills: 'Skills', nav_projects: 'Projects', nav_contact: 'Contact',
    hero_hi: "Hi, I'm", hero_make: 'I build websites that are',
    hero_sub: 'Web developer who loves turning ideas into clean, fast and easy-to-use applications.',
    cta_projects: 'See projects', cta_contact: 'Get in touch',
    st1: 'years of experience', st2: 'completed projects', st3: 'projects online',
    about_title: 'Need a creative product? I can help.',
    about_text: "I'm Francisco Lisboa, a developer passionate about building clean web applications with intuitive features. I enjoy turning ideas into reality with creative solutions and I'm always learning new tools and concepts. Besides solo full stack projects, I have worked with creative teams, using daily stand-ups, source control and project management.",
    hire: 'Hire me', cv: 'Download CV',
    skills_title: 'What I use every day', proj_title: 'Projects to explore',
    f_all: 'All', f_game: 'Games', f_site: 'Websites',
    p1: 'Action game built with JavaScript.', p2: '2D racing with score and obstacles.',
    p3: '3D racing game with a car shop (in testing).', p4: 'Responsive website for a panettone brand.',
    p5: 'Private project for a gas station chain.', p6t: 'Mining Engineering internship', p6: 'Work developed during the internship.',
    more: 'See more on GitHub',
    contact_title: 'Got a project? Send a message.',
    contact_text: "Tell me how I can help. Fill in the form and I'll reply as soon as possible.",
    l_name: 'Name', l_phone: 'Phone', l_msg: 'Message', send: 'Send message',
    ok: 'Message sent. Thank you!', err: "Couldn't send. Try again or use email.",
    rights: 'All rights reserved.',
    nav_journey: 'Journey', journey_title: 'My journey', wa: 'Chat on WhatsApp', avail: 'Open to new projects', open: 'Open project',
    t1: 'Mining Engineering internship', t1d: 'Work developed during the internship.',
    t2: 'Racing Game and Panettone Project', t2d: '2D racing game and a responsive website.',
    t3: 'DeadZone game', t3d: 'Action game built with JavaScript.',
    t4: 'Rede Modesto', t4d: 'Private project for a gas station chain.',
    t5: 'Super Racer 3D', t5d: '3D racing game with a car shop, in testing.',
    words: ['fast.', 'interactive.', 'responsive.', 'professional.']
  }
};
let lang = store.get('lang') || (navigator.language.startsWith('pt') ? 'pt' : 'en');
const langBtn = $('[data-lang]');

function applyLang() {
  const d = I18N[lang];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  $$('[data-i18n]').forEach(el => { if (d[el.dataset.i18n]) el.textContent = d[el.dataset.i18n]; });
  langBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
  startTyping();
}
langBtn.addEventListener('click', () => { lang = lang === 'pt' ? 'en' : 'pt'; store.set('lang', lang); applyLang(); });

/* ---------- efeito de digitação ---------- */
const typedEl = $('[data-typed]');
let typeTimer;
function startTyping() {
  clearTimeout(typeTimer);
  const words = I18N[lang].words;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { typedEl.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    typedEl.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return (typeTimer = setTimeout(tick, 1600)); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    typeTimer = setTimeout(tick, del ? 40 : 80);
  })();
}

/* ---------- tema ---------- */
function setTheme(t) {
  document.body.classList.toggle('dark_theme', t === 'dark');
  document.body.classList.toggle('light_theme', t === 'light');
  store.set('theme', t);
}
setTheme(store.get('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
$('[data-theme-btn]').addEventListener('click', () =>
  setTheme(document.body.classList.contains('dark_theme') ? 'light' : 'dark'));

/* ---------- menu mobile ---------- */
const nav = $('[data-nav]'), burger = $('[data-burger]');
const closeNav = () => { nav.classList.remove('open'); burger.firstElementChild.setAttribute('name', 'menu-outline'); document.body.style.overflow = ''; };
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.firstElementChild.setAttribute('name', open ? 'close-outline' : 'menu-outline');
  document.body.style.overflow = open ? 'hidden' : '';
});
$$('a', nav).forEach(a => a.addEventListener('click', closeNav));

/* ---------- scroll: header, voltar ao topo, link ativo ---------- */
const header = $('[data-header]'), topBtn = $('[data-top]'), progress = $('[data-progress]');
addEventListener('scroll', () => {
  const y = scrollY > 20;
  header.classList.toggle('active', y);
  topBtn.classList.toggle('active', scrollY > 500);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

const links = $$('.nav a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('current', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));

/* ---------- contadores e barras de habilidades ---------- */
const once = new IntersectionObserver((es, obs) => es.forEach(e => {
  if (!e.isIntersecting) return;
  obs.unobserve(e.target);
  if (e.target.matches('.stats')) $$('[data-count]', e.target).forEach(n => {
    const end = +n.dataset.count, t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1200, 1);
      n.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });
  else e.target.classList.add('in');
}), { threshold: .3 });
$$('.stats, .skills').forEach(el => once.observe(el));

/* ---------- filtro de projetos ---------- */
const filterBtns = $$('[data-filter]');
filterBtns.forEach(b => b.addEventListener('click', () => {
  filterBtns.forEach(x => x.classList.toggle('active', x === b));
  $$('.grid li').forEach(li => li.classList.toggle('hide', b.dataset.filter !== 'all' && li.dataset.cat !== b.dataset.filter));
}));

/* ---------- brilho que segue o mouse ---------- */
if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('pointermove', e => {
    document.body.style.setProperty('--mx', e.clientX + 'px');
    document.body.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });
}

/* ---------- janela de detalhes do projeto ---------- */
const modal = $('[data-modal]');
const mq = s => $(s, modal);
const ytId = u => (u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/) || [])[1];
const cards = () => $$('.grid li:not(.hide) .card');
let current = null;

function stopMedia() {
  const v = mq('[data-m-video]'), f = mq('[data-m-frame]');
  v.pause(); v.removeAttribute('src'); v.load(); v.hidden = true;
  f.removeAttribute('src'); f.hidden = true;
}

function openCard(card) {
  current = card;
  stopMedia();
  const img = $('img', card), pic = mq('[data-m-img]');
  const vid = mq('[data-m-video]'), frame = mq('[data-m-frame]');
  const src = card.dataset.video, id = src && ytId(src);
  pic.hidden = !img;
  if (img) { pic.src = img.src; pic.alt = img.alt; }
  if (id) {
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    frame.hidden = false; pic.hidden = true;
  } else if (src) {
    vid.poster = img ? img.src : '';
    vid.onerror = () => { vid.hidden = true; pic.hidden = !img; };
    vid.src = src; vid.hidden = false; pic.hidden = true;
    vid.play().catch(() => {});
  }
  mq('[data-m-title]').textContent = $('h3', card).textContent;
  mq('[data-m-desc]').textContent = $('p', card).textContent;
  mq('[data-m-tech]').textContent = $('small', card).textContent;
  const link = mq('[data-m-link]');
  link.hidden = !card.href;
  if (card.href) link.href = card.href;
  if (!modal.open) modal.showModal();
}

$$('.grid .card').forEach(card => card.addEventListener('click', e => {
  if (typeof modal.showModal !== 'function') return;
  e.preventDefault();
  openCard(card);
}));

const step = d => { const l = cards(), i = l.indexOf(current); openCard(l[(i + d + l.length) % l.length]); };
mq('[data-prev]').addEventListener('click', () => step(-1));
mq('[data-next]').addEventListener('click', () => step(1));
addEventListener('keydown', e => {
  if (!modal.open) return;
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
mq('[data-close]').addEventListener('click', () => modal.close());
modal.addEventListener('close', stopMedia);

/* prévia em vídeo ao passar o mouse no card (só computador) */
if (matchMedia('(hover: hover)').matches) $$('.grid .card[data-video]').forEach(card => {
  const src = card.dataset.video, img = $('img', card);
  if (!img || ytId(src)) return;
  let v;
  card.addEventListener('pointerenter', () => {
    if (!v) {
      v = document.createElement('video');
      Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'metadata', className: 'preview' });
      v.addEventListener('playing', () => v.classList.add('show'));
      v.addEventListener('error', () => v.remove());
      v.src = src; img.after(v);
    }
    v.play().catch(() => {});
  });
  card.addEventListener('pointerleave', () => { if (v) { v.pause(); v.classList.remove('show'); } });
});
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* ---------- copiar email ---------- */
$$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); } catch { return; }
  const ic = b.firstElementChild;
  ic.setAttribute('name', 'checkmark-outline');
  setTimeout(() => ic.setAttribute('name', 'copy-outline'), 1600);
}));

/* ---------- formulário (Netlify Forms) ---------- */
const form = $('[data-form]'), status = $('[data-status]');
form.addEventListener('submit', async e => {
  e.preventDefault();
  status.className = 'status';
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!res.ok) throw new Error(res.status);
    status.textContent = I18N[lang].ok; status.classList.add('ok'); form.reset();
  } catch {
    status.textContent = I18N[lang].err; status.classList.add('err');
  }
});

applyLang();
