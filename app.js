/* walletblueprint.com — comparison sheet */

const WALLETS = [
  { id: 'a', name: 'Vault Mk4', meta: 'air-gapped · microSD · 2025', se: 9.4, scr: 8.1, inp: 9.0, ent: 9.6, os: 9.5,
    seNote: 'dual SE, seed in-element', scrNote: 'mono OLED, full address', inpNote: 'keypad, PIN on device', entNote: 'TRNG + dice input', osNote: 'full stack, reproducible',
    note: 'Two independent secure elements must agree before a signature is released; the seed is generated inside the pair and never crosses the host bus. Firmware is source-available and reproducibly built.',
    watch: 'Monochrome display cannot render full contract calls — effectively blind signing outside Bitcoin.' },
  { id: 'b', name: 'Sentinel Two', meta: 'USB-C · open firmware · 2026', se: 8.6, scr: 9.2, inp: 8.4, ent: 8.0, os: 9.2,
    seNote: 'certified EAL6+', scrNote: 'colour, host-isolated bus', inpNote: 'two-button confirm', entNote: 'hardware source, unaudited', osNote: 'open firmware + host app',
    note: 'Cleanest separation we have measured between host MCU and signing domain: the display is driven directly by signing firmware over a dedicated bus with no host path.',
    watch: 'Entropy mixing is documented but the health test result is not exposed to the user at setup.' },
  { id: 'c', name: 'Aegis Slate', meta: 'touchscreen · Bluetooth · 2026', se: 9.0, scr: 8.8, inp: 6.9, ent: 8.6, os: 6.4,
    seNote: 'certified, seed in-element', scrNote: 'high-res, full call data', inpNote: 'touch, session trust mode', entNote: 'TRNG + health tests', osNote: 'app open, SE blob closed',
    note: 'Best contract-call rendering in the group — the full calldata is legible on-device, which removes most blind-signing risk for smart-contract users.',
    watch: 'A "trust this session" toggle can suppress per-transaction confirmation for up to an hour.' },
  { id: 'd', name: 'Granite One', meta: 'QR air-gap · no USB data · 2025', se: 8.2, scr: 8.5, inp: 8.8, ent: 9.1, os: 8.7,
    seNote: 'single SE, host MCU open', scrNote: 'colour, QR verify', inpNote: 'physical keypad only', entNote: 'TRNG + user entropy', osNote: 'open, builds verifiable',
    note: 'No data connection at all: every payload arrives and leaves as a QR code, so the attack surface is limited to what the camera will parse.',
    watch: 'QR parser is the whole perimeter; two malformed-payload crashes were fixed in 2026.08 firmware.' },
  { id: 'e', name: 'Ember Card', meta: 'card form factor · NFC · 2026', se: 8.9, scr: 3.2, inp: 4.1, ent: 8.4, os: 4.8,
    seNote: 'certified smartcard SE', scrNote: 'no display', inpNote: 'tap only, PIN on phone', entNote: 'in-SE TRNG', osNote: 'SDK open, applet closed',
    note: 'Genuinely strong silicon in a card body. The secret is safe; the problem is that you can never see what you are signing.',
    watch: 'With no screen and no on-device input, every confirmation is delegated to the phone. Treat as a hot wallet with good key storage.' },
  { id: 'f', name: 'Northgate Pro', meta: 'USB · closed stack · 2024', se: 7.8, scr: 7.4, inp: 7.9, ent: 6.2, os: 2.9,
    seNote: 'certified, closed firmware', scrNote: 'mono, address truncated', inpNote: 'two-button confirm', entNote: 'undocumented mixing', osNote: 'closed, no audit path',
    note: 'Mature, widely deployed, conservative. Nothing here is alarming — but almost nothing is verifiable either, so several properties cap out at "sound, unproven".',
    watch: 'Addresses truncate to 10 characters, which is thin margin against lookalike-address malware.' },
  { id: 'g', name: 'Lumen Stick', meta: 'budget · MCU only · 2025', se: 2.6, scr: 6.1, inp: 7.2, ent: 5.4, os: 9.7,
    seNote: 'no SE, encrypted flash', scrNote: 'mono, full address', inpNote: 'buttons, PIN on device', entNote: 'software PRNG + TRNG', osNote: 'fully open, reproducible',
    note: 'Honest about what it is: an open-source signer on a general-purpose MCU. Good screen and input discipline for the price.',
    watch: 'Physical access likely means seed extraction. Passphrase use is not optional on this device.' },
  { id: 'h', name: 'Obsidian HSM', meta: 'desk unit · enterprise · 2026', se: 9.7, scr: 9.0, inp: 9.3, ent: 9.4, os: 7.1,
    seNote: 'dual certified SE', scrNote: 'colour, full call data', inpNote: 'keypad + physical key', entNote: 'audited TRNG, exportable proof', osNote: 'source under NDA audit',
    note: 'Rack-adjacent hardware in a desk enclosure: dual certified elements, a physical key switch gating signing, and an exportable entropy audit trail.',
    watch: 'Price and size put it outside individual use; setup assumes an operator who reads the manual.' }
];

const SORT_KEYS = {
  secure: 'se',
  screen: 'scr',
  input: 'inp',
  entropy: 'ent',
  open: 'os'
};

const COLUMNS = [
  { key: 'se', note: 'seNote' },
  { key: 'scr', note: 'scrNote' },
  { key: 'inp', note: 'inpNote' },
  { key: 'ent', note: 'entNote' },
  { key: 'os', note: 'osNote' }
];

const state = { sort: 'overall', query: '', open: null };

const els = {
  rows: document.getElementById('rows'),
  sheet: document.getElementById('sheet'),
  noResults: document.getElementById('no-results'),
  count: document.getElementById('result-count'),
  search: document.getElementById('search'),
  clear: document.getElementById('clear-search'),
  sortButtons: Array.from(document.querySelectorAll('[data-sort]'))
};

const score = (w) => (w.se + w.scr + w.inp + w.ent + w.os) / 5;

const tier = (v) => (v >= 9 ? 'STRONG' : v >= 8 ? 'SOUND' : v >= 6.5 ? 'MIXED' : 'WEAK');

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function visibleWallets() {
  const q = state.query.trim().toLowerCase();
  const key = SORT_KEYS[state.sort];
  return WALLETS
    .filter((w) => !q || w.name.toLowerCase().includes(q) || w.meta.toLowerCase().includes(q))
    .sort((a, b) => {
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (key) return b[key] - a[key];
      return score(b) - score(a);
    });
}

function scoreCell(w, col) {
  const value = w[col.key];
  return `
    <div class="cell-score">
      <div class="value">${value.toFixed(1)}</div>
      <div class="bar"><span style="width: ${value * 10}%"></span></div>
      <div class="note">${esc(w[col.note])}</div>
    </div>`;
}

function rowMarkup(w) {
  const overall = score(w);
  const isOpen = state.open === w.id;
  return `
    <div class="row">
      <div class="grid-row row-main" role="button" tabindex="0" data-id="${w.id}"
           aria-expanded="${isOpen}" aria-controls="teardown-${w.id}">
        <div class="cell-device">
          <div class="device-photo">DEVICE<br>PHOTO</div>
          <div style="min-width: 0;">
            <div class="device-name">${esc(w.name)}</div>
            <div class="device-meta">${esc(w.meta)}</div>
          </div>
        </div>
        ${COLUMNS.map((col) => scoreCell(w, col)).join('')}
        <div class="cell-total">
          <div class="value">${overall.toFixed(1)}</div>
          <div class="tier">${tier(overall)}</div>
        </div>
      </div>
      <div class="teardown" id="teardown-${w.id}" ${isOpen ? '' : 'hidden'}>
        <div>
          <div class="kicker">TEARDOWN NOTE</div>
          <p>${esc(w.note)}</p>
        </div>
        <div>
          <div class="kicker">WATCH ITEM</div>
          <p>${esc(w.watch)}</p>
        </div>
      </div>
    </div>`;
}

function render() {
  const list = visibleWallets();

  els.rows.innerHTML = list.map(rowMarkup).join('');
  els.sheet.hidden = list.length === 0;
  els.noResults.hidden = list.length > 0;
  els.count.textContent = list.length === 1 ? '1 DEVICE' : `${list.length} DEVICES`;
  els.clear.hidden = state.query.trim().length === 0;

  els.sortButtons.forEach((btn) => {
    const active = btn.dataset.sort === state.sort;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function toggleRow(id) {
  state.open = state.open === id ? null : id;
  render();
}

els.rows.addEventListener('click', (e) => {
  const row = e.target.closest('.row-main');
  if (row) toggleRow(row.dataset.id);
});

els.rows.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const row = e.target.closest('.row-main');
  if (!row) return;
  e.preventDefault();
  toggleRow(row.dataset.id);
});

els.sortButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.sort = btn.dataset.sort;
    render();
  });
});

els.search.addEventListener('input', (e) => {
  state.query = e.target.value;
  state.open = null;
  render();
});

els.clear.addEventListener('click', () => {
  state.query = '';
  els.search.value = '';
  state.open = null;
  render();
  els.search.focus();
});

render();
