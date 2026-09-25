/* walletblueprint.com — comparison sheet */

const WALLETS = [
  {
    id: 'lnsp', photo: 'images/devices/ledger-nano-s-plus.webp', name: 'Ledger Nano S Plus', meta: 'USB-C · ST33 element · buttons in SE',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and buttons in the element; USB on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element and never exported' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with total-failure and online statistical tests in hardware', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-rapport.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S, archived in 2017', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and you build it yourself, but Ledger Live is published without a reproducible build', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'The ST33 has enough I/O for Ledger to pull the display driver and button handling into the secure element itself, which makes manipulating what is shown, or faking a press, substantially harder.',
    watch: 'An MCU still handles USB. Kraken Security Labs showed it could be overwritten before delivery — patched, but the MCU remains the softest part of the device.'
  },
  {
    id: 'lnx', photo: 'images/devices/ledger-nano-x.webp', name: 'Ledger Nano X', meta: 'USB-C · Bluetooth · ST33 element',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and buttons in the element; USB and BLE on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element and never exported' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with total-failure and online statistical tests in hardware', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-17-rapport.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S, archived in 2017', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and you build it yourself, but Ledger Live is published without a reproducible build', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Architecturally the Nano S Plus with Bluetooth added. Same ST33, same display and button handling inside the secure element.',
    watch: 'Bluetooth widens what the remaining MCU is exposed to. NFC would remove the need for a battery and is already supported by the ST33.'
  },
  {
    id: 'lstax', photo: 'images/devices/ledger-stax.webp', name: 'Ledger Stax', meta: 'USB-C · Bluetooth · e-ink',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and touch in the element; USB and BLE on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element and never exported' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with total-failure and online statistical tests in hardware', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-rapport.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S, archived in 2017', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and you build it yourself, but Ledger Live is published without a reproducible build', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Solves the user-experience problem, but public technical detail is thin. On what is available it appears to share the Nano X architecture, MCU included.',
    watch: 'Scored below the Nano X only because the architecture is inferred rather than documented.'
  },
  {
    id: 'lflex', photo: 'images/devices/ledger-flex.webp', name: 'Ledger Flex', meta: 'USB-C · Bluetooth · e-ink touch',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and touch in the element; USB and BLE on an MCU', entNote: 'certified chip, no device-level evaluation', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element and never exported' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with total-failure and online statistical tests in hardware', src: 'https://shop.ledger.com/products/ledger-flex' },
      count:  { state: 'single', note: 'inferred from the identical element and OS; no Flex-specific evaluation is published, unlike the other three', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S, archived in 2017', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and you build it yourself, but Ledger Live is published without a reproducible build', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Ledger\'s e-ink touchscreen device. Ledger documents the display and touch controller as driven through the secure element rather than the connectivity MCU — the same direction of travel as the Nano S Plus.',
    watch: 'Released after the 2024 analysis and not covered by it. Scored by extrapolation from the Stax and Nano X architecture, not from independent verification.'
  },
  {
    id: 'lgen5', photo: 'images/devices/ledger-nano-gen5.webp', name: 'Ledger Nano Gen5', meta: 'e-ink touch · fingerprint sensor',
    seNote: 'the whole wallet runs inside the element', ioNote: 'display and touch in the element; radio on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verification is an OS syscall executing on the element, with the retry counter enforced there and a wipe on exhaustion', src: 'https://donjon.ledger.com/threat-model/os-pin-security-mechanism/' },
      keygen:  { state: 'element', note: 'the seed comes from the element\u2019s own generator and derivation is a syscall; apps never see it', src: 'https://developers.ledger.com/docs/device-app/explanation/ledger-os/hardware-architecture' },
      signing: { state: 'element', note: 'signing runs in the OS crypto library inside the ST33K1M5', src: 'https://github.com/LedgerHQ/ledger-secure-sdk/blob/master/target/apex_p/include/bolos_target.h' },
      txbuild: { state: 'element', note: 'the whole coin app runs on the element \u2014 parsing, hashing and screen flow \u2014 so it is not a bare signing oracle', src: 'https://developers.ledger.com/docs/device-app/explanation/ledger-os/hardware-architecture' }
    },
    ioParts: {
      display: { state: 'element', note: 'the SDK marks this target as having an element-driven panel and the drawing primitives are element syscalls', src: 'https://github.com/LedgerHQ/ledger-secure-sdk/blob/master/Makefile.defines' },
      input:   { state: 'element', note: 'the touch controller is read by the OS on the element rather than delivered as an MCU event', src: 'https://github.com/LedgerHQ/ledger-secure-sdk/blob/master/include/syscalls.h' },
      comms:   { state: 'device', note: 'a general-purpose MCU and a separate NFC chip handle the radio and USB path', src: 'https://donjon.ledger.com/threat-model/' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33K1M5 with an AIS-31 PTG.2 generator named as a security requirement in the certification, not merely implied by the chip\u2019s EAL level', src: 'https://www.commoncriteriaportal.org/files/epfiles/SMD_ST33K1M5_ST_21_001_vB01_1.pdf' },
      count:  { state: 'single', note: 'one physical source, conditioned rather than mixed; no second chip, no host entropy and no user contribution', src: 'https://www.ledger.com/blog-coldcard-incident' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the original Nano S, archived in 2017', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and you build it yourself, but Ledger Live is published without a reproducible build', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'E-ink touchscreen with an on-device fingerprint sensor. Released after the 2024 analysis.',
    watch: 'Needs verifying before it can be scored: secure-element part, what drives the display and touch controller, where the fingerprint template is held, and whether a general-purpose MCU remains in the signing path.'
  },

  {
    id: 'tsafe3', photo: 'images/devices/trezor-safe-3.webp', name: 'Trezor Safe 3', meta: 'USB-C · EAL6+ element · open firmware',
    seNote: 'element gates the PIN, but the seed lives and signs on the MCU', ioNote: 'screen, buttons and host link all on the MCU', entNote: 'three sources, mixing readable in public source', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    seParts: {
      auth:    { state: 'element', note: 'the Optiga enforces the retry limit in hardware and withholds its share of the unlock key, though the final comparison runs on the MCU', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/storage/index.md' },
      keygen:  { state: 'outside',  note: 'seed generated on the MCU; the element only holds a key that decrypts it' },
      signing: { state: 'outside',  note: 'all signing happens on a general-purpose STM32' },
      txbuild: { state: 'outside',  note: 'transaction parsing and hashing run on the MCU' }
    },
    ioParts: {
      display: { state: 'device', note: 'a screen on the device, but driven by a general-purpose MCU' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'Optiga Trust M on a platform whose certification used AIS-31 for the generator, XORed into the MCU generator; the public report does not state a PTG class', src: 'https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/0961V4a_pdf.pdf' },
      count:  { state: 'multiple', note: 'MCU generator XORed with the element, then hashed with host-supplied bytes — readable end to end in public source. No human entropy: Trezor says user-supplied entropy is still only under consideration', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU, and that firmware is GPL-3.0, reproducible to a byte-identical image and hash-checked on every connect', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      bootFw: { state: 'open', note: 'boardloader and bootloader ship in the same repository and the same reproducible build' },
      board:  { state: 'source', note: 'CERN-OHL-S schematics and BOM, but as images and PDFs — no editable CAD and no gerbers', src: 'https://github.com/trezor/trezor-hardware' },
      host:   { state: 'source', note: 'Suite and the connect library are source-available under a reference-only licence, not an open-source one, and are not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'The secure element holds a key that decrypts the seed; the PIN unlocks the element. Real protection at rest, and a genuine reversal of Trezor\'s long refusal to use one.',
    watch: 'The plaintext seed is then loaded into a general-purpose STM32, where all signing happens. Malware on that chip can read it straight out of memory.'
  },
  {
    id: 'tsafe5', photo: 'images/devices/trezor-safe-5.avif', name: 'Trezor Safe 5', meta: 'USB-C · colour touchscreen · EAL6+ element',
    seNote: 'element gates the PIN, but the seed lives and signs on the MCU', ioNote: 'touchscreen and host link all on the MCU', entNote: 'three sources, mixing readable in public source', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    seParts: {
      auth:    { state: 'element', note: 'the Optiga enforces the retry limit in hardware and withholds its share of the unlock key, though the final comparison runs on the MCU', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/storage/index.md' },
      keygen:  { state: 'outside',  note: 'seed generated on the MCU; the element only holds a key that decrypts it' },
      signing: { state: 'outside',  note: 'all signing happens on a general-purpose STM32' },
      txbuild: { state: 'outside',  note: 'transaction parsing and hashing run on the MCU' }
    },
    ioParts: {
      display: { state: 'device', note: 'a screen on the device, but driven by a general-purpose MCU' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'Optiga Trust M on a platform whose certification used AIS-31 for the generator, XORed into the MCU generator; the public report does not state a PTG class', src: 'https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/0961V4a_pdf.pdf' },
      count:  { state: 'multiple', note: 'MCU generator XORed with the element, then hashed with host-supplied bytes — readable end to end in public source. No human entropy: Trezor says user-supplied entropy is still only under consideration', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU, and that firmware is GPL-3.0, reproducible to a byte-identical image and hash-checked on every connect', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      bootFw: { state: 'open', note: 'boardloader and bootloader ship in the same repository and the same reproducible build' },
      board:  { state: 'source', note: 'CERN-OHL-S schematics and BOM, but as images and PDFs — no editable CAD and no gerbers', src: 'https://github.com/trezor/trezor-hardware' },
      host:   { state: 'source', note: 'Suite and the connect library are source-available under a reference-only licence, not an open-source one, and are not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'Gorilla Glass and a full touchscreen make this the easiest Trezor to live with, and taking the PIN on the device rather than a host-rendered grid is a real step forward.',
    watch: 'Architecturally the Safe 3. The secure element holds only a key that decrypts the seed; the plaintext seed is then loaded into a general-purpose STM32 where all signing happens. No significant security gain over its predecessor.'
  },
  {
    id: 'tsafe7', photo: 'images/devices/trezor-safe-7.png', name: 'Trezor Safe 7', meta: 'touchscreen · TROPIC01 element',
    seNote: 'an open element that stores and rate-limits but never signs', ioNote: 'screen, touch and radio all outside the elements', entNote: 'three sources mixed, one of them certified', osNote: 'the only element firmware published on this sheet',
    warning: {
      tag: 'UNPATCHED SILICON FLAW',
      text: 'In June 2026 Ledger Donjon decapsulated the TROPIC01 element and used a laser to fault its signature verification, achieving arbitrary code execution on the chip. Tropic Square then found a further path that bypasses the hardware boundary protecting PIN material. Hardened silicon is not expected before late 2026, and the only field mitigation is disabling maintenance mode. The wallet seed is held in MCU flash rather than on this chip, so funds are not directly exposed \u2014 an attacker would still need the PIN and the other two chips.',
      src: 'https://www.tropicsquare.com/news-and-events/tropic01-security-advisory-lfi-vulnerability-disclosure-and-mitigation',
      srcLabel: 'TROPIC SQUARE ADVISORY'
    },
    seParts: {
      auth:    { state: 'element', note: 'both elements enforce the retry limit in hardware and withhold their share of the unlock key, though the final comparison runs on the MCU', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/storage/index.md' },
      keygen:  { state: 'outside', note: 'Trezor states the backup is not stored on either element; the master secret is assembled in MCU firmware and lives encrypted in MCU flash', src: 'https://trezor.io/guides/trezor-devices/trezor-safe-7/dual-secure-elements-in-trezor-safe-7' },
      signing: { state: 'outside', note: 'TROPIC01 cannot sign Bitcoin at all \u2014 it supports only NIST P-256 and Ed25519, not secp256k1 \u2014 so coin signing runs on the STM32', src: 'https://trezor.io/guides/trezor-devices/trezor-safe-7/what-is-the-tropic-01-chip' },
      txbuild: { state: 'outside', note: 'parsing, amount and address checks and sighash computation all run in MCU firmware' }
    },
    ioParts: {
      display: { state: 'device', note: 'the board definition drives the panel from the STM32\u2019s own display peripheral; neither element can drive a screen', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/models/T3W1/boards/revC.toml' },
      input:   { state: 'device', note: 'the capacitive touch controller is read over I2C by the MCU' },
      comms:   { state: 'device', note: 'Bluetooth runs on a separate radio MCU that Trezor says sits outside the secure architecture', src: 'https://trezor.io/guides/trezor-devices/trezor-fundamentals/trezor-bluetooth-connections' }
    },
    entRules: {
      source: { state: 'trng', note: 'three generators feed the pool, but only the Optiga\u2019s is independently certified \u2014 TROPIC01 declares AIS-31 compliance without holding a certificate', src: 'https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/0961V4a_pdf.pdf' },
      count:  { state: 'multiple', note: 'three hardware sources XORed with a fatal error if any fails to contribute, then hashed with host entropy \u2014 but the extra input is the host app, not the owner', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU under GPL-3.0 with a reproducible build; the published TROPIC01 firmware is notable but never touches the seed', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      bootFw: { state: 'open', note: 'boardloader and bootloader ship in the same reproducible build' },
      board:  { state: 'source', note: 'CERN-OHL-S PDF schematics for main board, UI and antenna; no BOM, no CAD, display and battery boards excluded', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_7' },
      host:   { state: 'source', note: 'Suite and the connect library under the reference-only licence, not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'Carries TROPIC01 branding — Tropic Square\'s auditable secure element, the first serious attempt at the open-source-versus-certified-silicon trade-off this methodology describes.',
    watch: 'The decisive question is unanswered: does signing run on TROPIC01, or is the plaintext seed still loaded into a general-purpose MCU as on the Safe 3 and Safe 5? The answer moves this device to either end of the sheet.'
  },

  {
    id: 'keepkey', photo: 'images/devices/keepkey.webp', name: 'KeepKey', meta: 'USB · no element · legacy',
    seNote: 'no element anywhere in the design', ioNote: 'screen, button and host link all on the MCU', entNote: 'uncertified generator, host entropy optional', osNote: 'no element; firmware open, board claim unsupported',
    seParts: {
      auth:    { state: 'outside', note: 'no secure element; the PIN is checked by the MCU against encrypted flash' },
      keygen:  { state: 'outside', note: 'no element to generate in' },
      signing: { state: 'outside', note: 'signing runs on a general-purpose STM32' },
      txbuild: { state: 'outside', note: 'everything runs on the MCU' }
    },
    ioParts: {
      display: { state: 'device', note: 'a screen on the device, but driven by a general-purpose MCU' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the STM32F205 generator peripheral read directly, with a repeat check and error-flag handling; no independent evaluation of any kind exists', src: 'https://github.com/keepkey/keepkey-firmware/blob/master/lib/rand/rng.c' },
      count:  { state: 'multiple', note: 'device entropy hashed together with host-supplied bytes — but the host contribution is optional and silently skipped when absent, leaving one source. Defaults to 12 words', src: 'https://github.com/keepkey/keepkey-firmware/blob/master/lib/firmware/reset.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'no element, so the seed lives and signs on the MCU; that firmware is LGPLv3 with a pinned-Docker build that matches the release, but nothing on the device attests what is running', src: 'https://github.com/keepkey/keepkey-firmware' },
      bootFw: { state: 'source', note: 'the bootloader ships in the same repository and the same build' },
      board:  { state: 'closed', note: 'the vendor advertises schematics, PCB and BOM, but the repository it links is a community guide to building a lookalike from dev boards', src: 'https://github.com/keepkey/keepkey-diy' },
      host:   { state: 'source', note: 'the Python library and desktop app are published, but the current vault app carries no licence file and nothing is reproducible', src: 'https://github.com/keepkey/keepkey-vault' }
    },
    note: 'Large display for its era, but architecturally a general-purpose chip holding a seed.',
    watch: 'Kraken Security Labs documented seed extraction from this device — the same class of attack that applies to any wallet without a secure element.'
  },

  {
    id: 'ccmk4', photo: 'images/devices/coldcard-mk4.png', name: 'ColdCard Mk4', meta: 'air-gapped · microSD · dual element',
    seNote: 'two elements gate the seed, but signing happens outside them', ioNote: 'screen, keypad and host link all on the MCU', entNote: 'dedicated generator, none of it independently certified', osNote: 'firmware reproducible; elements and app closed',
    warning: {
      tag: 'SEED COMPROMISED — JULY 2026',
      text: 'For five years a build error routed seed generation through a software PRNG instead of the hardware generator, leaving roughly 40 bits of entropy on Mk2 and Mk3 and 72 on Mk4 against a 128-bit target. On 30 July 2026 wallets were drained offline; TRM Labs puts the loss above 116 million dollars across more than 5,200 addresses. Fixed the next day in 5.6.0, 1.5.0Q and 4.2.0 — but updating does not repair an existing seed. Any seed generated on affected firmware must be replaced and funds moved. Seeds made from dice rolls alone were never affected.',
      src: 'https://blog.coinkite.com/coldcard-mk3-seed-generation-warning/',
      srcLabel: 'COINKITE ADVISORY'
    },
    seParts: {
      auth:    { state: 'element', note: 'PIN checked across both elements, which gate the seed' },
      keygen:  { state: 'outside',  note: 'entropy comes from the elements but the seed is assembled on the STM32' },
      signing: { state: 'outside',  note: 'the seed enters the general-purpose chip to sign' },
      txbuild: { state: 'outside',  note: 'PSBT parsing and hashing run on the MCU' }
    },
    ioParts: {
      display: { state: 'device', note: 'a screen on the device, but driven by a general-purpose MCU' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose chip handles USB, which carries a real data protocol and is enabled until switched off; the NFC hardware ships disabled', src: 'https://github.com/Coldcard/firmware/blob/master/shared/usb.py' }
    },
    entRules: {
      source: { state: 'hardware', note: 'STM32L4S5 RNG peripheral feeding a SHA-256 Hash_DRBG, with both secure elements mixed in; Coinkite publishes no independent certification of the generator', src: 'https://github.com/Coldcard/firmware/blob/master/releases/ChangeLog.md' },
      count:  { state: 'user', note: 'three device sources combined by SHA256d, then mandatory user entropy — 50 dice rolls, 128 coin flips or 65 key presses — with the result recomputable off-device', src: 'https://github.com/Coldcard/firmware/blob/master/docs/verify_seed_mix.py' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed enters the general-purpose chip to sign, and that firmware is published with a Docker reproducible build and checksummed by the elements to drive the GENUINE light', src: 'https://github.com/Coldcard/firmware' },
      bootFw: { state: 'open', note: 'the bootloader is published and factory-set read-only, with the same reproducible build' },
      board:  { state: 'source', note: 'schematics and BOM published, but commercial use is unlicensed and the files carry no currency guarantee', src: 'https://github.com/Coldcard/firmware/tree/master/hardware' },
      host:   { state: 'source', note: 'no first-party app is shipped and the device is driven by third-party open wallets; the protocol library is source-available under the same non-OSI terms', src: 'https://github.com/Coldcard/ckcc-protocol' }
    },
    note: 'Two secure elements and a protocol that protects the seed between them and the STM32. Strongly protected at rest.',
    watch: 'To sign, the seed enters the general-purpose chip. A read-only bootloader hashes the firmware for an element to verify — so the guarantee rests on that chip being genuinely read-only, and the entropy advisory above shows what a build-level mistake in the same codebase can cost.'
  },

  {
    id: 'keystone3', photo: 'images/devices/keystone-3-pro.png', name: 'Keystone 3 Pro', meta: 'QR or USB · touchscreen · three elements',
    seNote: 'elements gate access, but signing happens outside them', ioNote: 'touchscreen and camera driven by the MCU', entNote: 'three generators, none independently certified', osNote: 'published widely, but nothing verifiable end to end',
    seParts: {
      auth:    { state: 'element', note: 'PIN and fingerprint verified against the elements' },
      keygen:  { state: 'outside',  note: 'elements supply entropy, but the seed is assembled on the MH1903' },
      signing: { state: 'outside',  note: 'the seed is transferred to a non-secure chip to sign' },
      txbuild: { state: 'outside',  note: 'transaction handling runs on the MCU' }
    },
    ioParts: {
      display: { state: 'device', note: 'a screen on the device, but driven by a general-purpose MCU' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose chip handles USB, and the data stack ships enabled — the firmware default is USB on, with air-gap mode an opt-in toggle', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/src/device_settings.c' }
    },
    entRules: {
      source: { state: 'hardware', note: 'three dedicated generators across the MCU and two elements, but SP 800-90 conformance is asserted in datasheets with no validation certificate found', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/hardware/v3.2/V3.2BOM.pdf' },
      count:  { state: 'multiple', note: 'three generators chained through HKDF and seeded with a hash of the device password; the dice mode replaces device entropy rather than mixing it in', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/src/managers/keystore.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the seed is assembled and signed on the MCU under an MIT licence, but a pre-compiled vendor library is baked in and the release image never matches a rebuild', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/docs/verify.md' },
      bootFw: { state: 'source', note: 'a separate bootloader repository exists, with the same unbuildable dependency' },
      board:  { state: 'source', note: 'schematics and BOM as PDFs only; no layout or fabrication files', src: 'https://github.com/KeystoneHQ/keystone3-firmware/tree/master/hardware' },
      host:   { state: 'source', note: 'the SDKs are public under ISC, but the companion app has no public source at all', src: 'https://github.com/KeystoneHQ/keystone-sdk-web' }
    },
    note: 'Three secure elements used for seed generation and storage, with a large touchscreen that renders full transaction detail.',
    watch: 'Marketed as fully air-gapped, but the shipped firmware sets USB data on by default, with a CDC and WebUSB stack, software-wallet pairing and USB firmware updates all built in. Air-gap mode is a setting the owner must find and switch on, not the state the device arrives in.'
  },

  {
    id: 'onekeypro', photo: 'images/devices/onekey-pro.png', name: 'OneKey Pro', meta: 'touchscreen · camera · USB-C',
    seNote: 'signs on the element, but the seed is born and the transaction built outside it', ioNote: 'screen, touch and every radio on general-purpose chips', entNote: 'certified generator, single source by default', osNote: 'firmware published, element applet absent',
    seParts: {
      auth:    { state: 'element', note: 'the PIN goes to the element over an authenticated channel and the retry counter lives there \u2014 but the fingerprint is matched on the MCU inside a closed binary, which then simply asserts success to the element', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/embed/trezorhal/se_thd89.c' },
      keygen:  { state: 'outside', note: 'the mnemonic is assembled and displayed on the MCU before being imported into the element, and can be exported back out', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/src/apps/management/reset_device/__init__.py' },
      signing: { state: 'element', note: 'the private-key argument to the signing call is commented out \u2014 the element selects the key from the derivation path and takes no key at all, so the seed never comes out to sign', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/embed/extmod/modtrezorcrypto/modtrezorcrypto-secp256k1.h' },
      txbuild: { state: 'outside', note: 'parsing and sighash run on the MCU and only a 32-byte digest crosses over; the element cannot tell what it is signing', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/src/apps/bitcoin/common.py' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main microcontroller' },
      input:   { state: 'device', note: 'buttons and touch are read by the microcontroller, not the element' },
      comms:   { state: 'device', note: 'USB, Bluetooth and NFC all terminate on general-purpose chips' }
    },
    entRules: {
      source: { state: 'trng', note: 'the THD89 generator is named in the chip\u2019s certification as an AIS-31 PTG.2 physical source \u2014 one of the few here where the certification genuinely covers the generator', src: 'https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/NSCIB-CC-2400175-01-ST_lite_V1.2.pdf' },
      count:  { state: 'single', note: 'on-device setup takes everything from the element\u2019s generator; a toggle to mix in the microcontroller\u2019s generator exists but ships switched off', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/src/apps/management/reset_device/__init__.py' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the element signs and takes no key, but the seed is assembled and displayed on the MCU first; that MCU firmware is published while the element applet is absent from every public repository', src: 'https://github.com/OneKeyHQ/firmware-pro' },
      bootFw: { state: 'source', note: 'boardloader and bootloader ship in the repository, but verification means hashing the vendor prebuilt binary rather than rebuilding it', src: 'https://help.onekey.so/en/articles/12025839-verifying-onekey-pro-firmware-with-open-source-code' },
      board:  { state: 'closed', note: 'no hardware design repository exists in the vendor organisation' },
      host:   { state: 'source', note: 'the SDK is public, but the app ships under a reference-use-only licence forbidding derivatives and redistribution', src: 'https://github.com/OneKeyHQ/app-monorepo' }
    },
    note: 'Large colour touchscreen with a rear camera, and an on-device network/account selector. A separate product from the OneKey Touch scored above.',
    watch: 'Unassessed. OneKey Touch scores 1.5 on secure element because it has none — whether the Pro changes that, and where signing runs, is the first thing to establish.'
  },
  {
    id: 'onekey1s', photo: 'images/devices/onekey-1s.webp', name: 'OneKey Classic 1S', meta: 'transparent shell · buttons · OLED',
    seNote: 'signs on the element, but the seed is born and the transaction built outside it', ioNote: 'screen, buttons and radios on general-purpose chips', entNote: 'certified generator, single source on device', osNote: 'firmware published, element applet absent',
    seParts: {
      auth:    { state: 'element', note: 'the PIN is verified in the element with the counter held there, and this model has no fingerprint sensor to weaken it', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/se_chip.h' },
      keygen:  { state: 'outside', note: 'the mnemonic is built and confirmed on the MCU, then imported into the element, and remains exportable', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/reset.c' },
      signing: { state: 'element', note: 'the key-taking signing function is replaced wholesale so every curve routes into the element, which takes no key parameter', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/se_chip.c' },
      txbuild: { state: 'outside', note: 'the MCU hashes the message and passes 32 bytes to the element' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main microcontroller' },
      input:   { state: 'device', note: 'buttons and touch are read by the microcontroller, not the element' },
      comms:   { state: 'device', note: 'USB, Bluetooth and NFC all terminate on general-purpose chips' }
    },
    entRules: {
      source: { state: 'trng', note: 'the THD89 generator is named in the chip\u2019s certification as an AIS-31 PTG.2 physical source \u2014 one of the few here where the certification genuinely covers the generator', src: 'https://www.commoncriteriaportal.org/nfs/ccpfiles/files/epfiles/NSCIB-CC-2400175-01-ST_lite_V1.2.pdf' },
      count:  { state: 'single', note: 'on-device setup takes everything from the element\u2019s generator; and unlike the Pro there is no option to mix in a second source', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/master/core/src/apps/management/reset_device/__init__.py' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the element signs and takes no key, but the seed is assembled and displayed on the MCU first; that MCU firmware is published while the element applet is absent from every public repository', src: 'https://github.com/OneKeyHQ/firmware-classic1s' },
      bootFw: { state: 'source', note: 'boardloader and bootloader ship in the repository, but no reproducible-build procedure is documented for this model', src: 'https://help.onekey.so/en/articles/12025839-verifying-onekey-pro-firmware-with-open-source-code' },
      board:  { state: 'closed', note: 'no hardware design repository exists in the vendor organisation' },
      host:   { state: 'source', note: 'the SDK is public, but the app ships under a reference-use-only licence forbidding derivatives and redistribution', src: 'https://github.com/OneKeyHQ/app-monorepo' }
    },
    note: 'Transparent case over a mono OLED and four physical buttons, so the board itself is visible — unusual, and in keeping with an open-hardware posture.',
    watch: 'Unassessed. Needs the same answers as the rest of the OneKey line: is there a certified secure element, and does the seed ever leave it?'
  },

  {
    id: 'coolwalletgo', photo: 'images/devices/coolwallet-go.webp', name: 'CoolWallet Go', meta: 'card · Bluetooth',
    seNote: 'signs on the element, but nothing authorises the signature', ioNote: 'no screen and no button; the phone is the only interface', entNote: 'no source published and the chip is unnamed', osNote: 'SDK open, everything touching the seed closed',
    seParts: {
      auth:    { state: 'outside', note: 'there is no per-transaction authorisation step at all — the confirm-then-release sequence the Pro uses is explicitly unsupported', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' },
      keygen:  { state: 'element', note: 'the card can generate the seed, though the app can generate one instead and inject it', src: 'https://www.coolwallet.io/blogs/help-center/should-i-generate-my-recovery-phrases-using-the-card-or-the-app' },
      signing: { state: 'element', note: 'the same applet family signs; only the confirmation wrapper differs' },
      txbuild: { state: 'outside', note: 'a Go-only API signs a hash computed on the phone — blind hash signing is a first-class supported path', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' }
    },
    ioParts: {
      display: { state: 'host', note: 'no screen; the vendor states confirmation relies entirely on the phone app', src: 'https://www.coolwallet.io/blogs/help-center/what-is-the-difference-between-coolwallet-pro-and-coolwallet-go' },
      input:   { state: 'host', note: 'no buttons; the password is typed into the app and approval is a tap' },
      comms:   { state: 'element', note: 'the SDK rejects every MCU command for this card, so the smartcard appears to terminate NFC itself — inferred, the chip is unnamed', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' }
    },
    entRules: {
      source: { state: 'unknown', note: 'no applet source is published for this model and the chip is unnamed; the answer also depends on whether the card or the phone generated the seed' },
      count:  { state: 'unknown', note: 'no documentation of sources or mixing for this model' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'the key is generated and used on the element, and no applet source exists for this model', src: 'https://github.com/orgs/CoolBitX-Technology/repositories' },
      bootFw: { state: 'closed', note: 'nothing published' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and explicitly supports this model, but the app is closed', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' }
    },
    note: 'Card-format wallet, a separate product from the CoolWallet S scored above.',
    watch: 'Unassessed. The CoolWallet S loses its trusted I/O score because the PIN is entered on the phone — whether the Go moves that on-device, and whether it has any display at all, decides most of its score.'
  },
  {
    id: 'coolwalletpro', photo: 'images/devices/coolwallet-pro.png', name: 'CoolWallet Pro', meta: 'card · e-ink · fingerprint',
    seNote: 'keys and signing in the element, approval outside it', ioNote: 'a screen and button, both driven by the card MCU', entNote: 'hardware generator, single source, no certificate', osNote: 'applet published but unbuildable; firmware closed',
    seParts: {
      auth:    { state: 'outside', note: 'the pairing password is checked in the element, but per-transaction approval is not — the MCU issues the authorisation on the user\u2019s behalf', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      keygen:  { state: 'element', note: 'the applet generates the seed itself, though the setup flow also lets the phone generate one and inject it', src: 'https://www.coolwallet.io/blogs/help-center/should-i-generate-my-recovery-phrases-using-the-card-or-the-app' },
      signing: { state: 'element', note: 'signing runs in the applet over keys derived inside it', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      txbuild: { state: 'element', note: 'the phone sends a vendor-signed script and arguments, and the applet composes, hashes and formats the transaction itself', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' }
    },
    ioParts: {
      display: { state: 'device', note: 'the e-paper panel is rendered by the card MCU, though the text it shows is computed in the element' },
      input:   { state: 'device', note: 'the button is read by the MCU, which then tells the element to release the signature' },
      comms:   { state: 'device', note: 'Bluetooth terminated by the card MCU' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the applet asks for a hardware generator rather than a software one, but the chip is never named and no certificate is published', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      count:  { state: 'single', note: 'seed entropy comes from one call to one generator; nothing else is mixed and there is no user contribution' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the applet that generates and uses the key is genuinely published, but under a non-commercial licence with an internal crypto library withheld, so it cannot be built', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      bootFw: { state: 'closed', note: 'the MCU firmware driving Bluetooth, display and power is not published', src: 'https://walletscrutiny.com/hardware/coolwalletpro/' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and actively maintained, but the companion app is closed', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' }
    },
    note: 'Card format with an on-device e-ink display and a fingerprint sensor — both absent or delegated to the phone on the CoolWallet S scored above.',
    watch: 'Unassessed. If the display and fingerprint reader are driven from the secure element, this answers the two failings the CoolWallet S is marked down for. If they are not, it does not.'
  },
  {
    id: 'bitkey', photo: 'images/devices/bitkey.png', name: 'Bitkey', meta: 'NFC · fingerprint · no display',
    seNote: 'keys, signing and fingerprint on the device', ioNote: 'fingerprint on device, but nothing to see what you sign', entNote: 'uncertified for this part, single source', osNote: 'broadly published, not reproducibly buildable',
    seParts: {
      auth:    { state: 'element', note: 'fingerprint matched on the device before signing is released' },
      keygen:  { state: 'element', note: 'the hardware key is generated on the element' },
      signing: { state: 'element', note: 'the device signs its share of the 2-of-3' },
      txbuild: { state: 'outside',  note: 'the phone builds and hashes the transaction' }
    },
    ioParts: {
      display: { state: 'host', note: 'no display on the device — what you see comes from the phone app' },
      input:   { state: 'device', note: 'buttons or touch read by the device MCU, not the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'hardware', note: 'EFR32MG24 Secure Engine generator; the datasheet claims SP 800-90B health tests, but the PSA certificate covers other parts and does not list this one', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/lib/crypto/src/efr32/secure_rng.c' },
      count:  { state: 'single', note: 'one call to one generator, no second source and no user path; a more defensively written generator exists in the repo but runs on a controller that never touches the seed', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/lib/wallet/src/seed.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the firmware is MIT, but a contractually withheld fingerprint library means no external party can build it', src: 'https://github.com/proto-at-block/bitkey/tree/main/firmware' },
      bootFw: { state: 'source', note: 'the bootloader ships in the same tree and is blocked by the same withheld library' },
      board:  { state: 'source', note: 'a main-logic-board schematic is published as a PDF; no layout files, no BOM, no open-hardware licence', src: 'https://github.com/proto-at-block/bitkey' },
      host:   { state: 'source', note: 'the Android app is MIT and ships a harness that rebuilds and diffs the installed package, but iOS is unpublished and there is no third-party SDK', src: 'https://github.com/proto-at-block/bitkey/blob/main/app/verifiable-build/android/README.md' }
    },
    note: 'Pairs a software wallet for routine transactions with hardware for large ones — a sound split, and the firmware is public.',
    watch: 'The hardware half has no display, so there is nothing on which to visually confirm what you are approving.'
  },
  {
    id: 'dcent', photo: 'images/devices/dcent-bio.webp', name: "D'CENT Biometric", meta: 'Bluetooth · fingerprint · OLED',
    seNote: 'keys and signing in the element, parsing on the MCU', ioNote: 'screen and buttons on the device, driven by its MCU', entNote: 'nothing established about the generator', osNote: 'firmware repo holds binaries only',
    seParts: {
      auth:    { state: 'unknown', note: 'the vendor\u2019s own sources disagree — one names an ST33 holding the fingerprint, another names an NXP part, and the newer model badges in-element fingerprints as exclusive to itself', src: 'https://store.dcentwallet.com/products/dcent-x' },
      keygen:  { state: 'element', note: 'keys generated internally and stored encrypted on the chip — vendor claim, no source published' },
      signing: { state: 'element', note: 'the element holds the keys and performs the cryptographic operations', src: 'https://store.dcentwallet.com/blogs/post/coinspect-audit-of-the-d-cent-wallet' },
      txbuild: { state: 'outside', note: 'the published protocol shows the device parsing structured transaction fields — but on the STM32, which then hands the element a hash', src: 'https://github.com/DcentWallet/wcp-proto' }
    },
    ioParts: {
      display: { state: 'device', note: 'an OLED on the device, driven by the MCU that handles peripherals' },
      input:   { state: 'device', note: 'physical buttons and a fingerprint sensor, both MCU peripherals; the protocol carries a user-cancel code, so approval is genuinely on-device', src: 'https://github.com/DcentWallet/wcp-proto' },
      comms:   { state: 'device', note: 'Bluetooth and USB handled by the MCU' }
    },
    entRules: {
      source: { state: 'unknown', note: 'no statement about the generator, and the element part number is not reliably established' },
      count:  { state: 'unknown', note: 'no documentation of sources, mixing or any user contribution' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'the vendor states the secure OS that holds and uses the key is proprietary', src: 'https://walletscrutiny.com/mobile/com.kr.iotrust.dcent.wallet/' },
      bootFw: { state: 'closed', note: 'the firmware repository contains binary images only — no source, no build instructions', src: 'https://github.com/DcentWallet/biometric-firmware' },
      board:  { state: 'closed', note: 'nothing published in the vendor organisation' },
      host:   { state: 'source', note: 'the web connector is MIT and maintained, but the companion app is closed', src: 'https://github.com/DcentWallet/dcent-web-connector' }
    },
    note: 'On-device OLED display, with input taken on the device via a fingerprint sensor and physical buttons rather than delegated to the phone.',
    watch: 'Needs verifying: secure-element grade, whether signing runs inside it or on a general-purpose MCU, entropy handling, and how much of the stack is published.'
  },
  {
    id: 'dcentx', photo: 'images/devices/dcent-x.webp', name: "D'CENT X", meta: 'USB-C · side button',
    seNote: 'everything but transaction parsing claimed in the element', ioNote: 'touchscreen and fingerprint on the device', entNote: 'nothing established about the generator', osNote: 'nothing published for this model',
    seParts: {
      auth:    { state: 'element', note: 'fingerprint stored and matched in the same chip as the keys, with the retry lockout enforced there — vendor claim, weeks old and unaudited', src: 'https://store.dcentwallet.com/products/dcent-x' },
      keygen:  { state: 'element', note: 'the recovery phrase is generated by the secure chip and shown on the device screen', src: 'https://store.dcentwallet.com/products/dcent-x' },
      signing: { state: 'element', note: 'the key is isolated in the certified chip and signing is performed there' },
      txbuild: { state: 'unknown', note: 'the vendor never says whether its security OS runs on the element or a separate application processor, and no protocol is published for this model' }
    },
    ioParts: {
      display: { state: 'device', note: 'a 2.4-inch colour touchscreen — too much for a smartcard-class element to drive, so an application chip almost certainly does; inferred' },
      input:   { state: 'device', note: 'touchscreen and side fingerprint sensor, read on the device' },
      comms:   { state: 'device', note: 'Bluetooth and USB-C handled outside the element; inferred' }
    },
    entRules: {
      source: { state: 'unknown', note: 'no statement about the generator, and the element part number is not reliably established' },
      count:  { state: 'unknown', note: 'no documentation of sources, mixing or any user contribution' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'a proprietary security OS holds and uses the key; nothing is published', src: 'https://store.dcentwallet.com/products/dcent-x' },
      bootFw: { state: 'closed', note: 'nothing published for this model' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'source', note: 'the MIT web connector covers this model transports, but the app is closed', src: 'https://github.com/DcentWallet/dcent-web-connector' }
    },
    note: 'Added at the maintainer\'s request. No display is visible on the front face; a single control sits on the right edge.',
    watch: 'Unassessed. With no visible display on the front face, trusted I/O is the score that will decide this device — as it did for Arculus and Bitkey.'
  },
  {
    id: 'dcents', photo: 'images/devices/dcent-s.webp', name: "D'CENT S", meta: 'form factor to confirm',
    seNote: 'keys, signing and the PIN counter in the element', ioNote: 'no screen and no input; the phone shows everything', entNote: 'nothing established about the generator', osNote: 'nothing published for this model',
    seParts: {
      auth:    { state: 'element', note: 'the card wipes itself after repeated wrong PINs, so the counter is in the element — but with no keypad the PIN is typed into the phone, where a compromised app can capture it', src: 'https://store.dcentwallet.com/pages/dcent-s-card-wallet' },
      keygen:  { state: 'element', note: 'keys generated and encrypted inside the secure chip', src: 'https://store.dcentwallet.com/pages/dcent-s-card-wallet' },
      signing: { state: 'element', note: 'one NFC tap and the chip signs; the key never leaves the card' },
      txbuild: { state: 'unknown', note: 'no protocol is published, so whether the element receives structured fields or a bare hash is undocumented' }
    },
    ioParts: {
      display: { state: 'host', note: 'no screen on the card — the address and amount are reviewed on the phone', src: 'https://store.dcentwallet.com/pages/dcent-s-card-wallet' },
      input:   { state: 'host', note: 'no buttons and no sensor; approval is a tap and the PIN is entered in the app' },
      comms:   { state: 'element', note: 'NFC only and battery-free, so the smartcard terminates the link itself; inferred' }
    },
    entRules: {
      source: { state: 'unknown', note: 'no statement about the generator, and the element part number is not reliably established' },
      count:  { state: 'unknown', note: 'no documentation of sources, mixing or any user contribution' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'a proprietary security OS holds and uses the key; nothing is published', src: 'https://store.dcentwallet.com/pages/dcent-s-card-wallet' },
      bootFw: { state: 'closed', note: 'nothing published for this model' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'unknown', note: 'whether the published connector reaches this NFC-only card is not documented, and the app is closed' }
    },
    note: 'Added at the maintainer\'s request. Architecture not yet established.',
    watch: 'Unassessed. Nothing about this device has been verified against the four properties.'
  },
  {
    id: 'arculus', photo: 'images/devices/arculus-card.webp', name: 'Arculus', meta: 'card · NFC · no display',
    seNote: 'keys and signing on the card, but the PIN is checked on the phone', ioNote: 'no display and no on-card input', entNote: 'generator claimed but unnamed and uncheckable', osNote: 'closed at every layer',
    seParts: {
      auth:    { state: 'outside',  note: 'the PIN is entered and checked on the phone, not the card' },
      keygen:  { state: 'element', note: 'keys generated on the smartcard element' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'outside',  note: 'the phone builds and hashes the transaction' }
    },
    ioParts: {
      display: { state: 'host', note: 'no display on the device — what you see comes from the phone app' },
      input:   { state: 'host', note: 'nothing on the device records consent; the app collects it' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'unknown', note: 'a true generator is claimed, but the chip is never named and no certificate has been issued to CompoSecure — the claim cannot be checked, so it is scored as absent', src: 'https://www.commoncriteriaportal.org/products/certified_products.csv' },
      count:  { state: 'single', note: 'the card returns a mnemonic from a call whose only input is the word count; the phone contributes nothing, and 12 words is the default', src: 'https://github.com/ByneappLLC/arculus-sdk-flutter/blob/main/android/src/main/cpp/include/csdk.h' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'the smartcard applet generates and uses the key and nothing about it is published', src: 'https://walletscrutiny.com/hardware/arculus/' },
      bootFw: { state: 'closed', note: 'no bootloader or supporting firmware published; the applet ships locked and non-updatable' },
      board:  { state: 'closed', note: 'no schematics, inlay design or bill of materials published' },
      host:   { state: 'closed', note: 'the SDK is partner-gated behind an authentication wall and the app is store-only', src: 'https://www.composecure.com/arculus' }
    },
    note: 'Genuinely strong silicon in a card body, with multi-factor authentication and secure seed generation.',
    watch: 'Nothing on the card shows you what you are signing, and nothing on it records your consent. Every confirmation is delegated to the phone, so users inherit every vulnerability in the mobile app.'
  },
  {
    id: 'seedsigner', photo: 'images/devices/seedsigner.png', name: 'SeedSigner', meta: 'QR air-gap · DIY · stateless',
    seNote: 'no element, and no authentication of any kind', ioNote: 'one chip parses, displays and signs; no host in the path', entNote: 'camera sensor as the noise source; dice become the seed', osNote: 'fully open, but hardware is whatever you assembled',
    seParts: {
      auth:    { state: 'outside', note: 'no authentication of any kind \u2014 no PIN, no counter; the device boots straight to its menu and the only secret is an optional passphrase' },
      keygen:  { state: 'outside', note: 'the mnemonic is produced in Python and displayed in clear for you to write down \u2014 export is the design, not a leak' },
      signing: { state: 'outside', note: 'signing runs in the same interpreter process on the application processor' },
      txbuild: { state: 'outside', note: 'parse, hash and sign all happen in one process \u2014 there is no element, so there is no hand-off boundary to criticise' }
    },
    ioParts: {
      display: { state: 'device', note: 'the LCD is driven over SPI by the application processor' },
      input:   { state: 'device', note: 'joystick and buttons read as raw GPIO by the same chip' },
      comms:   { state: 'none', note: 'there is no host link to attack \u2014 USB, Bluetooth and networking are not compiled into the kernel at all, and the only channel is a camera in and a QR code out', src: 'https://github.com/SeedSigner/seedsigner-os' }
    },
    entRules: {
      source: { state: 'hardware', note: 'there is no hardware generator on this build \u2014 the physical noise source is the camera image sensor, with health checks the project describes as a stuck-sensor detector rather than an entropy measurement', src: 'https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/views/tools_views.py' },
      count:  { state: 'user', note: 'dice or coin entries become the seed directly \u2014 the only device here that takes user entropy, but nothing device-side is mixed in, so a badly rolled seed is entirely yours', src: 'https://github.com/SeedSigner/seedsigner/blob/dev/docs/dice_verification.md' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'no element, so the application itself holds and uses the seed; MIT and reproducible against a published hash, but the firmware is a card you write and nothing on the device attests it', src: 'https://github.com/SeedSigner/seedsigner-os' },
      bootFw: { state: 'source', note: 'the OS image builder ships in the same reproducible build, with the same absence of attestation' },
      board:  { state: 'source', note: 'the project designs no board, so this is scored on the Raspberry Pi it runs on \u2014 Raspberry Pi publishes a document it calls reduced schematics, with no layout files, no bill of materials and no open-hardware licence, over a system-on-chip whose boot ROM is closed', src: 'https://datasheets.raspberrypi.com/rpizero/raspberry-pi-zero-reduced-schematics.pdf' },
      host:   { state: 'open', note: 'no first-party software is shipped; the device is driven by third-party open wallets over standard QR payloads' }
    },
    note: 'Open-source, self-assembled and air-gapped by QR only. Its defining choice is statelessness: the seed is entered per session and nothing is retained when power is removed, so there is no stored secret to extract. Because it designs no hardware of its own, the board it is scored on is the Raspberry Pi underneath it.',
    watch: 'Unassessed, and it strains the rubric. The secure-element criterion asks how well a stored seed is protected — this device stores none, but runs on a general-purpose SoC while the seed is in memory. Whether that scores near the top or near the bottom is a judgement about your threat model, not a reading of a datasheet.'
  },
  {
    id: 'jadeplus', photo: 'images/devices/jade-plus.png', name: 'Blockstream Jade Plus', meta: 'colour display · camera · open source',
    seNote: 'no element \u2014 a remote blind oracle does its anti-bruteforce job', ioNote: 'one chip parses, displays and signs; no bridge chip', entNote: 'thorough mixing, uncertified source', osNote: 'reproducible firmware and fabrication-grade board files',
    seParts: {
      auth:    { state: 'outside', note: 'a remote blind oracle stands in for an element: it holds half the decryption key, never learns the PIN, and enforces the strike counter out of a physical attacker\u2019s reach' },
      keygen:  { state: 'outside', note: 'the mnemonic is generated by firmware on the application processor' },
      signing: { state: 'outside', note: 'signing runs in a library compiled into the firmware, with keys in ordinary RAM while unlocked' },
      txbuild: { state: 'outside', note: 'parsing and display happen on the same chip that signs \u2014 no element, but also no hand-off' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main processor with no co-processor between them' },
      input:   { state: 'device', note: 'navigation and select buttons read as raw GPIO by the same chip' },
      comms:   { state: 'device', note: 'USB, Bluetooth and the camera all land on the application processor itself \u2014 no bridge chip, but no element either' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the processor\u2019s own generator, which the firmware candidly notes is pseudo-random unless the radio or sensor source is active; the chip\u2019s certification is questionnaire-level and does not cover the generator', src: 'https://github.com/Blockstream/Jade/blob/master/main/random.c' },
      count:  { state: 'multiple', note: 'every draw is hashed over battery sensor readings, a cycle counter, rolling state and the chip generator, seeded at boot with camera frames \u2014 the most thorough mixing here, but no user contribution', src: 'https://github.com/Blockstream/Jade/blob/master/main/random.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'no element, so the firmware holds and uses the seed; GPL3 with a documented reproducible build whose only difference is the signature block, and secure boot enforcing signed images', src: 'https://github.com/Blockstream/Jade/blob/master/REPRODUCIBLE.md' },
      bootFw: { state: 'open', note: 'the bootloader path ships in the same tree with secure boot and anti-rollback enabled' },
      board:  { state: 'open', note: 'fabrication-grade publication — project files, schematics, board layout and bill of materials; the most complete hardware release on this sheet', src: 'https://github.com/Blockstream/Jade/tree/master/hardware/jade_v2' },
      host:   { state: 'source', note: 'the libraries are BSD-MIT and the apps GPL-3.0, but no reproducible build was established for them', src: 'https://github.com/Blockstream/green_qt' }
    },
    note: 'Blockstream\'s open-source signer, with an on-device colour display, a camera for air-gapped QR flows, and physical input on the device rather than the phone.',
    watch: 'Unassessed, and the interesting question is what stands in for a secure element. The Jade line has used a PIN scheme that involves a remote server in unlocking an encrypted seed rather than certified silicon — that is a third architecture this rubric does not yet describe, and it needs establishing for this model before any score is meaningful.'
  }
];

const SORT_KEYS = {
  secure: 'se',
  io: 'io',
  entropy: 'ent',
  open: 'os'
};

const COLUMNS = [
  { key: 'se', note: 'seNote', label: 'SECURE ELEMENT' },
  { key: 'io', note: 'ioNote', label: 'TRUSTED I/O' },
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
  { key: 'seedFw', weight: 4, label: 'SEED-TOUCHING FIRMWARE' },
  { key: 'bootFw', weight: 2, label: 'BOOTLOADER + SUPPORTING FIRMWARE' },
  // "Reproducible" is firmware vocabulary: a board has no build to repeat and no
  // binary to compare. The top level here means the published files are enough to
  // have the board made.
  { key: 'board',  weight: 2, label: 'BOARD DESIGN',
    labels: { open: 'FABRICABLE', source: 'PARTIAL' } },
  { key: 'host',   weight: 2, label: 'HOST SOFTWARE' }
];

// closed, nda and unknown all score zero — the site's rule is that a claim which
// cannot be verified is scored as absent — but they mean different things and
// are labelled differently. Every layer applies to every device: naming the role
// rather than the component means there is nothing to mark not-applicable.
const OS_STATES = {
  open:    { level: 1.0, label: 'REPRODUCIBLE', cls: 'is-open' },
  source:  { level: 0.5, label: 'SOURCE ONLY',  cls: 'is-partial' },
  closed:  { level: 0.0, label: 'CLOSED',       cls: 'is-closed' },
  nda:     { level: 0.0, label: 'NDA-BOUND',    cls: 'is-closed' },
  unknown: { level: 0.0, label: 'UNVERIFIED',   cls: 'is-unknown' }
};

const osState = (entry) => OS_STATES[entry && entry.state] || OS_STATES.unknown;

// ---------------------------------------------------------------------------
// Entropy, by rule.
//
// Two independent 5-point rules: how good the source is, and how many sources
// are combined. Unlike the open-source layers these are flat point scales with
// a floor of 1 — a device that produces a number at all is not scored zero.
// Nothing here re-scores what the SECURE ELEMENT or OPEN SOURCE columns cover:
// where the seed is born belongs to the former, whether the mixing code can be
// read belongs to the latter.
// ---------------------------------------------------------------------------

const ENT_RULES = [
  {
    key: 'source',
    label: 'SOURCE OF RNG',
    max: 5,
    states: {
      software: { pts: 1, label: 'SOFTWARE PRNG',       cls: 'is-closed' },
      hardware: { pts: 3, label: 'UNCERTIFIED HARDWARE', cls: 'is-partial' },
      trng:     { pts: 5, label: 'CERTIFIED TRNG',       cls: 'is-open' },
      unknown:  { pts: 1, label: 'UNVERIFIED',           cls: 'is-unknown' }
    }
  },
  {
    key: 'count',
    label: 'NUMBER OF SOURCES',
    max: 5,
    states: {
      single:   { pts: 1, label: 'SINGLE SOURCE',    cls: 'is-closed' },
      multiple: { pts: 3, label: 'MULTIPLE SOURCES', cls: 'is-partial' },
      user:     { pts: 5, label: 'MULTIPLE + USER',  cls: 'is-open' },
      unknown:  { pts: 1, label: 'UNVERIFIED',       cls: 'is-unknown' }
    }
  }
];

// ---------------------------------------------------------------------------
// Secure element and trusted I/O, by component.
//
// Both ask the same underlying question: how much of the wallet actually runs
// inside the element, and how much runs on a general-purpose chip beside it.
// Each component is simply present or absent, and its weight is the number of
// points it carries. No element at all means every component fails, so the
// score falls out at zero without a special case.
// ---------------------------------------------------------------------------

const SE_PARTS = [
  { key: 'auth', label: 'USER AUTHENTICATION', max: 2, states: {
      element: { pts: 2, label: 'IN ELEMENT', cls: 'is-open' },
      outside:  { pts: 0, label: 'OUTSIDE',   cls: 'is-closed' },
      unknown:  { pts: 0, label: 'UNVERIFIED', cls: 'is-unknown' } } },
  { key: 'keygen', label: 'SIGNING KEY GENERATED', max: 3, states: {
      element: { pts: 3, label: 'IN ELEMENT', cls: 'is-open' },
      outside:  { pts: 0, label: 'OUTSIDE',   cls: 'is-closed' },
      unknown:  { pts: 0, label: 'UNVERIFIED', cls: 'is-unknown' } } },
  { key: 'signing', label: 'TRANSACTION SIGNED', max: 3, states: {
      element: { pts: 3, label: 'IN ELEMENT', cls: 'is-open' },
      outside:  { pts: 0, label: 'OUTSIDE',   cls: 'is-closed' },
      unknown:  { pts: 0, label: 'UNVERIFIED', cls: 'is-unknown' } } },
  { key: 'txbuild', label: 'TX BUILT AND HASHED', max: 2, states: {
      element: { pts: 2, label: 'IN ELEMENT', cls: 'is-open' },
      outside:  { pts: 0, label: 'OUTSIDE',   cls: 'is-closed' },
      unknown:  { pts: 0, label: 'UNVERIFIED', cls: 'is-unknown' } } }
];

// Display and input each distinguish three places the work can happen. A screen
// driven by the wallet's own MCU is worth something; a screen that only exists
// in the phone app is worth nothing.
const IO_PARTS = [
  { key: 'display', label: 'DISPLAY / USER OUTPUT', max: 4, states: {
      element: { pts: 4, label: 'IN ELEMENT',    cls: 'is-open' },
      device:  { pts: 2, label: 'ON DEVICE MCU', cls: 'is-partial' },
      host:    { pts: 0, label: 'IN THE APP',    cls: 'is-closed' },
      unknown: { pts: 0, label: 'UNVERIFIED',    cls: 'is-unknown' } } },
  { key: 'input', label: 'BUTTONS / USER INPUT', max: 4, states: {
      element: { pts: 4, label: 'IN ELEMENT',    cls: 'is-open' },
      device:  { pts: 2, label: 'ON DEVICE MCU', cls: 'is-partial' },
      host:    { pts: 0, label: 'IN THE APP',    cls: 'is-closed' },
      unknown: { pts: 0, label: 'UNVERIFIED',    cls: 'is-unknown' } } },
  { key: 'comms', label: 'HOST LINK — USB / BLE / NFC', max: 2, states: {
      // A device with no data link has no hub to compromise, which is the same
      // outcome the element-driven case earns its points for.
      none:    { pts: 2, label: 'NO HOST LINK',  cls: 'is-open' },
      element: { pts: 2, label: 'IN ELEMENT',    cls: 'is-open' },
      device:  { pts: 0, label: 'ON DEVICE MCU', cls: 'is-closed' },
      unknown: { pts: 0, label: 'UNVERIFIED',    cls: 'is-unknown' } } }
];

// One shape for secure element, trusted I/O and entropy: each rule carries its
// own states, so a rule's levels are defined next to the rule itself.
const ruleState = (rule, entry) => rule.states[entry && entry.state] || rule.states.unknown;

const rulesScore = (rules, data) =>
  rules.reduce((n, r) => n + ruleState(r, data[r.key]).pts, 0);

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
  return OS_LAYERS.reduce(
    (n, l) => n + osState(w.osLayers[l.key]).level * l.weight, 0);
}

function seScore(w) {
  if (!isRated(w)) return null;
  return w.seParts ? rulesScore(SE_PARTS, w.seParts) : w.se;
}

function ioScore(w) {
  if (!isRated(w)) return null;
  if (w.ioParts) return rulesScore(IO_PARTS, w.ioParts);
  if (w.io !== undefined) return w.io;
  // Pre-merge records carried screen and input separately.
  return (w.scr + w.inp) / 2;
}

// Layered devices derive entropy from the two rules; the rest keep flat `ent`.
function entScore(w) {
  if (!isRated(w)) return null;
  if (!w.entRules) return w.ent;
  return rulesScore(ENT_RULES, w.entRules);
}

// Single accessor for every score read, so `os` can be flat or derived.
const DERIVED = { se: seScore, io: ioScore, ent: entScore, os: osScore };

const metric = (w, key) => (DERIVED[key] ? DERIVED[key](w) : w[key]);

const score = (w) =>
  (isRated(w) ? (seScore(w) + ioScore(w) + entScore(w) + osScore(w)) / 4 : null);

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
  const stateLabel = (layer.labels && layer.labels[entry && entry.state]) || st.label;
  return `
        <div class="os-layer ${st.cls}">
          <div class="os-layer-name">${layer.label}</div>
          <div class="os-layer-pts">${(st.level * layer.weight).toFixed(1)} / ${layer.weight.toFixed(1)}</div>
          <div class="os-layer-state">${stateLabel}</div>
          <div class="os-layer-note">${esc((entry && entry.note) || 'not established')}${osSourceLink(entry)}</div>
        </div>`;
}

function osBreakdown(w) {
  if (!isRated(w) || !w.osLayers) return '';

  const total = osScore(w);

  return `
      <div class="os-breakdown">
        <div class="kicker">OPEN SOURCE \u2014 LAYER BREAKDOWN</div>
        <div class="os-layers">${OS_LAYERS.map((l) => osLayerRow(w, l)).join('')}
        </div>
        <div class="os-total">
          <span class="os-total-value">${total.toFixed(1)}</span>
          <span class="os-total-sum">${total.toFixed(1)} of 10.0 points</span>
          <div class="bar"><span style="width: ${total * 10}%"></span></div>
        </div>
      </div>`;
}

function ruleRow(rule, entry) {
  const st = ruleState(rule, entry);
  return `
        <div class="os-layer ${st.cls}">
          <div class="os-layer-name">${rule.label}</div>
          <div class="os-layer-pts">${st.pts.toFixed(1)} / ${rule.max.toFixed(1)}</div>
          <div class="os-layer-state">${st.label}</div>
          <div class="os-layer-note">${esc((entry && entry.note) || 'not established')}${osSourceLink(entry)}</div>
        </div>`;
}

function rulesBreakdown(w, kicker, rules, data, total) {
  if (!isRated(w) || !data) return '';
  return `
      <div class="os-breakdown">
        <div class="kicker">${kicker}</div>
        <div class="os-layers">${rules.map((r) => ruleRow(r, data[r.key])).join('')}
        </div>
        <div class="os-total">
          <span class="os-total-value">${total.toFixed(1)}</span>
          <span class="os-total-sum">${total.toFixed(1)} of 10.0 points</span>
          <div class="bar"><span style="width: ${total * 10}%"></span></div>
        </div>
      </div>`;
}

function warningBlock(w) {
  if (!w.warning) return '';
  const url = safeUrl(w.warning.src);
  const link = url
    ? ` <a class="os-src" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(w.warning.srcLabel || 'ADVISORY')} \u2197</a>`
    : '';
  return `
      <div class="row-warning">
        <div class="row-warning-tag">${esc(w.warning.tag || 'ADVISORY')}</div>
        <p>${esc(w.warning.text)}${link}</p>
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
            <div class="device-name">${esc(w.name)}${w.warning ? '<span class="device-flag" title="Security advisory">!</span>' : ''}</div>
            <div class="device-meta">${esc(w.meta)}</div>
          </div>
        </div>
        ${COLUMNS.map((col) => scoreCell(w, col)).join('')}
        <div class="cell-total">
          <span class="cell-label">COMPOSITE</span>
          <div class="value">${isRated(w) ? overall.toFixed(1) : '—'}</div>
          ${isRated(w) ? '' : '<div class="tier">NOT RATED</div>'}
        </div>
      </div>
      <div class="teardown" id="teardown-${w.id}" ${isOpen ? '' : 'hidden'}>${warningBlock(w)}
        <div>
          <div class="kicker">TEARDOWN NOTE</div>
          <p>${esc(w.note)}</p>
        </div>
        <div>
          <div class="kicker">WATCH ITEM</div>
          <p>${esc(w.watch)}</p>
        </div>${rulesBreakdown(w, 'SECURE ELEMENT \u2014 COMPONENT BREAKDOWN', SE_PARTS, w.seParts, seScore(w))}${rulesBreakdown(w, 'TRUSTED I/O \u2014 COMPONENT BREAKDOWN', IO_PARTS, w.ioParts, ioScore(w))}${rulesBreakdown(w, 'ENTROPY \u2014 RULE BREAKDOWN', ENT_RULES, w.entRules, entScore(w))}${osBreakdown(w)}
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
