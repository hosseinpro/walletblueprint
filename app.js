/* walletblueprint.com — comparison sheet */

const WALLETS = [
  {
    id: 'lnsp', photo: 'images/devices/ledger-nano-s-plus.webp', url: 'https://shop.ledger.com/products/ledger-nano-s-plus', name: 'Ledger Nano S Plus', meta: 'USB-C · ST33 element · buttons in SE',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and buttons in the element; USB on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element; it leaves only if the owner opts into Ledger Recover, and then as encrypted shares' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with a hardware total-failure test and an externally triggered online test', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-13-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish; the 2023 fragments in ledger-secure-os are under a non-open licence, cannot be built and have not been updated since', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the Blue (2016) and the original Nano S (archived 2017); nothing exists for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'Ledger Wallet (formerly Ledger Live) is published, but without a reproducible build; the Apache-2.0 SDK is for apps that run on the device, not the host', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'The ST33 has enough I/O for Ledger to pull the display driver and button handling into the secure element itself, which makes manipulating what is shown, or faking a press, substantially harder.',
    watch: 'An MCU still handles USB. It cannot draw on the screen or fake a press, but it sits between the host and the element and is the one part of the design nobody outside Ledger can inspect. The device-level evaluation (ANSSI CSPN 2023/13) covers element firmware 1.0.4; no later one is published.'
  },
  {
    id: 'lnx', photo: 'images/devices/ledger-nano-x.webp', url: 'https://shop.ledger.com/products/ledger-nano-x', name: 'Ledger Nano X', meta: 'USB-C · Bluetooth · ST33 element',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and buttons in the element; USB and BLE on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element; it leaves only if the owner opts into Ledger Recover, and then as encrypted shares' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself; the MCU keeps a single line to the screen, enough to blank it but not to draw on it', src: 'https://www.ledger.com/enhancing-the-ledger-nano-xs-security' },
      input:   { state: 'element', note: 'button handling runs inside the element' },
      comms:   { state: 'device', note: 'a general-purpose MCU handles the host link' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with a hardware total-failure test and an externally triggered online test', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-17-cible.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2023-17-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish; the 2023 fragments in ledger-secure-os are under a non-open licence, cannot be built and have not been updated since', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the Blue (2016) and the original Nano S (archived 2017); nothing exists for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'Ledger Wallet (formerly Ledger Live) is published, but without a reproducible build; the Apache-2.0 SDK is for apps that run on the device, not the host', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Released before the Nano S Plus, with a different element (ST33J2M0) and a Bluetooth-capable MCU (STM32WB55) that also manages the battery. Display and button handling still run inside the secure element.',
    watch: 'The MCU handles USB, Bluetooth and power, and has been attacked once: in 2020 Kraken Security Labs found its debug interface left enabled, so its firmware could be overwritten before delivery. Ledger patched it in 1.2.4-2 and the element was never reached, but the MCU remains the softest part of the device.'
  },
  {
    id: 'lstax', photo: 'images/devices/ledger-stax.webp', url: 'https://shop.ledger.com/products/ledger-stax', name: 'Ledger Stax', meta: 'USB-C · Bluetooth · NFC · e-ink touch',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and touch in the element; USB, BLE and NFC outside it', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element; it leaves only if the owner opts into Ledger Recover, and then as encrypted shares' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-cible.pdf' },
      input:   { state: 'element', note: 'the touch controller is read by the element, not the MCU' },
      comms:   { state: 'device', note: 'a general-purpose MCU (STM32WB35) handles USB and Bluetooth, with a separate NFC chip beside it' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with a hardware total-failure test and an externally triggered online test', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-cible.pdf' },
      count:  { state: 'single', note: 'one physical source plus closed software post-processing, which conditions the output rather than adding a second source; neither host nor user contributes anything', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish; the 2023 fragments in ledger-secure-os are under a non-open licence, cannot be built and have not been updated since', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the Blue (2016) and the original Nano S (archived 2017); nothing exists for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'Ledger Wallet (formerly Ledger Live) is published, but without a reproducible build; the Apache-2.0 SDK is for apps that run on the device, not the host', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'ANSSI evaluated the Stax in 2025 (CSPN 2025/03): an ST33K1M5C element that drives the e-ink screen and reads the touch panel itself, an STM32WB35 for USB and Bluetooth, and a separate NFC controller.',
    watch: 'The same split as the Nano S Plus: the element owns the screen and input, and an MCU owns every link to the host. The evaluation covers element firmware 1.1.0; later firmware has not been re-evaluated.'
  },
  {
    id: 'lflex', photo: 'images/devices/ledger-flex.webp', url: 'https://shop.ledger.com/products/ledger-flex', name: 'Ledger Flex', meta: 'USB-C · Bluetooth · NFC · e-ink touch',
    seNote: 'signing, keys and PIN all inside the element', ioNote: 'display and touch in the element; USB, BLE and NFC outside it', entNote: 'certified chip, no device-level evaluation', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verified inside the element' },
      keygen:  { state: 'element', note: 'seed generated inside the element; it leaves only if the owner opts into Ledger Recover, and then as encrypted shares' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'element', note: 'transaction parsing and hashing run in the app on the element' }
    },
    ioParts: {
      display: { state: 'element', note: 'display driver pulled into the element itself', src: 'https://github.com/LedgerHQ/ledger-secure-sdk/blob/master/Makefile.defines' },
      input:   { state: 'element', note: 'the touch controller is read by the element, not the MCU' },
      comms:   { state: 'device', note: 'a general-purpose MCU (STM32WB35) handles USB and Bluetooth, with a separate NFC chip beside it' }
    },
    entRules: {
      source: { state: 'trng', note: 'ST33 secure element carrying an AIS-31 PTG.2 generator, with a hardware total-failure test and an externally triggered online test', src: 'https://www.commoncriteriaportal.org/files/epfiles/SMD_ST33K1M5_ST_21_001_vB01_1.pdf' },
      count:  { state: 'single', note: 'inferred from the identical element and OS; no device-level evaluation is published for the Flex, unlike the Stax', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-cible.pdf' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish; the 2023 fragments in ledger-secure-os are under a non-open licence, cannot be built and have not been updated since', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the Blue (2016) and the original Nano S (archived 2017); nothing exists for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'Ledger Wallet (formerly Ledger Live) is published, but without a reproducible build; the Apache-2.0 SDK is for apps that run on the device, not the host', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'Ledger\'s e-ink touchscreen device. Ledger documents the display and touch controller as driven through the secure element rather than the connectivity MCU — the same direction of travel as the Nano S Plus.',
    watch: 'No device-level evaluation is published. Ledger\'s SDK target and hardware table document the element-driven display and touch directly; PIN and RNG behaviour are taken from the Stax, which uses the same element and MCU.'
  },
  {
    id: 'lgen5', photo: 'images/devices/ledger-nano-gen5.webp', url: 'https://shop.ledger.com/products/ledger-nano-gen5', name: 'Ledger Nano Gen5', meta: 'USB-C · Bluetooth · NFC · e-ink touch',
    seNote: 'the whole wallet runs inside the element', ioNote: 'display and touch in the element; radio on an MCU', entNote: 'certified generator, but a single source', osNote: 'SDK and app open; every seed-touching layer closed',
    seParts: {
      auth:    { state: 'element', note: 'PIN verification is a syscall of the element OS, with a retry counter and a wipe on exhaustion; the Stax evaluation, on the same element, places the comparison inside it', src: 'https://donjon.ledger.com/threat-model/os-pin-security-mechanism/' },
      keygen:  { state: 'element', note: 'the seed comes from the element\u2019s own generator and derivation is an element syscall that apps never see \u2014 as evaluated on the Stax, which uses the same element', src: 'https://messervices.cyber.gouv.fr/visas/ANSSI-CSPN-2025-03-cible.pdf' },
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
      count:  { state: 'single', note: 'one physical source, conditioned rather than mixed; no second chip, no host entropy and no user contribution. Ledger\u2019s post describes the conditioning but names no device', src: 'https://www.ledger.com/blog-coldcard-incident' }
    },
    osLayers: {
      seedFw: { state: 'nda', note: 'the element holds and uses the seed, and its firmware is closed under a supplier agreement Ledger says it cannot publish; the 2023 fragments in ledger-secure-os are under a non-open licence, cannot be built and have not been updated since', src: 'https://www.ledger.com/academy/topics/ledgersolutions/is-ledger-open-source' },
      bootFw: { state: 'closed', note: 'the only MCU firmware Ledger ever published was for the Blue (2016) and the original Nano S (archived 2017); nothing exists for this device', src: 'https://github.com/LedgerHQ/nanos-nonsecure-firmware' },
      board:  { state: 'closed', note: 'the only board design ever published was the 2016 Blue Developer Edition', src: 'https://github.com/LedgerHQ/blue-schematics' },
      host:   { state: 'source', note: 'Ledger Wallet (formerly Ledger Live) is published, but without a reproducible build; the Apache-2.0 SDK is for apps that run on the device, not the host', src: 'https://github.com/LedgerHQ/ledger-live' }
    },
    note: 'E-ink touchscreen with USB-C, Bluetooth and NFC, on the same ST33K1M5 element as the Stax and Flex. Biometric unlock exists only in the phone app; the device has no fingerprint sensor.',
    watch: 'No device-level evaluation is published. The states rest on the element\'s own certification, Ledger\'s SDK target for this device, and the Stax evaluation on the same element; an STM32WB35 and an NFC chip act only as the link to the host.'
  },

  {
    id: 'tsafe3', photo: 'images/devices/trezor-safe-3.webp', url: 'https://trezor.io/trezor-safe-3', name: 'Trezor Safe 3', meta: 'USB-C · EAL6+ element · open firmware',
    seNote: 'element gates the PIN, but the seed lives and signs on the MCU', ioNote: 'screen, buttons and host link all on the MCU', entNote: 'three sources, mixing readable in public source', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    seParts: {
      auth:    { state: 'element', note: 'the Optiga checks a digest of the stretched PIN before releasing its secret, with a hardware retry counter; the MCU combines that secret with its own to unlock storage', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/core/misc/optiga.md' },
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
      source: { state: 'trng', note: 'Optiga Trust M, whose certified platform states an AIS-31 PTG.2 generator \u2014 the mode Trezor\u2019s firmware requests \u2014 XORed into the MCU generator', src: 'https://www.bsi.bund.de/SharedDocs/Zertifikate_CC/CC/SmartCards_IC_Cryptolib/0961.html' },
      count:  { state: 'multiple', note: 'MCU generator XORed with the element, then hashed with host-supplied bytes \u2014 readable end to end in public source. No human entropy: on-device user entropy remains an open feature request', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU; that firmware is GPL-3.0, hash-checked on every connect, and WalletScrutiny independently rebuilt release 2.6.4 to a matching fingerprint (April 2024)', src: 'https://github.com/trezor/trezor-firmware/issues/3663' },
      bootFw: { state: 'open', note: 'boardloader and bootloader ship in the same repository and the same reproducible build' },
      board:  { state: 'source', note: 'CERN-OHL-S schematics as images with a text BOM \u2014 no editable CAD and no gerbers', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_3' },
      host:   { state: 'source', note: 'Suite and the connect library are source-available under a reference-only licence, not an open-source one, and are not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'The secure element holds a key that decrypts the seed; the PIN unlocks the element. Real protection at rest, and a genuine reversal of Trezor\'s long refusal to use one.',
    watch: 'The plaintext seed is then loaded into a general-purpose STM32, where all signing happens. Malware on that chip can read it straight out of memory.'
  },
  {
    id: 'tsafe5', photo: 'images/devices/trezor-safe-5.avif', url: 'https://trezor.io/trezor-safe-5', name: 'Trezor Safe 5', meta: 'USB-C · colour touchscreen · EAL6+ element',
    seNote: 'element gates the PIN, but the seed lives and signs on the MCU', ioNote: 'touchscreen and host link all on the MCU', entNote: 'three sources, mixing readable in public source', osNote: 'firmware reproducible; element closed, Suite not OSI-open',
    seParts: {
      auth:    { state: 'element', note: 'the Optiga checks a digest of the stretched PIN before releasing its secret, with a hardware retry counter; the MCU combines that secret with its own to unlock storage', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/core/misc/optiga.md' },
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
      source: { state: 'trng', note: 'Optiga Trust M, whose certified platform states an AIS-31 PTG.2 generator \u2014 the mode Trezor\u2019s firmware requests \u2014 XORed into the MCU generator', src: 'https://www.bsi.bund.de/SharedDocs/Zertifikate_CC/CC/SmartCards_IC_Cryptolib/0961.html' },
      count:  { state: 'multiple', note: 'MCU generator XORed with the element, then hashed with host-supplied bytes \u2014 readable end to end in public source. No human entropy: on-device user entropy remains an open feature request', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU; that firmware is GPL-3.0, hash-checked on every connect, and WalletScrutiny independently rebuilt release 2.8.3 to a matching fingerprint (October 2024)', src: 'https://github.com/trezor/trezor-firmware/issues/4254' },
      bootFw: { state: 'open', note: 'boardloader and bootloader ship in the same repository and the same reproducible build' },
      board:  { state: 'source', note: 'CERN-OHL-S schematics as PDFs only \u2014 no BOM, no editable CAD and no gerbers', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_5' },
      host:   { state: 'source', note: 'Suite and the connect library are source-available under a reference-only licence, not an open-source one, and are not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'Gorilla Glass and a full colour touchscreen make this the easiest Trezor to live with. Like the Safe 3, it takes the PIN on the device.',
    watch: 'Architecturally the Safe 3. The secure element holds only a key that decrypts the seed; the plaintext seed is then loaded into a general-purpose STM32 where all signing happens. No significant security gain over its predecessor.'
  },
  {
    id: 'tsafe7', photo: 'images/devices/trezor-safe-7.png', url: 'https://trezor.io/trezor-safe-7', name: 'Trezor Safe 7', meta: 'touchscreen · Bluetooth · Optiga + TROPIC01',
    seNote: 'an open element that stores and rate-limits but never signs transactions', ioNote: 'screen, touch and radio all outside the elements', entNote: 'three sources mixed, one of them certified', osNote: 'the only openly licensed element firmware on this sheet',
    warning: {
      tag: 'UNPATCHED SILICON FLAW',
      text: 'In January 2026 Ledger Donjon decapsulated the TROPIC01 element and used a laser to fault its signature verification, achieving arbitrary code execution on the chip; the work was disclosed in June 2026. Tropic Square then found a further path that bypasses the hardware boundary protecting PIN material. Hardened silicon is not expected before late 2026, units already shipped cannot be fixed by a firmware update, and the only field mitigation is disabling maintenance mode. The wallet seed is held in MCU flash rather than on this chip, so funds are not directly exposed \u2014 an attacker would still need the PIN and the other two chips.',
      src: 'https://www.tropicsquare.com/news-and-events/tropic01-security-advisory-lfi-vulnerability-disclosure-and-mitigation',
      srcLabel: 'TROPIC SQUARE ADVISORY'
    },
    seParts: {
      auth:    { state: 'element', note: 'both elements hold hardware retry counters and withhold their share of the unlock key until the PIN checks out; the MCU combines the shares to unlock storage', src: 'https://github.com/trezor/trezor-firmware/blob/main/docs/core/misc/optiga.md' },
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
      source: { state: 'trng', note: 'three generators feed the pool, but only the Optiga\u2019s is independently certified (AIS-31 PTG.2) \u2014 TROPIC01 declares AIS-31 compliance without holding a certificate', src: 'https://www.bsi.bund.de/SharedDocs/Zertifikate_CC/CC/SmartCards_IC_Cryptolib/0961.html' },
      count:  { state: 'multiple', note: 'three hardware sources XORed with a fatal error if any fails to contribute, then hashed with host entropy \u2014 but the extra input is the host app, not the owner', src: 'https://github.com/trezor/trezor-firmware/blob/main/core/embed/sec/rng/rng_strong.c' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed lives and signs on the MCU under GPL-3.0, with the same reproducible build as the other Safe models; the published TROPIC01 firmware is notable but never touches the seed', src: 'https://docs.trezor.io/trezor-firmware/common/reproducible-build.html' },
      bootFw: { state: 'source', note: 'boardloader, bootloader and secure monitor ship in the same reproducible build, but the Bluetooth chip\u2019s firmware links Nordic\u2019s closed SoftDevice controller library', src: 'https://github.com/trezor/trezor-firmware/blob/main/nordic/trezor/trezor-ble/prj.conf' },
      board:  { state: 'source', note: 'CERN-OHL-S PDF schematics for main board, UI and antenna; no BOM, no CAD, display and battery boards excluded', src: 'https://github.com/trezor/trezor-hardware/tree/master/electronics/trezor_safe_7' },
      host:   { state: 'source', note: 'Suite and the connect library under the reference-only licence, not reproducible', src: 'https://github.com/trezor/trezor-suite/blob/develop/LICENSE.md' }
    },
    note: 'Pairs an Infineon Optiga with Tropic Square\'s TROPIC01, an auditable secure element and the first serious attempt at the open-source-versus-certified-silicon trade-off this methodology describes. Bluetooth runs on a separate radio chip.',
    watch: 'TROPIC01 does not change where the wallet runs: it cannot sign Bitcoin at all, the backup sits encrypted in MCU flash, and the seed is decrypted into the STM32U5 for every signature \u2014 the same architecture as the Safe 3 and Safe 5. What it adds is a second, auditable gate on the PIN.'
  },

  {
    id: 'keepkey', photo: 'images/devices/keepkey.webp', url: 'https://www.keepkey.com/', name: 'KeepKey', meta: 'USB · no element · legacy',
    seNote: 'no element anywhere in the design', ioNote: 'screen, button and host link all on the MCU', entNote: 'uncertified generator, host entropy optional', osNote: 'no element; firmware reproducible, board claim unsupported',
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
      seedFw: { state: 'open', note: 'no element, so the seed lives and signs on the MCU; that firmware is LGPLv3 with a pinned-Docker build that reproduces the release, and the device reports its firmware hash to compare against', src: 'https://keepkey.com/blog/verifying_keepkey_firmware' },
      bootFw: { state: 'source', note: 'the bootloader ships in the same repository and the same build' },
      board:  { state: 'closed', note: 'the vendor advertises schematics, PCB and BOM, but the repository it links is a community guide to building a lookalike from dev boards', src: 'https://github.com/keepkey/keepkey-diy' },
      host:   { state: 'source', note: 'the Python library and desktop app are published, but the current vault app carries no licence file and nothing is reproducible', src: 'https://github.com/keepkey/keepkey-vault' }
    },
    note: 'Large display for its era, but architecturally a general-purpose chip holding a seed.',
    watch: 'Kraken Security Labs extracted the encrypted seed by voltage glitching and then brute-forced the PIN (2019) \u2014 the class of attack a general-purpose chip holding a seed is exposed to.'
  },

  {
    id: 'ccmk4', photo: 'images/devices/coldcard-mk4.png', url: 'https://coldcard.com/mk4', name: 'ColdCard Mk4', meta: 'USB-C · NFC · microSD · dual element',
    seNote: 'two elements gate the seed, but signing happens outside them', ioNote: 'screen, keypad and host link all on the MCU', entNote: 'one certified generator mixed with two others, plus your dice', osNote: 'firmware reproducible, bootloader prebuilt; elements closed',
    warning: {
      tag: 'SEED COMPROMISED — JULY 2026',
      text: 'For five years a build error routed seed generation through a software PRNG instead of the hardware generator, leaving roughly 40 bits of entropy on Mk2 and Mk3 and 72 on Mk4 against a 128-bit target. On 30 July 2026 wallets were drained offline; estimates of the loss vary widely, the highest being TRM Labs\u2019 citation of Galaxy Research at above 116 million dollars across more than 5,200 addresses. Fixed the next day in 5.6.0, 1.5.0Q, 4.2.0 and the Edge builds — but updating does not repair an existing seed. Any seed generated on affected firmware must be replaced and funds moved. Seeds made from 50 or more dice rolls alone were never affected.',
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
      comms:   { state: 'device', note: 'a general-purpose chip handles USB and NFC; first-time setup switches both off, but the ports remain in the design and can be turned back on', src: 'https://github.com/Coldcard/firmware/blob/master/shared/ftux.py' }
    },
    entRules: {
      source: { state: 'trng', note: 'the ATECC608 secure element\u2019s generator holds NIST ESV certificate E46 (SP 800-90B) and is mixed into every seed alongside the STM32L4S5 RNG and the second element', src: 'https://csrc.nist.gov/projects/cryptographic-module-validation-program/entropy-validations/certificate/46' },
      count:  { state: 'user', note: 'three device sources combined by SHA256d, then user entropy \u2014 mandatory since 5.6.1 (August 2026): 50 dice rolls, 128 coin flips or 65 key presses \u2014 with the result recomputable off-device', src: 'https://github.com/Coldcard/firmware/blob/master/docs/verify_seed_mix.py' }
    },
    osLayers: {
      seedFw: { state: 'open', note: 'the seed enters the general-purpose chip to sign; that firmware is MIT with the Commons Clause, checksummed by the elements to drive the GENUINE light, and PortlandHODL independently rebuilt release 5.6.0 to every code and data byte (August 2026)', src: 'https://github.com/portlandhodl/coldcard_fw_dicerolls_trace/blob/9c04064ca1f84925017dcc5bd019a860f662f03d/dice-roll-5-6-0.pdf' },
      bootFw: { state: 'source', note: 'the bootloader is published and factory-set read-only, but the reproducible build links a prebuilt bootloader binary rather than rebuilding it', src: 'https://github.com/Coldcard/firmware/blob/master/stm32/shared.mk' },
      board:  { state: 'source', note: 'schematics and BOM published, but commercial use is unlicensed and the files carry no currency guarantee', src: 'https://github.com/Coldcard/firmware/tree/master/hardware' },
      host:   { state: 'source', note: 'no first-party app is shipped and the device is driven by third-party open wallets; the protocol library is source-available under the same non-OSI terms', src: 'https://github.com/Coldcard/ckcc-protocol' }
    },
    note: 'Two secure elements and a protocol that protects the seed between them and the STM32. Strongly protected at rest. The Mk4 is discontinued; the Mk5 runs the same firmware.',
    watch: 'To sign, the seed enters the general-purpose chip. A read-only bootloader hashes the firmware for an element to verify — so the guarantee rests on that chip being genuinely read-only, and the entropy advisory above shows what a build-level mistake in the same codebase can cost.'
  },

  {
    id: 'keystone3', photo: 'images/devices/keystone-3-pro.png', url: 'https://keyst.one/shop/products/keystone-3-pro', name: 'Keystone 3 Pro', meta: 'QR or USB · touchscreen · three elements',
    seNote: 'elements gate access, but signing happens outside them', ioNote: 'touchscreen and camera driven by the MCU', entNote: 'three generators, one independently certified', osNote: 'published widely, but nothing verifiable end to end',
    seParts: {
      auth:    { state: 'element', note: 'the ATECC608 gates a key share behind the password, but the final PIN comparison and the retry counter run on the MCU, and the fingerprint is matched on a separate MAX32520 that reports back to the MCU' },
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
      source: { state: 'trng', note: 'three generators \u2014 the MCU, the ATECC608B and the DS28S60 \u2014 and the ATECC608B\u2019s holds NIST ESV certificate E46 (SP 800-90B)', src: 'https://csrc.nist.gov/projects/cryptographic-module-validation-program/entropy-validations/certificate/46' },
      count:  { state: 'multiple', note: 'three generators chained through HKDF and seeded with a hash of the device password; the dice mode replaces device entropy rather than mixing it in', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/src/managers/keystore.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the seed is assembled and signed on the MCU under an MIT licence, but a pre-compiled vendor library is linked in and no independent reproduction of the release image has been published', src: 'https://github.com/KeystoneHQ/keystone3-firmware/blob/master/docs/verify.md' },
      bootFw: { state: 'source', note: 'a separate bootloader repository exists, with the same pre-compiled dependency' },
      board:  { state: 'source', note: 'schematics and BOM as PDFs only; no layout or fabrication files', src: 'https://github.com/KeystoneHQ/keystone3-firmware/tree/master/hardware' },
      host:   { state: 'source', note: 'the SDKs are public under ISC, but the companion app has no public source at all', src: 'https://github.com/KeystoneHQ/keystone-sdk-web' }
    },
    note: 'Three secure elements \u2014 two feeding and guarding the seed, one matching fingerprints \u2014 with a large touchscreen that renders full transaction detail.',
    watch: 'Marketed as fully air-gapped, but the shipped firmware sets USB data on by default, with a CDC and WebUSB stack, software-wallet pairing and USB firmware updates all built in. Each connection raises an on-device prompt and pairing needs the password, but air-gap mode is a setting the owner must switch on, not the state the device arrives in.'
  },

  {
    id: 'onekeypro', photo: 'images/devices/onekey-pro.png', url: 'https://onekey.so/products/onekey-pro/', name: 'OneKey Pro', meta: 'touchscreen · camera · USB-C',
    seNote: 'signs on the element, but the seed is born and the transaction built outside it', ioNote: 'screen, touch and every radio on general-purpose chips', entNote: 'certified generator, single source by default', osNote: 'firmware published, element applet absent',
    seParts: {
      auth:    { state: 'element', note: 'the PIN goes to the element over an authenticated channel and the retry counter lives there \u2014 but the fingerprint is matched on the MCU inside a closed binary, which then simply asserts success to the element', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/main/core/embed/trezorhal/se_thd89.c' },
      keygen:  { state: 'outside', note: 'the mnemonic is assembled and displayed on the MCU before being imported into the element, and can be exported back out', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/main/core/src/apps/management/reset_device/__init__.py' },
      signing: { state: 'element', note: 'the signing call still takes a private-key argument, but on THD89 builds it is ignored \u2014 the element selects the key from the derivation path, so the seed never comes out to sign', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/main/core/embed/extmod/modtrezorcrypto/modtrezorcrypto-secp256k1.h' },
      txbuild: { state: 'outside', note: 'parsing and sighash run on the MCU and only a 32-byte digest crosses over; the element cannot tell what it is signing', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/main/core/src/apps/bitcoin/common.py' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main microcontroller' },
      input:   { state: 'device', note: 'touch and the fingerprint sensor are read by the microcontroller, not the element' },
      comms:   { state: 'device', note: 'USB, Bluetooth and NFC all terminate on general-purpose chips' }
    },
    entRules: {
      source: { state: 'trng', note: 'the THD89 chip\u2019s certification names an AIS-31 PTG.2 physical generator; the element code is closed, so that OneKey\u2019s random call returns its output is taken on trust', src: 'https://oc.ccn.cni.es/en/certified-products/certified-products/product-category/43-tarjetas-inteligentes/998-thd89-1-0-3-secure-element-version-1-0' },
      count:  { state: 'single', note: 'on-device setup takes everything from the element\u2019s generator; a toggle to mix in the microcontroller\u2019s generator ships switched off, and only setup started from the app mixes in host entropy', src: 'https://github.com/OneKeyHQ/firmware-pro/blob/main/core/src/apps/management/reset_device/__init__.py' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the element signs and takes no key, but the seed is assembled and displayed on the MCU first; that MCU firmware is published while the element applet is absent from every public repository', src: 'https://github.com/OneKeyHQ/firmware-pro' },
      bootFw: { state: 'source', note: 'boardloader and bootloader ship in the repository; OneKey published a byte-for-byte rebuild guide for app firmware in 2025, but verifying the bootloader still means hashing the vendor binary', src: 'https://help.onekey.so/en/articles/12025839-verifying-onekey-pro-firmware-with-open-source-code' },
      board:  { state: 'closed', note: 'no hardware design repository exists in the vendor organisation' },
      host:   { state: 'source', note: 'the SDK is public, but the app ships under a reference-use-only licence forbidding derivatives and redistribution', src: 'https://github.com/OneKeyHQ/app-monorepo' }
    },
    note: 'Large colour touchscreen with a rear camera and a fingerprint sensor, over USB-C, Bluetooth and NFC.',
    watch: 'The element signs without ever releasing the key, which is rarer than it should be. But the mnemonic is assembled on the MCU first, the element signs a digest the MCU computed, and the fingerprint is matched in a closed MCU library that simply tells the element it matched.'
  },
  {
    id: 'onekey1s', photo: 'images/devices/onekey-1s.webp', url: 'https://onekey.so/products/onekey-classic-1s-series/', name: 'OneKey Classic 1S', meta: 'transparent shell · buttons · OLED',
    seNote: 'signs on the element, but the seed is born and the transaction built outside it', ioNote: 'screen, buttons and radios on general-purpose chips', entNote: 'certified generator, single source on device', osNote: 'firmware published, element applet absent',
    seParts: {
      auth:    { state: 'element', note: 'the PIN is verified in the element with the counter held there, and this model has no fingerprint sensor to weaken it', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/se_chip.c' },
      keygen:  { state: 'outside', note: 'the mnemonic is built and confirmed on the MCU, then imported into the element, and remains exportable', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/reset.c' },
      signing: { state: 'element', note: 'the key-taking signing function is replaced wholesale so every curve routes into the element, which takes no key parameter', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/se_chip.c' },
      txbuild: { state: 'outside', note: 'the MCU hashes the message and passes 32 bytes to the element' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main microcontroller' },
      input:   { state: 'device', note: 'the buttons are read by the microcontroller, not the element' },
      comms:   { state: 'device', note: 'USB and Bluetooth terminate on general-purpose chips' }
    },
    entRules: {
      source: { state: 'trng', note: 'the THD89 chip\u2019s certification names an AIS-31 PTG.2 physical generator; the element code is closed, so that OneKey\u2019s random call returns its output is taken on trust', src: 'https://oc.ccn.cni.es/en/certified-products/certified-products/product-category/43-tarjetas-inteligentes/998-thd89-1-0-3-secure-element-version-1-0' },
      count:  { state: 'single', note: 'on-device setup takes everything from the element\u2019s generator, with no option to mix in a second source; only setup started from the app mixes in host entropy', src: 'https://github.com/OneKeyHQ/firmware-classic1s/blob/master/legacy/firmware/reset.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the element signs and takes no key, but the seed is assembled and displayed on the MCU first; that MCU firmware is published while the element applet is absent from every public repository', src: 'https://github.com/OneKeyHQ/firmware-classic1s' },
      bootFw: { state: 'source', note: 'a bootloader ships in the repository, but no reproducible-build procedure is documented for this model', src: 'https://help.onekey.so/en/articles/11461221-open-source-code-verification-for-firmware-installed-on-onekey-hardware-wallet-devices' },
      board:  { state: 'closed', note: 'no hardware design repository exists in the vendor organisation' },
      host:   { state: 'source', note: 'the SDK is public, but the app ships under a reference-use-only licence forbidding derivatives and redistribution', src: 'https://github.com/OneKeyHQ/app-monorepo' }
    },
    note: 'Transparent case over a mono OLED and four physical buttons, so the board is visible \u2014 though its design files are not published.',
    watch: 'The same split as the Pro, without the fingerprint sensor: the element holds the PIN counter and signs without releasing the key, but the mnemonic is built on the MCU and the element signs a digest it cannot inspect.'
  },

  {
    id: 'coolwalletgo', photo: 'images/devices/coolwallet-go.webp', url: 'https://www.coolwallet.io/products/coolwallet-go', name: 'CoolWallet Go', meta: 'card · NFC · no display',
    seNote: 'signs on the element, but nothing authorises the signature', ioNote: 'no screen and no button; the phone is the only interface', entNote: 'no source published and the chip is unnamed', osNote: 'SDK open, everything touching the seed closed',
    seParts: {
      auth:    { state: 'outside', note: 'there is no per-transaction authorisation step at all — the confirm-then-release sequence the Pro uses is explicitly unsupported', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' },
      keygen:  { state: 'element', note: 'the card can generate the seed, though the app can generate one instead and inject it', src: 'https://www.coolwallet.io/blogs/help-center/should-i-generate-my-recovery-phrases-using-the-card-or-the-app' },
      signing: { state: 'element', note: 'an applet distinct from the Pro\u2019s, with no published source, signs on the card' },
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
    note: 'Battery-free NFC card with no screen and no button; everything you confirm, you confirm on the phone.',
    watch: 'Nothing on the card shows what is being signed or records consent, and a Go-only API signs any hash the phone computes. A compromised phone app can get a signature on anything.'
  },
  {
    id: 'coolwalletpro', photo: 'images/devices/coolwallet-pro.png', url: 'https://www.coolwallet.io/products/coolwallet-pro', name: 'CoolWallet Pro', meta: 'card · e-ink · Bluetooth',
    seNote: 'keys and signing in the element, approval outside it', ioNote: 'a screen and button, both driven by the card MCU', entNote: 'hardware generator, single source, no certificate', osNote: 'applet published but unbuildable; firmware closed',
    seParts: {
      auth:    { state: 'outside', note: 'the pairing password is checked in the element, but per-transaction approval is not — the MCU issues the authorisation on the user\u2019s behalf', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      keygen:  { state: 'element', note: 'the applet generates the seed itself, though the setup flow also lets the phone generate one and inject it', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      signing: { state: 'element', note: 'signing runs in the applet over keys derived inside it', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      txbuild: { state: 'element', note: 'the phone sends a vendor-signed script and arguments, and the applet composes, hashes and formats the transaction itself', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' }
    },
    ioParts: {
      display: { state: 'device', note: 'the e-paper panel is rendered by the card MCU, though the text it shows is computed in the element', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      input:   { state: 'device', note: 'the button is read by the MCU, which then tells the element to release the signature', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      comms:   { state: 'device', note: 'Bluetooth terminated by the card MCU', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the applet requests the chip\u2019s hardware generator, and the build tooling points to an NXP JCOP chip, but the exact part and any certificate are undisclosed', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      count:  { state: 'single', note: 'seed entropy comes from one call to one generator; nothing else is mixed and there is no user contribution' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the applet that generates and uses the key is genuinely published, but under a non-commercial licence with an internal crypto library withheld, so it cannot be built', src: 'https://github.com/CoolBitX-Technology/coolwallet-pro-se' },
      bootFw: { state: 'closed', note: 'the MCU firmware driving Bluetooth, display and power is not published', src: 'https://github.com/orgs/CoolBitX-Technology/repositories' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'source', note: 'the SDK is Apache-2.0 and actively maintained, but the companion app is closed', src: 'https://github.com/CoolBitX-Technology/coolwallet-sdk' }
    },
    note: 'Card format with an on-device e-ink display and a single button, over Bluetooth. Biometric unlock exists only in the phone app.',
    watch: 'The element builds and signs the transaction itself, which is rare \u2014 but the button is read by the card MCU, and the element accepts that MCU\u2019s approval command without any check of its own. Whoever controls the MCU controls consent.'
  },
  {
    id: 'bitkey', photo: 'images/devices/bitkey.png', url: 'https://bitkey.world/product/first-gen', name: 'Bitkey (1st gen)', meta: 'NFC · fingerprint · no element',
    seNote: 'no discrete element; the key is derived, held and handed over in plaintext by ordinary firmware', ioNote: 'fingerprint on device, but nothing to see what you sign', entNote: 'uncertified for this part, single source', osNote: 'broadly published, not reproducibly buildable',
    seParts: {
      auth:    { state: 'outside', note: 'the fingerprint is matched by a withheld vendor library on the main Cortex-M33 core, not in the chip\u2019s Secure Engine', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/hal/biometrics/src/fpc_biometrics.c' },
      keygen:  { state: 'outside', note: 'the Secure Engine supplies the random bytes, but the seed and master key are derived in ordinary firmware memory', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/lib/wallet/src/seed.c' },
      signing: { state: 'outside', note: 'the Secure Engine performs the ECDSA, but bip32_sign() first copies the private key into an ordinary firmware buffer and hands it over tagged KEY_STORAGE_EXTERNAL_PLAINTEXT \u2014 defined in key_management.h as \u201ckey is available in plaintext to firmware\u201d \u2014 so the key sits in plaintext outside the Secure Engine on every signature', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/bip32/bip32.c#L376-L396' },
      txbuild: { state: 'outside',  note: 'the phone builds and hashes the transaction' }
    },
    ioParts: {
      display: { state: 'host', note: 'no display on the device — what you see comes from the phone app' },
      input:   { state: 'device', note: 'the fingerprint sensor is the only input, read by the main MCU' },
      comms:   { state: 'device', note: 'NFC through an ST25R3916 driven by the MCU; USB-C only charges' }
    },
    entRules: {
      source: { state: 'hardware', note: 'EFR32MG24 Secure Engine generator; the datasheet claims SP 800-90B health tests, but the PSA certificate covers other parts and does not list this one', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/lib/crypto/src/efr32/secure_rng.c' },
      count:  { state: 'single', note: 'one call to one generator, with no second source and no user path', src: 'https://github.com/proto-at-block/bitkey/blob/main/firmware/lib/wallet/src/seed.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the firmware is MIT, but a contractually withheld fingerprint library means no external party can build it', src: 'https://github.com/proto-at-block/bitkey/tree/main/firmware' },
      bootFw: { state: 'source', note: 'the bootloader ships in the same tree; it does not use the withheld fingerprint library, but the shared build cannot run without it' },
      board:  { state: 'source', note: 'a main-logic-board schematic is published as a PDF; no layout files, no BOM, no open-hardware licence', src: 'https://github.com/proto-at-block/bitkey' },
      host:   { state: 'source', note: 'the Android app is MIT and ships a harness that rebuilds and diffs the installed package; the iOS source is published but not verifiable, and there is no third-party SDK', src: 'https://github.com/proto-at-block/bitkey/blob/main/app/verifiable-build/android/README.md' }
    },
    note: 'Pairs a software wallet for routine transactions with hardware for large ones \u2014 a sound split, and the firmware is public. There is no secure element: the board carries a single EFR32MG24 microcontroller whose built-in Secure Engine encrypts the seed at rest, while the wallet itself runs on the chip\u2019s ordinary core. Block chose this deliberately, writing in Processing our Processor Choice that \u201cwhile a Secure Element (SE) would meet our security criteria, it would also prevent us from publishing certain layers of firmware\u201d. This is the first-generation, screenless model; the 2026 model with a touchscreen is scored separately below.',
    watch: 'The hardware half has no display, so there is nothing on which to visually confirm what you are approving.'
  },
  {
    id: 'bitkey2', photo: 'images/devices/bitkey-2.png', url: 'https://bitkey.world/product', name: 'Bitkey (2nd gen)', meta: 'NFC · fingerprint · OLED touch · no element',
    seNote: 'still no element; the key is derived, held and handed over in plaintext by ordinary firmware', ioNote: 'screen and touch on a second MCU, fingerprint on the first', entNote: 'uncertified for this part, single source', osNote: 'published, not buildable; no schematic for this model',
    seParts: {
      auth:    { state: 'outside', note: 'the fingerprint is matched by the withheld FPC library on the EFR32MG24’s main Cortex-M33 core, as in the first gen', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/app/w3-core/application/meson.build#L24' },
      keygen:  { state: 'outside', note: 'unchanged from the first gen: the Secure Engine supplies the random bytes, but the seed and master key are derived in ordinary firmware memory', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/wallet/src/seed.c#L21-L37' },
      signing: { state: 'outside', note: 'the same bip32_sign() path as the first gen — the private key is copied into a firmware buffer tagged KEY_STORAGE_EXTERNAL_PLAINTEXT before the Secure Engine computes the ECDSA', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/bip32/bip32.c#L376-L396' },
      txbuild: { state: 'outside', note: 'the device now parses the transaction and computes the BIP143 sighash itself — but on the ordinary core, not in an element', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/psbt/src/psbt.c#L579-L673' }
    },
    ioParts: {
      display: { state: 'device', note: 'an OLED touchscreen shows the amount, fee and address the core parsed itself; it is driven by a separate STM32U585, which receives the screen contents from the core over an encrypted UART', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/app/tasks/key_manager/src/w3-core/key_manager_task_port.c#L1851-L1931' },
      input:   { state: 'device', note: 'approval is a tap on the touchscreen, read by the STM32U585 and passed to the core as an APPROVE message; the fingerprint is read by the core', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/display_controller/src/flows/money_movement.c#L168-L181' },
      comms:   { state: 'device', note: 'NFC through an ST25R3916 driven by the EFR32MG24; USB-C only charges, and there is no Bluetooth or USB data stack', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/app/w3-core/application/meson.build' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the same EFR32MG24 Secure Engine generator; the datasheet claims SP 800-90B health tests, but no certificate covering this part’s generator was found', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/crypto/src/efr32/secure_rng.c' },
      count:  { state: 'single', note: 'one call to one generator; the STM32U585’s generator is not mixed in, and there is no user path', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/lib/wallet/src/seed.c#L25' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'the core firmware is MIT, but it links the contractually withheld FPC fingerprint library, so no outside party can build it', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/README.md' },
      bootFw: { state: 'source', note: 'both bootloaders and the STM32U585 display firmware are published, but the shared build needs the withheld library, and the touch controller’s firmware ships as a prebuilt FocalTech blob', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/firmware/hal/touch/src/ft3169_fw.i' },
      board:  { state: 'closed', note: 'the only published schematic is the first-generation board; nothing is published for this model', src: 'https://github.com/proto-at-block/bitkey/tree/4ba8c4c87dfe16b7514b328f523233bb7501c246/hardware' },
      host:   { state: 'source', note: 'the same app as the first gen: Android is MIT with a harness that rebuilds and diffs the installed package; the iOS source is published but not verifiable', src: 'https://github.com/proto-at-block/bitkey/blob/4ba8c4c87dfe16b7514b328f523233bb7501c246/app/verifiable-build/android/README.md' }
    },
    note: 'Announced 27 April 2026 at $250 (Block’s release notes call it Bitkey with Screen): the first gen’s 2-of-3 multisig design with an OLED touchscreen added. There is still no secure element — the board carries two general-purpose chips. An EFR32MG24 holds the seed, reads the fingerprint, runs NFC, parses the transaction and signs it; an STM32U585 drives the screen and reads the touch panel, talking to the first chip over an encrypted UART. Chip identities come from the published firmware; no schematic, teardown or audit of this model was found.',
    watch: 'You can now check the address and amount on the device before approving, which the first gen could not do — but the screen and the approval tap both sit on a second general-purpose MCU, and the key still leaves the Secure Engine in plaintext on every signature.'
  },
  {
    id: 'dcent', photo: 'images/devices/dcent-bio.webp', url: 'https://store.dcentwallet.com/products/biometric-wallet', name: 'DCENT Biometric', meta: 'Bluetooth · fingerprint · OLED',
    seNote: 'keys and signing in the element, parsing on the MCU', ioNote: 'screen and buttons on the device, driven by its MCU', entNote: 'nothing established about the generator', osNote: 'firmware repo holds binaries only',
    seParts: {
      auth:    { state: 'unknown', note: 'the vendor\u2019s own sources disagree — one names an ST33 holding the fingerprint, another names an NXP part, and the newer model badges in-element fingerprints as exclusive to itself', src: 'https://store.dcentwallet.com/products/dcent-x' },
      keygen:  { state: 'element', note: 'keys generated internally and stored encrypted on the chip — vendor claim, no source published' },
      signing: { state: 'element', note: 'the element holds the keys and performs the cryptographic operations', src: 'https://store.dcentwallet.com/blogs/post/coinspect-audit-of-the-d-cent-wallet' },
      txbuild: { state: 'outside', note: 'the MCU parses the transaction and hands the element a hash, per the Coinspect audit', src: 'https://store.dcentwallet.com/blogs/post/coinspect-audit-of-the-d-cent-wallet' }
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
      host:   { state: 'closed', note: 'the MIT web connector only opens a vendor-hosted bridge page; the code that talks to the device, and the app, are closed', src: 'https://github.com/DcentWallet/dcent-web-connector' }
    },
    note: 'On-device OLED display, with input taken on the device via a fingerprint sensor and physical buttons rather than delegated to the phone. The brand was renamed from D\u2019CENT to DCENT in September 2026.',
    watch: 'The vendor\u2019s own sources disagree on which element this model uses and whether the fingerprint is matched inside it, and the firmware repository holds binaries only. Until that is settled, authentication stays unverified.'
  },
  {
    id: 'dcentx', photo: 'images/devices/dcent-x.webp', url: 'https://store.dcentwallet.com/products/dcent-x', name: 'DCENT X', meta: 'Bluetooth · USB-C · AMOLED touch · fingerprint',
    seNote: 'everything but transaction parsing claimed in the element', ioNote: 'touchscreen and fingerprint on the device', entNote: 'nothing established about the generator', osNote: 'nothing published for this model',
    seParts: {
      auth:    { state: 'element', note: 'fingerprint stored and matched in the same chip as the keys, with the retry lockout enforced there — vendor claim, weeks old and unaudited', src: 'https://store.dcentwallet.com/products/dcent-x' },
      keygen:  { state: 'element', note: 'the recovery phrase is generated by the secure chip and shown on the device screen', src: 'https://store.dcentwallet.com/products/dcent-x' },
      signing: { state: 'element', note: 'the key is isolated in the certified chip and signing is performed there', src: 'https://store.dcentwallet.com/products/dcent-x' },
      txbuild: { state: 'unknown', note: 'the vendor never says whether its security OS runs on the element or a separate application processor, and no protocol is published for this model' }
    },
    ioParts: {
      display: { state: 'device', note: 'a 2.4-inch AMOLED touchscreen \u2014 too much for a smartcard-class element to drive, so an application chip almost certainly does; inferred' },
      input:   { state: 'device', note: 'touchscreen and side fingerprint sensor, read on the device' },
      comms:   { state: 'device', note: 'Bluetooth, USB-C and NFC (for the recovery card) handled outside the element; inferred' }
    },
    entRules: {
      source: { state: 'unknown', note: 'no statement about the generator, and the element part number is not reliably established' },
      count:  { state: 'unknown', note: 'no documentation of sources, mixing or any user contribution' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'a proprietary security OS holds and uses the key; nothing is published', src: 'https://store.dcentwallet.com/products/dcent-x' },
      bootFw: { state: 'closed', note: 'nothing published for this model' },
      board:  { state: 'closed', note: 'nothing published' },
      host:   { state: 'closed', note: 'the MIT web connector lists this model but only opens a vendor-hosted bridge page; the app is closed', src: 'https://github.com/DcentWallet/dcent-web-connector' }
    },
    note: 'Launched September 2026. A 2.4-inch AMOLED touchscreen fills the front, with a fingerprint sensor on the right edge; the vendor says fingerprints are matched inside the same chip as the keys.',
    watch: 'Everything that lifts this above the Biometric is a vendor claim about a weeks-old product: no audit, no published protocol, and no statement of whether the security OS runs on the element or on the application chip beside it.'
  },
  {
    id: 'dcents', photo: 'images/devices/dcent-s.webp', url: 'https://store.dcentwallet.com/products/dcent-s-r3covery-card-kit', name: 'DCENT S', meta: 'card · NFC · no display',
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
      host:   { state: 'closed', note: 'the published connector supports only USB and Bluetooth, so it cannot reach this NFC-only card, and the app is closed' }
    },
    note: 'Battery-free, NFC-only card with a CC EAL6+ element, sold as a kit with a backup card.',
    watch: 'Nothing on the card shows what is being signed or records consent, and the PIN is typed into the phone. The element protects the key; the phone decides what it signs.'
  },
  {
    id: 'arculus', photo: 'images/devices/arculus-card.webp', url: 'https://www.getarculus.com/products/arculus-cold-storage-wallet.html', name: 'Arculus', meta: 'card · NFC · no display',
    seNote: 'keys, signing and PIN check on the card; the phone builds the transaction', ioNote: 'no display and no on-card input', entNote: 'generator claimed but unnamed and uncheckable', osNote: 'closed at every layer',
    seParts: {
      auth:    { state: 'element', note: 'the PIN is stored only on the card and checked there, with a counter that wipes the keys after three failures \u2014 though it is typed into the phone', src: 'https://www.getarculus.com/content/Whitepapers/Arculus-HowItWorksFinal.pdf' },
      keygen:  { state: 'element', note: 'keys generated on the smartcard element', src: 'https://www.getarculus.com/content/Whitepapers/Arculus-HowItWorksFinal.pdf' },
      signing: { state: 'element', note: 'signing runs on the element' },
      txbuild: { state: 'outside',  note: 'the phone builds and hashes the transaction' }
    },
    ioParts: {
      display: { state: 'host', note: 'no display on the device — what you see comes from the phone app' },
      input:   { state: 'host', note: 'nothing on the device records consent; the app collects it' },
      comms:   { state: 'element', note: 'a battery-free card with no microcontroller: the NFC-enabled secure element and its antenna terminate the link', src: 'https://www.getarculus.com/content/Whitepapers/Arculus-HowItWorksFinal.pdf' }
    },
    entRules: {
      source: { state: 'unknown', note: 'a true generator is claimed, but the chip is never named, so no certificate can be tied to it \u2014 scored as absent' },
      count:  { state: 'single', note: 'the card returns a mnemonic from a call whose only input is the word count, per the header of a third-party wrapper around CompoSecure\u2019s closed library; the phone contributes nothing, and 12 words is the default', src: 'https://github.com/ByneappLLC/arculus-sdk-flutter/blob/main/android/src/main/cpp/include/csdk.h' }
    },
    osLayers: {
      seedFw: { state: 'closed', note: 'the smartcard applet generates and uses the key and nothing about it is published', src: 'https://walletscrutiny.com/hardware/arculus/' },
      bootFw: { state: 'closed', note: 'no bootloader or supporting firmware published; the applet ships locked and non-updatable' },
      board:  { state: 'closed', note: 'no schematics, inlay design or bill of materials published' },
      host:   { state: 'closed', note: 'the SDK sits behind a partner login and the app is store-only', src: 'https://developers.getarculus.com/' }
    },
    note: 'A single secure element in a card body, with keys generated, stored and used on the card and the PIN checked there. The chip is never named, so its certification cannot be checked.',
    watch: 'Nothing on the card shows you what you are signing, and nothing on it records your consent. Every confirmation is delegated to the phone, so users inherit every vulnerability in the mobile app.'
  },
  {
    id: 'seedsigner', photo: 'images/devices/seedsigner.png', url: 'https://seedsigner.com/', name: 'SeedSigner', meta: 'QR air-gap · DIY · stateless',
    seNote: 'no element, and no authentication of any kind', ioNote: 'one chip parses, displays and signs; no host in the path', entNote: 'camera noise with other inputs, or dice alone \u2014 never both', osNote: 'app and OS open; the Pi boot firmware is closed',
    seParts: {
      auth:    { state: 'outside', note: 'no authentication of any kind \u2014 no PIN, no counter; the device boots straight to its menu and the only secret is an optional passphrase' },
      keygen:  { state: 'outside', note: 'the mnemonic is produced in Python and displayed in clear for you to write down \u2014 export is the design, not a leak' },
      signing: { state: 'outside', note: 'signing runs in the same interpreter process on the application processor' },
      txbuild: { state: 'outside', note: 'parse, hash and sign all happen in one process \u2014 there is no element, so there is no hand-off boundary to criticise' }
    },
    ioParts: {
      display: { state: 'device', note: 'the LCD is driven over SPI by the application processor' },
      input:   { state: 'device', note: 'joystick and buttons read as raw GPIO by the same chip' },
      comms:   { state: 'none', note: 'there is no host link to attack \u2014 networking and Bluetooth are compiled out on every image, and USB drivers on the Pi Zero 1.3 image (though not on the Pi Zero 2 W); the only channel is a camera in and a QR code out', src: 'https://github.com/SeedSigner/seedsigner-os' }
    },
    entRules: {
      source: { state: 'hardware', note: 'no dedicated generator \u2014 the physical noise source is the camera image sensor, which counts as hardware randomness; its health checks are a stuck-sensor detector rather than an entropy measurement', src: 'https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/views/tools_views.py' },
      count:  { state: 'multiple', note: 'the camera mode hashes several frames with the serial number and clock; the dice or coin mode uses your entries alone, with nothing device-side mixed in. Two sources in one mode, the user alone in the other, never both', src: 'https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/helpers/mnemonic_generation.py' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'no element, so the application itself holds and uses the seed; MIT and reproducible against a published hash, but the firmware is a card you write and nothing on the device attests it', src: 'https://github.com/SeedSigner/seedsigner-os' },
      bootFw: { state: 'closed', note: 'the OS image builder is reproducible, but the Pi boots through closed Broadcom firmware shipped in the same image' },
      board:  { state: 'source', note: 'the project designs no board, so this is scored on the Raspberry Pi it runs on \u2014 Raspberry Pi publishes a document it calls reduced schematics, with no layout files, no bill of materials and no open-hardware licence, over a system-on-chip whose boot ROM is closed', src: 'https://datasheets.raspberrypi.com/rpizero/raspberry-pi-zero-reduced-schematics.pdf' },
      host:   { state: 'open', note: 'no first-party software is shipped; the device is driven by third-party open wallets such as Sparrow, over standard QR payloads' }
    },
    note: 'Open-source, self-assembled and air-gapped by QR only. Its defining choice is statelessness: the seed is entered per session and nothing is retained when power is removed, so there is no stored secret to extract. Because it designs no hardware of its own, the board it is scored on is the Raspberry Pi underneath it.',
    watch: 'It strains the rubric. The secure-element criterion asks how well a stored seed is protected \u2014 this device stores none, but runs on a general-purpose SoC while the seed is in memory, so it scores zero on a property its design sidesteps. Read that zero as nothing to protect at rest, not as badly protected.'
  },
  {
    id: 'jadeplus', photo: 'images/devices/jade-plus.png', url: 'https://store.blockstream.com/products/jade-plus', name: 'Blockstream Jade Plus', meta: 'colour display · camera · open source',
    seNote: 'no element \u2014 a remote blind oracle does its anti-bruteforce job', ioNote: 'one chip parses, displays and signs; no bridge chip', entNote: 'thorough mixing, uncertified source', osNote: 'firmware links closed radio libraries; fabrication-grade board files',
    seParts: {
      auth:    { state: 'outside', note: 'a remote blind oracle stands in for an element: it holds half the decryption key, never learns the PIN, and enforces the strike counter out of a physical attacker\u2019s reach' },
      keygen:  { state: 'outside', note: 'the mnemonic is generated by firmware on the application processor' },
      signing: { state: 'outside', note: 'signing runs in a library compiled into the firmware, with keys in ordinary RAM while unlocked' },
      txbuild: { state: 'outside', note: 'parsing and display happen on the same chip that signs \u2014 no element, but also no hand-off' }
    },
    ioParts: {
      display: { state: 'device', note: 'the panel is driven directly by the main processor with no co-processor between them' },
      input:   { state: 'device', note: 'navigation and select buttons read as raw GPIO by the same chip' },
      comms:   { state: 'device', note: 'USB and Bluetooth land on the application processor itself \u2014 a small power-management chip sits beside it but carries no data, and there is no element either' }
    },
    entRules: {
      source: { state: 'hardware', note: 'the processor\u2019s own generator, which the firmware candidly notes is pseudo-random unless the radio or sensor source is active; the chip\u2019s certification is questionnaire-level and does not cover the generator', src: 'https://github.com/Blockstream/Jade/blob/master/main/random.c' },
      count:  { state: 'multiple', note: 'every draw is hashed over the battery voltage, a cycle counter, rolling state and the chip generator, seeded at boot with camera frames \u2014 the most thorough mixing here, but no user contribution', src: 'https://github.com/Blockstream/Jade/blob/master/main/random.c' }
    },
    osLayers: {
      seedFw: { state: 'source', note: 'no element, so the firmware holds and uses the seed; it is GPL3 with a documented reproducible build and secure boot, but the Bluetooth build links Espressif\u2019s closed controller libraries into the same chip, so it cannot be rebuilt entirely from source', src: 'https://github.com/Blockstream/Jade/blob/master/REPRODUCIBLE.md' },
      bootFw: { state: 'open', note: 'the bootloader path ships in the same tree and the same reproducible build, with secure boot and anti-rollback enabled' },
      board:  { state: 'open', note: 'fabrication-grade publication — project files, schematics, board layout and bill of materials; the most complete hardware release on this sheet', src: 'https://github.com/Blockstream/Jade/tree/master/hardware/jade_v2' },
      host:   { state: 'source', note: 'the libraries are BSD-MIT and the apps GPL-3.0, but no reproducible build was established for them', src: 'https://github.com/Blockstream/green_qt' }
    },
    note: 'Blockstream\'s open-source signer, with an on-device colour display, a camera for air-gapped QR flows, and physical input on the device rather than the phone.',
    watch: 'There is no element: a remote blind oracle stands in for one, holding half the key and enforcing the PIN retry limit out of a physical attacker\u2019s reach. That scores zero here because the rubric measures silicon, but it is a third architecture \u2014 and unlocking depends on reaching the oracle server, which you can also run yourself.'
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

function vendorLink(w) {
  const url = safeUrl(w.url);
  if (!url) return '';
  let label;
  try {
    label = new URL(url).hostname.replace(/^www\./, '').toUpperCase();
  } catch {
    return '';
  }
  return `
        <div class="vendor-link">
          <div class="kicker">MANUFACTURER</div>
          <a class="os-src" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} \u2197</a>
        </div>`;
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
        </div>${vendorLink(w)}${rulesBreakdown(w, 'SECURE ELEMENT \u2014 COMPONENT BREAKDOWN', SE_PARTS, w.seParts, seScore(w))}${rulesBreakdown(w, 'TRUSTED I/O \u2014 COMPONENT BREAKDOWN', IO_PARTS, w.ioParts, ioScore(w))}${rulesBreakdown(w, 'ENTROPY \u2014 RULE BREAKDOWN', ENT_RULES, w.entRules, entScore(w))}${osBreakdown(w)}
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
