/* walletblueprint.com — methodology metric tabs */

(function () {
  const root = document.getElementById('metric-tabs');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  if (!tabs.length || panels.some((p) => !p)) return;

  // Nothing is hidden until this class is on the container, so a page where the
  // script never runs keeps all four panels open and readable.
  root.classList.add('is-tabbed');

  function select(index, focus, writeHash) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      // Roving tabindex: only the selected tab is in the tab order.
      tab.tabIndex = on ? 0 : -1;
      panels[i].classList.toggle('is-active', on);
    });

    if (focus) tabs[index].focus();

    // Deep-linkable, but replaceState so the page does not jump to the anchor
    // and switching tabs does not fill the back button with history entries.
    const key = tabs[index].dataset.key;
    if (writeHash && key && location.hash.slice(1) !== key) {
      history.replaceState(null, '', '#' + key);
    }
  }

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) select(tabs.indexOf(tab), true, true);
  });

  // Arrow keys move focus and selection together, which is the expected
  // behaviour for a tablist whose panels are cheap to show.
  const STEPS = { ArrowLeft: -1, ArrowRight: 1 };

  root.addEventListener('keydown', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;

    const from = tabs.indexOf(tab);
    const step = STEPS[e.key];
    let to = -1;

    if (step) to = (from + step + tabs.length) % tabs.length;
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = tabs.length - 1;
    if (to < 0) return;

    e.preventDefault();
    select(to, true, true);
  });

  const fromHash = () => tabs.findIndex((t) => t.dataset.key === location.hash.slice(1));

  window.addEventListener('hashchange', () => {
    const i = fromHash();
    if (i > -1) select(i, false, false);
  });

  const initial = fromHash();
  select(initial > -1 ? initial : 0, false, false);
})();
