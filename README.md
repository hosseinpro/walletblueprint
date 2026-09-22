# walletblueprint.com

The source for **[walletblueprint.com](https://walletblueprint.com)** — an independent,
affiliate-free comparison of hardware wallets scored on security architecture rather than
features or star ratings.

## Why it exists

Almost every hardware wallet comparison online is a shopping guide with an affiliate link at
the end. This one is a blueprint: it looks at how each device is built and says plainly
where it is strong and where you are being asked to take someone's word for it.

Buying a hardware wallet is one of the few consumer decisions where the marketing and the
security model have almost nothing to do with each other. Coin counts, screen color and app
design are easy to advertise. Whether the seed can be read off the chip, whether the screen
can be lied to, whether entropy was generated properly — those are the things that decide
whether the device does its job, and they are almost never on the box.

So the site keeps one table, maintained in public, scoring each device on five architectural
properties:

| Property | The question it answers |
|---|---|
| **Secure element** | Can the seed be read off the chip? |
| **Trusted screen** | Is what you see what you sign, or can the display be driven by something else? |
| **Trusted input** | Is consent physical and handled on-device? |
| **Entropy** | Was the key generated properly, and can that be checked? |
| **Open source** | How much of the stack can you actually read? |

Each is scored `0–10`, and the composite is their unweighted mean. It stays unweighted on
purpose: the right weighting is your threat model, not ours.

| Range | Meaning |
|---|---|
| 9 – 10 | Property implemented and independently verifiable |
| 7 – 8 | Sound design, one documented gap or unverifiable claim |
| 4 – 6 | Partial coverage, or mitigations that depend on the host |
| 0 – 3 | Property absent, or claimed with no way to check |

Scores come from datasheets, published firmware, certification reports and disclosed attack
work. Where a vendor claim cannot be checked, it is scored as unverified rather than taken
on trust. Scores are re-read when firmware ships, when a certification lapses, and when a
disclosed attack changes what a property is worth.

## Independence

- **No affiliate links.** Nothing here earns a commission, and no ranking is for sale.
- **Public rubric.** Every score maps to a written criterion you can argue with.
- **Sources named.** Every claim traces to a datasheet, a certification report or a disclosure.

## Contact

To suggest a wallet for the table, raise a concern about a score, or send a teardown, email
me at [hossein@walletblueprint.com](mailto:hossein@walletblueprint.com). Every message is
read by a person, and submissions are never paid placements.
