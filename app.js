/* walletblueprint.com — comparison sheet */

const WALLETS = [
  {
    id: 'lnsp', photo: 'images/devices/ledger-nano-s-plus.webp', name: 'Ledger Nano S Plus', meta: 'USB-C · ST33 element · buttons in SE', se: 9.5, scr: 9.0, inp: 9.0, ent: 9.0, os: 4.0,
    seNote: 'certified ST33, seed in-element', scrNote: 'display driver inside SE', inpNote: 'button handling inside SE', entNote: 'certified SE key generation', osNote: 'apps open, SE firmware closed',
    note: 'The ST33 has enough I/O for Ledger to pull the display driver and button handling into the secure element itself, which makes manipulating what is shown, or faking a press, substantially harder.',
    watch: 'An MCU still handles USB. Kraken Security Labs showed it could be overwritten before delivery — patched, but the MCU remains the softest part of the device.'
  },
  {
    id: 'lnx', photo: 'images/devices/ledger-nano-x.webp', name: 'Ledger Nano X', meta: 'USB-C · Bluetooth · ST33 element', se: 9.5, scr: 9.0, inp: 9.0, ent: 9.0, os: 4.0,
    seNote: 'certified ST33, seed in-element', scrNote: 'display driver inside SE', inpNote: 'button handling inside SE', entNote: 'certified SE key generation', osNote: 'apps open, SE firmware closed',
    note: 'Architecturally the Nano S Plus with Bluetooth added. Same ST33, same display and button handling inside the secure element.',
    watch: 'Bluetooth widens what the remaining MCU is exposed to. NFC would remove the need for a battery and is already supported by the ST33.'
  },
  {
    id: 'lstax', photo: 'images/devices/ledger-stax.webp', name: 'Ledger Stax', meta: 'USB-C · Bluetooth · e-ink', se: 9.0, scr: 8.5, inp: 8.5, ent: 8.5, os: 4.0,
    seNote: 'certified element, detail scarce', scrNote: 'large e-ink, likely SE-driven', inpNote: 'touch, likely SE-driven', entNote: 'certified SE key generation', osNote: 'apps open, SE firmware closed',
    note: 'Solves the user-experience problem, but public technical detail is thin. On what is available it appears to share the Nano X architecture, MCU included.',
    watch: 'Scored below the Nano X only because the architecture is inferred rather than documented.'
  },
  {
    id: 'lflex', photo: 'images/devices/ledger-flex.webp', name: 'Ledger Flex', meta: 'USB-C · Bluetooth · e-ink touch', se: 9.0, scr: 8.5, inp: 8.5, ent: 8.5, os: 4.0,
    seNote: 'certified element, seed in-element', scrNote: 'e-ink, driven through the element', inpNote: 'touch routed via the element', entNote: 'certified SE key generation', osNote: 'apps open, SE firmware closed',
    note: 'Ledger\'s e-ink touchscreen device. Ledger documents the display and touch controller as driven through the secure element rather than the connectivity MCU — the same direction of travel as the Nano S Plus.',
    watch: 'Released after the 2024 analysis and not covered by it. Scored by extrapolation from the Stax and Nano X architecture, not from independent verification.'
  },
  {
    id: 'lgen5', photo: 'images/devices/ledger-nano-gen5.webp', name: 'Ledger Nano Gen5', meta: 'e-ink touch · fingerprint sensor', rated: false,
    note: 'E-ink touchscreen with an on-device fingerprint sensor. Released after the 2024 analysis.',
    watch: 'Needs verifying before it can be scored: secure-element part, what drives the display and touch controller, where the fingerprint template is held, and whether a general-purpose MCU remains in the signing path.'
  },

  {
    id: 'tsafe3', photo: 'images/devices/trezor-safe-3.webp', name: 'Trezor Safe 3', meta: 'USB-C · EAL6+ element · open firmware', se: 5.0, scr: 7.5, inp: 7.5, ent: 7.0, os: 9.0,
    seNote: 'EAL6+, but seed leaves it', scrNote: 'mono, on-device, MCU-driven', inpNote: 'buttons, PIN on device', entNote: 'SE-assisted, MCU-side mixing', osNote: 'firmware published, reproducible',
    note: 'The secure element holds a key that decrypts the seed; the PIN unlocks the element. Real protection at rest, and a genuine reversal of Trezor\'s long refusal to use one.',
    watch: 'The plaintext seed is then loaded into a general-purpose STM32, where all signing happens. Malware on that chip can read it straight out of memory.'
  },
  {
    id: 'tsafe5', photo: 'images/devices/trezor-safe-5.avif', name: 'Trezor Safe 5', meta: 'USB-C · colour touchscreen · EAL6+ element', se: 5.0, scr: 8.5, inp: 8.5, ent: 7.0, os: 9.0,
    seNote: 'EAL6+, but seed leaves it', scrNote: 'colour touchscreen, Gorilla Glass', inpNote: 'touch, PIN entered on device', entNote: 'SE-assisted, MCU-side mixing', osNote: 'firmware published, reproducible',
    note: 'Gorilla Glass and a full touchscreen make this the easiest Trezor to live with, and taking the PIN on the device rather than a host-rendered grid is a real step forward.',
    watch: 'Architecturally the Safe 3. The secure element holds only a key that decrypts the seed; the plaintext seed is then loaded into a general-purpose STM32 where all signing happens. No significant security gain over its predecessor.'
  },
  {
    id: 'tsafe7', photo: 'images/devices/trezor-safe-7.png', name: 'Trezor Safe 7', meta: 'touchscreen · TROPIC01 element', rated: false,
    note: 'Carries TROPIC01 branding — Tropic Square\'s auditable secure element, the first serious attempt at the open-source-versus-certified-silicon trade-off this methodology describes.',
    watch: 'The decisive question is unanswered: does signing run on TROPIC01, or is the plaintext seed still loaded into a general-purpose MCU as on the Safe 3 and Safe 5? The answer moves this device to either end of the sheet.'
  },

  {
    id: 'keepkey', photo: 'images/devices/keepkey.webp', name: 'KeepKey', meta: 'USB · no element · legacy', se: 1.0, scr: 6.5, inp: 6.0, ent: 4.5, os: 8.0,
    seNote: 'none', scrNote: 'mono display', inpNote: 'single button, host PIN grid', entNote: 'MCU RNG, no certified silicon', osNote: 'open, Trezor-derived',
    note: 'Large display for its era, but architecturally a general-purpose chip holding a seed.',
    watch: 'Kraken Security Labs documented seed extraction from this device — the same class of attack that applies to any wallet without a secure element.'
  },

  {
    id: 'ccmk4', photo: 'images/devices/coldcard-mk4.png', name: 'ColdCard Mk4', meta: 'air-gapped · microSD · dual element', se: 6.5, scr: 8.0, inp: 8.5, ent: 8.0, os: 9.0,
    seNote: 'two elements, seed leaves to sign', scrNote: 'mono, full address', inpNote: 'keypad, PIN on device', entNote: 'dual-element generation', osNote: 'source-available, reproducible',
    note: 'Two secure elements and a protocol that protects the seed between them and the STM32. Strongly protected at rest.',
    watch: 'To sign, the seed enters the general-purpose chip. A read-only bootloader hashes the firmware for an element to verify — so the guarantee rests on the STM32 being genuinely read-only.'
  },

  {
    id: 'keystone3', photo: 'images/devices/keystone-3-pro.png', name: 'Keystone 3 Pro', meta: 'QR air-gap · touchscreen · three elements', se: 6.0, scr: 8.5, inp: 8.0, ent: 8.0, os: 6.5,
    seNote: 'three elements, seed leaves to sign', scrNote: 'large color touchscreen', inpNote: 'touch, PIN on device', entNote: 'multi-element generation', osNote: 'partly open, gaps remain',
    note: 'Three secure elements used for seed generation and storage, with a large touchscreen that renders full transaction detail.',
    watch: 'Like Passport and ColdCard, it transfers the seed to a non-secure chip for transaction signing.'
  },

  {
    id: 'onekeypro', photo: 'images/devices/onekey-pro.png', name: 'OneKey Pro', meta: 'touchscreen · camera · USB-C', rated: false,
    note: 'Large colour touchscreen with a rear camera, and an on-device network/account selector. A separate product from the OneKey Touch scored above.',
    watch: 'Unassessed. OneKey Touch scores 1.5 on secure element because it has none — whether the Pro changes that, and where signing runs, is the first thing to establish.'
  },
  {
    id: 'onekey1s', photo: 'images/devices/onekey-1s.webp', name: 'OneKey Classic 1S', meta: 'transparent shell · buttons · OLED', rated: false,
    note: 'Transparent case over a mono OLED and four physical buttons, so the board itself is visible — unusual, and in keeping with an open-hardware posture.',
    watch: 'Unassessed. Needs the same answers as the rest of the OneKey line: is there a certified secure element, and does the seed ever leave it?'
  },

  {
    id: 'coolwalletgo', photo: 'images/devices/coolwallet-go.webp', name: 'CoolWallet Go', meta: 'card · Bluetooth', rated: false,
    note: 'Card-format wallet, a separate product from the CoolWallet S scored above.',
    watch: 'Unassessed. The CoolWallet S scores 2.5 on trusted input because its PIN is entered on the phone — whether the Go moves that on-device, and whether it has any display, decides most of its score.'
  },
  {
    id: 'coolwalletpro', photo: 'images/devices/coolwallet-pro.png', name: 'CoolWallet Pro', meta: 'card · e-ink · fingerprint', rated: false,
    note: 'Card format with an on-device e-ink display and a fingerprint sensor — both absent or delegated to the phone on the CoolWallet S scored above.',
    watch: 'Unassessed. If the display and fingerprint reader are driven from the secure element, this answers the two failings the CoolWallet S is marked down for. If they are not, it does not.'
  },
  {
    id: 'bitkey', photo: 'images/devices/bitkey.png', name: 'Bitkey', meta: 'NFC · fingerprint · no display', se: 7.5, scr: 0.5, inp: 3.0, ent: 7.5, os: 7.5,
    seNote: 'certified element', scrNote: 'no display at all', inpNote: 'fingerprint on device only', entNote: 'certified SE generation', osNote: 'firmware published',
    note: 'Pairs a software wallet for routine transactions with hardware for large ones — a sound split, and the firmware is public.',
    watch: 'The hardware half has no display, so there is nothing on which to visually confirm what you are approving.'
  },
  {
    id: 'dcent', photo: 'images/devices/dcent-bio.webp', name: "D'CENT Biometric", meta: 'Bluetooth · fingerprint · OLED', rated: false,
    note: 'On-device OLED display, with input taken on the device via a fingerprint sensor and physical buttons rather than delegated to the phone.',
    watch: 'Needs verifying: secure-element grade, whether signing runs inside it or on a general-purpose MCU, entropy handling, and how much of the stack is published.'
  },
  {
    id: 'dcentx', photo: 'images/devices/dcent-x.webp', name: "D'CENT X", meta: 'USB-C · side button', rated: false,
    note: 'Added at the maintainer\'s request. No display is visible on the front face; a single control sits on the right edge.',
    watch: 'Unassessed. If there is no trusted screen, the trusted-screen and trusted-input scores are the ones that will decide this device — as they did for Arculus and Bitkey.'
  },
  {
    id: 'dcents', photo: 'images/devices/dcent-s.webp', name: "D'CENT S", meta: 'form factor to confirm', rated: false,
    note: 'Added at the maintainer\'s request. Architecture not yet established.',
    watch: 'Unassessed. Nothing about this device has been verified against the five properties.'
  },
  {
    id: 'arculus', photo: 'images/devices/arculus-card.webp', name: 'Arculus', meta: 'card · NFC · no display', se: 7.5, scr: 0.5, inp: 1.0, ent: 7.5, os: 2.5,
    seNote: 'certified smartcard element', scrNote: 'no display', inpNote: 'tap only, PIN on phone', entNote: 'secure in-element generation', osNote: 'closed',
    note: 'Genuinely strong silicon in a card body, with multi-factor authentication and secure seed generation.',
    watch: 'No trusted screen and no trusted input. Every confirmation is delegated to the phone, so users inherit every vulnerability in the mobile app.'
  },
  {
    id: 'seedsigner', photo: 'images/devices/seedsigner.png', name: 'SeedSigner', meta: 'QR air-gap · DIY · stateless', rated: false,
    note: 'Open-source, self-assembled, and air-gapped by QR only. Its defining choice is statelessness: the seed is entered per session and nothing is retained when power is removed, so there is no stored secret for an attacker to extract.',
    watch: 'Unassessed, and it strains the rubric. The secure-element criterion asks how well a stored seed is protected — this device stores none, but runs on a general-purpose SoC while the seed is in memory. Whether that scores near the top or near the bottom is a judgement about your threat model, not a reading of a datasheet.'
  },
  {
    id: 'jadeplus', photo: 'images/devices/jade-plus.png', name: 'Blockstream Jade Plus', meta: 'colour display · camera · open source', rated: false,
    note: 'Blockstream\'s open-source signer, with an on-device colour display, a camera for air-gapped QR flows, and physical input on the device rather than the phone.',
    watch: 'Unassessed, and the interesting question is what stands in for a secure element. The Jade line has used a PIN scheme that involves a remote server in unlocking an encrypted seed rather than certified silicon — that is a third architecture this rubric does not yet describe, and it needs establishing for this model before any score is meaningful.'
  }
];

const SORT_KEYS = {
  secure: 'se',
  screen: 'scr',
  input: 'inp',
  entropy: 'ent',
  open: 'os'
};

const COLUMNS = [
  { key: 'se', note: 'seNote', label: 'SECURE ELEMENT' },
  { key: 'scr', note: 'scrNote', label: 'TRUSTED SCREEN' },
  { key: 'inp', note: 'inpNote', label: 'TRUSTED INPUT' },
  { key: 'ent', note: 'entNote', label: 'ENTROPY' },
  { key: 'os', note: 'osNote', label: 'OPEN SOURCE' }
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

// A device with no sourced assessment carries rated: false and no score fields.
const isRated = (w) => w.rated !== false;

const score = (w) => (isRated(w) ? (w.se + w.scr + w.inp + w.ent + w.os) / 5 : null);

const tier = (v) => (v >= 9 ? 'STRONG' : v >= 8 ? 'SOUND' : v >= 6.5 ? 'MIXED' : 'WEAK');

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function visibleWallets() {
  const q = state.query.trim().toLowerCase();
  const key = SORT_KEYS[state.sort];
  return WALLETS
    .filter((w) => !q || w.name.toLowerCase().includes(q) || w.meta.toLowerCase().includes(q))
    .sort((a, b) => {
      // Unrated devices sort last under every key, never interleaved with scores.
      if (isRated(a) !== isRated(b)) return isRated(a) ? -1 : 1;
      if (!isRated(a) || state.sort === 'name') return a.name.localeCompare(b.name);
      if (key) return b[key] - a[key];
      return score(b) - score(a);
    });
}

function scoreCell(w, col) {
  if (!isRated(w)) {
    return `
    <div class="cell-score">
      <span class="cell-label">${col.label}</span>
      <div class="value">—</div>
      <div class="note">not assessed</div>
    </div>`;
  }
  const value = w[col.key];
  return `
    <div class="cell-score">
      <span class="cell-label">${col.label}</span>
      <div class="value">${value.toFixed(1)}</div>
      <div class="bar"><span style="width: ${value * 10}%"></span></div>
      <div class="note">${esc(w[col.note])}</div>
    </div>`;
}

function devicePhoto(w) {
  if (!w.photo) return '<div class="device-photo">DEVICE<br>PHOTO</div>';
  return `<img class="device-photo-img" src="${esc(w.photo)}" alt="${esc(w.name)}" loading="lazy">`;
}

function rowMarkup(w) {
  const overall = score(w);
  const isOpen = state.open === w.id;
  return `
    <div class="row${isOpen ? ' is-open' : ''}${isRated(w) ? '' : ' is-unrated'}">
      <div class="grid-row row-main" role="button" tabindex="0" data-id="${w.id}"
           aria-expanded="${isOpen}" aria-controls="teardown-${w.id}">
        <div class="cell-device">
          ${devicePhoto(w)}
          <div style="min-width: 0;">
            <div class="device-name">${esc(w.name)}</div>
            <div class="device-meta">${esc(w.meta)}</div>
          </div>
        </div>
        ${COLUMNS.map((col) => scoreCell(w, col)).join('')}
        <div class="cell-total">
          <span class="cell-label">COMPOSITE</span>
          <div class="value">${isRated(w) ? overall.toFixed(1) : '—'}</div>
          <div class="tier">${isRated(w) ? tier(overall) : 'NOT RATED'}</div>
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

// A photo that has not been added yet falls back to the placeholder rather
// than showing a broken image. Error events do not bubble, so capture.
els.rows.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG' || !img.classList.contains('device-photo-img')) return;
  const ph = document.createElement('div');
  ph.className = 'device-photo';
  ph.innerHTML = 'DEVICE<br>PHOTO';
  img.replaceWith(ph);
}, true);

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
