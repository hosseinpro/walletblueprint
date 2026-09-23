/* walletblueprint.com — comparison sheet */

const WALLETS = [
  {
    id: 'lnsp', photo: 'images/devices/ledger-nano-s-plus.webp', name: 'Ledger Nano S Plus', meta: 'USB-C · ST33 element · buttons in SE', se: 9.5, scr: 9.0, inp: 9.0, ent: 9.0,
    seNote: 'certified ST33, seed in-element', scrNote: 'display driver inside SE', inpNote: 'button handling inside SE', entNote: 'certified SE key generation', osNote: 'SDK and app open; every seed-touching layer closed',
    osLayers: {
      seFw:     { state: 'nda',    note: 'Ledger OS is closed; the ST supplier agreement legally prevents publishing the low-level code', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      deviceFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S — Apache-2.0, archived in 2017 — and nothing since for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:    { state: 'closed', note: 'the only board design Ledger ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      sdk:      { state: 'open',   note: 'ledger-secure-sdk is Apache-2.0 and you build it yourself, so there is no vendor binary to reconcile', src: 'https://github.com/LedgerHQ/ledger-secure-sdk' },
      app:      { state: 'source', note: 'Ledger Live is MIT and fully published, but builds are not reproducible', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'The ST33 has enough I/O for Ledger to pull the display driver and button handling into the secure element itself, which makes manipulating what is shown, or faking a press, substantially harder.',
    watch: 'An MCU still handles USB. Kraken Security Labs showed it could be overwritten before delivery — patched, but the MCU remains the softest part of the device.'
  },
  {
    id: 'lnx', photo: 'images/devices/ledger-nano-x.webp', name: 'Ledger Nano X', meta: 'USB-C · Bluetooth · ST33 element', se: 9.5, scr: 9.0, inp: 9.0, ent: 9.0,
    seNote: 'certified ST33, seed in-element', scrNote: 'display driver inside SE', inpNote: 'button handling inside SE', entNote: 'certified SE key generation', osNote: 'SDK and app open; every seed-touching layer closed',
    osLayers: {
      seFw:     { state: 'nda',    note: 'closed, except a dashboard-only export from one 2023 build under a non-open licence, unchanged since', src: 'https://github.com/LedgerHQ/ledger-secure-os/blob/main/LICENSE.md' },
      deviceFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S — Apache-2.0, archived in 2017 — and nothing since for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:    { state: 'closed', note: 'the only board design Ledger ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      sdk:      { state: 'open',   note: 'ledger-secure-sdk is Apache-2.0 and you build it yourself, so there is no vendor binary to reconcile', src: 'https://github.com/LedgerHQ/ledger-secure-sdk' },
      app:      { state: 'source', note: 'Ledger Live is MIT and fully published, but builds are not reproducible', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Architecturally the Nano S Plus with Bluetooth added. Same ST33, same display and button handling inside the secure element.',
    watch: 'Bluetooth widens what the remaining MCU is exposed to. NFC would remove the need for a battery and is already supported by the ST33.'
  },
  {
    id: 'lstax', photo: 'images/devices/ledger-stax.webp', name: 'Ledger Stax', meta: 'USB-C · Bluetooth · e-ink', se: 9.0, scr: 8.5, inp: 8.5, ent: 8.5,
    seNote: 'certified element, detail scarce', scrNote: 'large e-ink, likely SE-driven', inpNote: 'touch, likely SE-driven', entNote: 'certified SE key generation', osNote: 'SDK and app open; every seed-touching layer closed',
    osLayers: {
      seFw:     { state: 'nda',    note: 'closed Ledger OS on the ST33K1M5C; no Stax export exists', src: 'https://github.com/LedgerHQ/ledger-secure-os' },
      deviceFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S — Apache-2.0, archived in 2017 — and nothing since for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:    { state: 'closed', note: 'the only board design Ledger ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      sdk:      { state: 'open',   note: 'ledger-secure-sdk is Apache-2.0 and you build it yourself, so there is no vendor binary to reconcile', src: 'https://github.com/LedgerHQ/ledger-secure-sdk' },
      app:      { state: 'source', note: 'Ledger Live is MIT and fully published, but builds are not reproducible', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Solves the user-experience problem, but public technical detail is thin. On what is available it appears to share the Nano X architecture, MCU included.',
    watch: 'Scored below the Nano X only because the architecture is inferred rather than documented.'
  },
  {
    id: 'lflex', photo: 'images/devices/ledger-flex.webp', name: 'Ledger Flex', meta: 'USB-C · Bluetooth · e-ink touch', se: 9.0, scr: 8.5, inp: 8.5, ent: 8.5,
    seNote: 'certified element, seed in-element', scrNote: 'e-ink, driven through the element', inpNote: 'touch routed via the element', entNote: 'certified SE key generation', osNote: 'SDK and app open; every seed-touching layer closed',
    osLayers: {
      seFw:     { state: 'nda',    note: 'closed Ledger OS on the ST33K1M5C; no Flex export exists', src: 'https://github.com/LedgerHQ/ledger-secure-os' },
      deviceFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S — Apache-2.0, archived in 2017 — and nothing since for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:    { state: 'closed', note: 'the only board design Ledger ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      sdk:      { state: 'open',   note: 'ledger-secure-sdk is Apache-2.0 and you build it yourself, so there is no vendor binary to reconcile', src: 'https://github.com/LedgerHQ/ledger-secure-sdk' },
      app:      { state: 'source', note: 'Ledger Live is MIT and fully published, but builds are not reproducible', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Ledger\'s e-ink touchscreen device. Ledger documents the display and touch controller as driven through the secure element rather than the connectivity MCU — the same direction of travel as the Nano S Plus.',
    watch: 'Released after the 2024 analysis and not covered by it. Scored by extrapolation from the Stax and Nano X architecture, not from independent verification.'
  },
  {
    id: 'lgen5', photo: 'images/devices/ledger-nano-gen5.webp', name: 'Ledger Nano Gen5', meta: 'e-ink touch · fingerprint sensor', rated: false,
    note: 'E-ink touchscreen with an on-device fingerprint sensor. Released after the 2024 analysis.',
    watch: 'Needs verifying before it can be scored: secure-element part, what drives the display and touch controller, where the fingerprint template is held, and whether a general-purpose MCU remains in the signing path.'
  },

  {
    id: 'tsafe3', photo: 'images/devices/trezor-safe-3.webp', name: 'Trezor Safe 3', meta: 'USB-C · EAL6+ element · open firmware', se: 5.0, scr: 7.5, inp: 7.5, ent: 7.0,
    seNote: 'EAL6+, but seed leaves it', scrNote: 'mono, on-device, MCU-driven', inpNote: 'buttons, PIN on device', entNote: 'SE-assisted, MCU-side mixing', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    osLayers: {
      seFw:     { state: 'closed', note: 'the Optiga Trust M is fixed-function silicon programmed by Infineon; Trezor calls it NDA-free, never open', src: 'https://trezor.io/learn/security-privacy/how-trezor-keeps-you-safe/secure-elements-in-trezor-safe-devices' },
      deviceFw: { state: 'open',   note: 'boardloader, bootloader and firmware GPL-3.0, reproducible to a byte-identical image, and hash-checked by Suite on every connect', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      board:    { state: 'source', note: 'CERN-OHL-S-2.0 with OSHWA certification, but only a BOM and PNG schematics — no editable CAD, no gerbers', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_3' },
      sdk:      { state: 'source', note: 'the Python library is LGPL-3.0, but the flagship @trezor/connect sits under the reference-only T-RSL', src: 'https://github.com/trezor/trezor-firmware/blob/main/python/COPYING' },
      app:      { state: 'source', note: 'Trezor Suite is source-available under the T-RSL, not an open-source licence, and is not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'The secure element holds a key that decrypts the seed; the PIN unlocks the element. Real protection at rest, and a genuine reversal of Trezor\'s long refusal to use one.',
    watch: 'The plaintext seed is then loaded into a general-purpose STM32, where all signing happens. Malware on that chip can read it straight out of memory.'
  },
  {
    id: 'tsafe5', photo: 'images/devices/trezor-safe-5.avif', name: 'Trezor Safe 5', meta: 'USB-C · colour touchscreen · EAL6+ element', se: 5.0, scr: 8.5, inp: 8.5, ent: 7.0,
    seNote: 'EAL6+, but seed leaves it', scrNote: 'colour touchscreen, Gorilla Glass', inpNote: 'touch, PIN entered on device', entNote: 'SE-assisted, MCU-side mixing', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    osLayers: {
      seFw:     { state: 'closed', note: 'same Optiga Trust M as the Safe 3; proprietary on-chip software', src: 'https://trezor.io/learn/security-privacy/how-trezor-keeps-you-safe/secure-elements-in-trezor-safe-devices' },
      deviceFw: { state: 'open',   note: 'boardloader, bootloader and firmware GPL-3.0, reproducible to a byte-identical image, and hash-checked by Suite on every connect', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      board:    { state: 'source', note: 'CERN-OHL-S-2.0 PDF schematics and renders only — no BOM, unlike the Safe 3', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_5' },
      sdk:      { state: 'source', note: 'the Python library is LGPL-3.0, but the flagship @trezor/connect sits under the reference-only T-RSL', src: 'https://github.com/trezor/trezor-firmware/blob/main/python/COPYING' },
      app:      { state: 'source', note: 'Trezor Suite is source-available under the T-RSL, not an open-source licence, and is not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'Gorilla Glass and a full touchscreen make this the easiest Trezor to live with, and taking the PIN on the device rather than a host-rendered grid is a real step forward.',
    watch: 'Architecturally the Safe 3. The secure element holds only a key that decrypts the seed; the plaintext seed is then loaded into a general-purpose STM32 where all signing happens. No significant security gain over its predecessor.'
  },
  {
    id: 'tsafe7', photo: 'images/devices/trezor-safe-7.png', name: 'Trezor Safe 7', meta: 'touchscreen · TROPIC01 element', rated: false,
    note: 'Carries TROPIC01 branding — Tropic Square\'s auditable secure element, the first serious attempt at the open-source-versus-certified-silicon trade-off this methodology describes.',
    watch: 'The decisive question is unanswered: does signing run on TROPIC01, or is the plaintext seed still loaded into a general-purpose MCU as on the Safe 3 and Safe 5? The answer moves this device to either end of the sheet.'
  },

  {
    id: 'keepkey', photo: 'images/devices/keepkey.webp', name: 'KeepKey', meta: 'USB · no element · legacy', se: 1.0, scr: 6.5, inp: 6.0, ent: 4.5,
    seNote: 'none', scrNote: 'mono display', inpNote: 'single button, host PIN grid', entNote: 'MCU RNG, no certified silicon', osNote: 'no element; firmware open, board claim unsupported',
    osLayers: {
      seFw:     { state: 'na',     note: 'no secure element; everything runs on a commodity STM32F205' },
      deviceFw: { state: 'source', note: 'firmware and bootloader LGPLv3, pinned-Docker build matches the release; no on-device attestation of the running image', src: 'https://github.com/keepkey/keepkey-firmware' },
      board:    { state: 'closed', note: 'vendor advertises schematics, PCB and BOM, but the linked repo is a community guide to building a lookalike from dev boards', src: 'https://github.com/keepkey/keepkey-diy' },
      sdk:      { state: 'source', note: 'python-keepkey and device-protocol published under LGPL-3.0 and MIT', src: 'https://github.com/keepkey' },
      app:      { state: 'source', note: 'keepkey-desktop GPL-3.0; the current vault app carries no licence file and no reproducible build', src: 'https://github.com/keepkey/keepkey-vault' }
    },
    note: 'Large display for its era, but architecturally a general-purpose chip holding a seed.',
    watch: 'Kraken Security Labs documented seed extraction from this device — the same class of attack that applies to any wallet without a secure element.'
  },

  {
    id: 'ccmk4', photo: 'images/devices/coldcard-mk4.png', name: 'ColdCard Mk4', meta: 'air-gapped · microSD · dual element', se: 6.5, scr: 8.0, inp: 8.5, ent: 8.0,
    seNote: 'two elements, seed leaves to sign', scrNote: 'mono, full address', inpNote: 'keypad, PIN on device', entNote: 'dual-element generation', osNote: 'firmware reproducible; elements and app closed',
    osLayers: {
      seFw:     { state: 'closed', note: 'both elements are fixed-function parts whose on-die code is chip-vendor proprietary; no Coinkite code runs on them', src: 'https://blog.coinkite.com/understanding-mk4-security-model/' },
      deviceFw: { state: 'open',   note: 'firmware and bootloader published with a Docker reproducible build, and the element checksums flash to drive the GENUINE light through circuitry software cannot override', src: 'https://github.com/Coldcard/firmware' },
      board:    { state: 'source', note: 'schematics and BOM published, but commercial use is not licensed and the files carry no currency guarantee', src: 'https://github.com/Coldcard/firmware/tree/master/hardware' },
      sdk:      { state: 'source', note: 'ckcc-protocol published under the same source-available terms; no build verification for the published package', src: 'https://github.com/Coldcard/ckcc-protocol' },
      app:      { state: 'na',     note: 'no first-party wallet app; driven by third-party software over PSBT' }
    },
    note: 'Two secure elements and a protocol that protects the seed between them and the STM32. Strongly protected at rest.',
    watch: 'To sign, the seed enters the general-purpose chip. A read-only bootloader hashes the firmware for an element to verify — so the guarantee rests on the STM32 being genuinely read-only.'
  },

  {
    id: 'keystone3', photo: 'images/devices/keystone-3-pro.png', name: 'Keystone 3 Pro', meta: 'QR air-gap · touchscreen · three elements', se: 6.0, scr: 8.5, inp: 8.0, ent: 8.0,
    seNote: 'three elements, seed leaves to sign', scrNote: 'large color touchscreen', inpNote: 'touch, PIN on device', entNote: 'multi-element generation', osNote: 'published widely, but nothing verifiable end to end',
    osLayers: {
      seFw:     { state: 'closed', note: 'vendor concedes element firmware cannot be opened, and the elements are where the recovery phrase and fingerprint live', src: 'https://blog.keyst.one/inside-the-vault-how-keystone-3-pro-secures-your-crypto-with-triple-se-chips' },
      deviceFw: { state: 'source', note: 'MIT firmware and bootloader, but a pre-compiled vendor library is baked in and the release artefact never matches the rebuild byte for byte', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/docs/verify.md' },
      board:    { state: 'source', note: 'schematics and BOM as PDFs only; no layout or fabrication files', src: 'https://github.com/KeystoneHQ/keystone3-firmware/tree/master/hardware' },
      sdk:      { state: 'source', note: 'public SDKs for web, mobile and Rust under ISC', src: 'https://github.com/KeystoneHQ/keystone-sdk-web' },
      app:      { state: 'closed', note: 'the Keystone Nexus companion app has no public source in the vendor org' }
    },
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
    id: 'bitkey', photo: 'images/devices/bitkey.png', name: 'Bitkey', meta: 'NFC · fingerprint · no display', se: 7.5, scr: 0.5, inp: 3.0, ent: 7.5,
    seNote: 'certified element', scrNote: 'no display at all', inpNote: 'fingerprint on device only', entNote: 'certified SE generation', osNote: 'broadly published, not reproducibly buildable',
    osLayers: {
      seFw:     { state: 'unknown', note: 'no published description of a discrete element with its own applet; the firmware tree is an MCU codebase', src: 'https://github.com/proto-at-block/bitkey/tree/main/firmware' },
      deviceFw: { state: 'source',  note: 'MIT, but a contractually withheld fingerprint-matching library means external parties cannot build it', src: 'https://github.com/proto-at-block/bitkey/tree/main/firmware' },
      board:    { state: 'source',  note: 'main-logic-board schematic published as a PDF; no layout files, no BOM, no open-hardware licence', src: 'https://github.com/proto-at-block/bitkey' },
      sdk:      { state: 'na',      note: 'closed first-party product with no third-party integration SDK' },
      app:      { state: 'source',  note: 'Android app MIT and ships a harness that rebuilds and diffs the installed APK; iOS not yet published', src: 'https://github.com/proto-at-block/bitkey/blob/main/app/verifiable-build/android/README.md' }
    },
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
    id: 'arculus', photo: 'images/devices/arculus-card.webp', name: 'Arculus', meta: 'card · NFC · no display', se: 7.5, scr: 0.5, inp: 1.0, ent: 7.5,
    seNote: 'certified smartcard element', scrNote: 'no display', inpNote: 'tap only, PIN on phone', entNote: 'secure in-element generation', osNote: 'closed at every layer',
    osLayers: {
      seFw:     { state: 'closed', note: 'proprietary; keys generated and stored on the element with nothing published', src: 'https://walletscrutiny.com/hardware/arculus/' },
      deviceFw: { state: 'closed', note: 'the card is a smartcard, so the applet is the firmware — same closed status', src: 'https://walletscrutiny.com/hardware/arculus/' },
      board:    { state: 'closed', note: 'no schematics, inlay design or BOM published' },
      sdk:      { state: 'closed', note: 'a partner SDK exists but the developer portal returns 401; source is not published', src: 'https://www.composecure.com/arculus' },
      app:      { state: 'closed', note: 'store distribution only, no source' }
    },
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

// ---------------------------------------------------------------------------
// Open source, by layer.
//
// "Open source" as one bit is useless: a vendor can publish a phone app and a
// schematic while the code that touches the seed stays closed. Layers are
// weighted by proximity to the seed, and the weights sum to 10 — so a layer's
// weight IS the number of points it can earn. A layer scores 0%, 50% or 100% of
// its weight: a 4-point secure element earns 0, 2 or 4.
// ---------------------------------------------------------------------------

const OS_LAYERS = [
  { key: 'seFw',     weight: 4, label: 'SECURE ELEMENT FIRMWARE' },
  { key: 'deviceFw', weight: 2, label: 'DEVICE FIRMWARE + BOOTLOADER' },
  { key: 'board',    weight: 2, label: 'BOARD DESIGN / SCHEMATICS' },
  { key: 'sdk',      weight: 1, label: 'SDK' },
  { key: 'app',      weight: 1, label: 'COMPANION APP' }
];

// closed, nda and unknown all score zero — the site's rule is that a claim which
// cannot be verified is scored as absent — but they mean different things and
// are labelled differently. level: null marks a layer the product does not have.
const OS_STATES = {
  open:    { level: 1.0,  label: 'REPRODUCIBLE',   cls: 'is-open' },
  source:  { level: 0.5,  label: 'SOURCE ONLY',    cls: 'is-partial' },
  closed:  { level: 0.0,  label: 'CLOSED',         cls: 'is-closed' },
  nda:     { level: 0.0,  label: 'NDA-BOUND',      cls: 'is-closed' },
  unknown: { level: 0.0,  label: 'UNVERIFIED',     cls: 'is-unknown' },
  na:      { level: null, label: 'NOT APPLICABLE', cls: 'is-na' }
};

const osState = (entry) => OS_STATES[entry && entry.state] || OS_STATES.unknown;

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

// Only https/http survive; esc() escapes markup but would happily pass through
// a javascript: scheme. Data is author-controlled, but the guard is one line.
function safeUrl(u) {
  return typeof u === 'string' && /^https?:\/\//i.test(u) ? u : null;
}

// Layered devices derive their open-source score; un-migrated ones keep the flat
// `os` number. Where both exist, osLayers wins and `os` is ignored.
function osScore(w) {
  if (!isRated(w)) return null;
  if (!w.osLayers) return w.os;

  let earned = 0;
  let possible = 0;
  for (const layer of OS_LAYERS) {
    const { level } = osState(w.osLayers[layer.key]);
    if (level === null) continue;          // layer absent from the product
    earned += level * layer.weight;
    possible += layer.weight;
  }
  if (!possible) return 0;
  // Rescale over applicable weight only, so a device is not penalised twice for
  // lacking a component the SECURE ELEMENT column already marks it down for.
  return Math.round((10 * earned / possible) * 10) / 10;
}

// Single accessor for every score read, so `os` can be flat or derived.
const metric = (w, key) => (key === 'os' ? osScore(w) : w[key]);

const score = (w) =>
  (isRated(w) ? (w.se + w.scr + w.inp + w.ent + osScore(w)) / 5 : null);

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
      if (key) return metric(b, key) - metric(a, key);
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
  const value = metric(w, col.key);
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

function osSourceLink(entry) {
  const url = safeUrl(entry && entry.src);
  if (!url) return '';
  let label = entry.srcLabel;
  if (!label) {
    try {
      label = new URL(url).hostname.replace(/^www\./, '').toUpperCase();
    } catch {
      return '';
    }
  }
  return ` <a class="os-src" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} \u2197</a>`;
}

function osLayerRow(w, layer) {
  const entry = w.osLayers[layer.key];
  const st = osState(entry);
  const pts = st.level === null
    ? '\u2014'
    : `${(st.level * layer.weight).toFixed(1)} / ${layer.weight.toFixed(1)}`;
  return `
        <div class="os-layer ${st.cls}">
          <div class="os-layer-name">${layer.label}</div>
          <div class="os-layer-pts">${pts}</div>
          <div class="os-layer-state">${st.label}</div>
          <div class="os-layer-note">${esc((entry && entry.note) || 'not established')}${osSourceLink(entry)}</div>
        </div>`;
}

function osBreakdown(w) {
  if (!isRated(w) || !w.osLayers) return '';

  const applicable = OS_LAYERS.filter((l) => osState(w.osLayers[l.key]).level !== null);
  const possible = applicable.reduce((n, l) => n + l.weight, 0);
  const earned = applicable.reduce(
    (n, l) => n + osState(w.osLayers[l.key]).level * l.weight, 0);
  const absent = 10 - possible;
  const total = osScore(w);

  return `
      <div class="os-breakdown">
        <div class="kicker">OPEN SOURCE \u2014 LAYER BREAKDOWN</div>
        <div class="os-layers">${OS_LAYERS.map((l) => osLayerRow(w, l)).join('')}
        </div>
        <div class="os-total">
          <span class="os-total-value">${total.toFixed(1)}</span>
          <span class="os-total-sum">${earned.toFixed(1)} of ${possible.toFixed(1)} applicable points${
            absent > 0 ? ` \u00b7 ${absent.toFixed(1)} not applicable` : ''}</span>
          <div class="bar"><span style="width: ${total * 10}%"></span></div>
        </div>
      </div>`;
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
        </div>${osBreakdown(w)}
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
