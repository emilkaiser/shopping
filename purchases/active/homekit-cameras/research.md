# Research — HomeKit cameras

## Current conclusion

Checked 2026-10-07. Keep **two fixed Aqara G100-family cameras** as the indoor value shortlist; investigate E1 where a moving view is useful. Outdoor floodlighting remains a related, separate decision. No completed purchase or confirmed installation is recorded.

## Recovered brief and provenance

[Best HomeKit Camera](https://chatgpt.com/c/6a6f64c1-9244-83eb-82b6-6a0016681803) contains the user's 2026-08-07 request for a good floodlight and two indoor HomeKit cameras. The latest 2026-09-06 answer recommended 2 × G100 Select at about 459 SEK each. These are historical assistant recommendations, not proof of a chosen SKU or current price.

The earlier user comment “1000 sounds right” occurred in the outdoor discussion. Preserve it as an approximate outdoor budget reference; it is not a confirmed ceiling for the whole setup. No home hub, iCloud plan, mounting geometry or existing Hue Bridge was confirmed in the recovered messages. The present [migration request](https://chatgpt.com/c/6ac6405d-1b50-83ed-8792-0410623ac982) authorizes adding this context to shopping.

## Comparison and fresh evidence

| Candidate | Reason to consider | Limitation / price snapshot |
| --- | --- | --- |
| [G100 at Apple Sweden](https://www.apple.com/se/shop/product/hsbh2zm/a/aqara-g100-inomhuskamera) × 2 | Native HKSV; simple fixed coverage | 395 SEK each, 790 SEK pair before delivery and any power adapters; listing says G100, not Select |
| [Aqara E1](https://us.aqara.com/products/camera-e1) | HKSV, motorized pan/tilt and privacy rotation | Swedish price unverified; power adapter is not included |

[Aqara's G100 specification](https://www.aqara.com/en/product/camera-g100/) distinguishes **CH-C08E (G100)** and **CH-C08D (G100 Select)**. It lists 2304×1296 capture, 140° diagonal view, 2.4 GHz Wi-Fi, 5 V/1 A power and microSD up to 512 GB. Confirm retailer model/region; do not silently equate the two variants. Listed box contents include a power cable, not a mains adapter.

[Apple's HKSV guide](https://support.apple.com/en-ie/guide/icloud/mme054c72692/icloud) lists one camera on 50 GB, five on 200 GB and unlimited on 2 TB or above, with ten days of recorded activity. Check the home hub, existing plan and desired recording mode. The earlier “HKSV is limited to 1080p” statement is retained only as historical context: current negotiated recording resolution for this SKU/firmware was not verified, and sensor resolution alone does not establish it.

E1's [manufacturer page](https://us.aqara.com/products/camera-e1) distinguishes its own person detection from third-party exposure, and describes using Aqara scenes for additional controls. Do not assume all Aqara-app functions appear directly in Apple Home.

## Outdoor options retained from the prior chat

| Architecture | When useful | Unresolved |
| --- | --- | --- |
| Conventional PIR floodlight | Automatic exterior light without another camera ecosystem | Beam coverage, mounting, brightness, current quote |
| Eve Motion or Hue outdoor sensor plus controllable light | Motion events and lighting automations in Apple Home | Existing Thread/hub or Hue Bridge, compatible control/relay, installed cost; not reverified here |
| [Tapo C720](https://www.tapo.com/en/product/smart-camera/tapo-c720/) | Exterior video and floodlight together | Not verified as a native HomeKit camera; separate app acceptable? Current Swedish quote needed |

The chat corrected its first C720 estimate from roughly 1,000 SEK to 1,350–2,200 SEK. Do not use the earlier estimate as a live offer. Historical conventional-light and sensor/relay estimates likewise exclude a verified installed quote.

## Review evidence, open questions and monitoring

Independent review/owner consensus has not been established in this migration; the fixed-camera preference is a provisional fit judgment. Confirm room coverage, power, recording/privacy modes and whether outside needs video before final selection. All prices above are dated snapshots; effective total remains null until required extras and delivery are known. Criteria weights are provisional. Monitoring fields are preserved but disabled pending a useful threshold.
