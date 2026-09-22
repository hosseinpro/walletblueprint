/* walletblueprint.com — mobile navigation */

(function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const mq = window.matchMedia('(max-width: 860px)');
  const isOpen = () => nav.classList.contains('is-open');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  }

  const close = () => setOpen(false);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Following a link — including an in-page anchor — dismisses the panel.
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      close();
      toggle.focus();
    }
  });

  // Widening past the breakpoint restores the inline nav.
  mq.addEventListener('change', (e) => {
    if (!e.matches) close();
  });
})();
