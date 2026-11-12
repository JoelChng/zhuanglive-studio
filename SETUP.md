# the庄live Studio — setup guide

A branded VDO.Ninja guest studio for **the庄live**: single invite link, waiting room, hidden guest ISO recordings to the host’s Google Drive, host/OBS scene control, and screen-share bridge.

Based on [VDO.Ninja](https://github.com/steveseguin/vdo.ninja) (AGPL-3.0-only) and customizations originally published in [matt-leftcurve/studio](https://github.com/matt-leftcurve/studio). See `LICENCE.md` / `LICENSE`. If you host a modified copy, you must offer Corresponding Source (linking this repo when it matches what you serve is enough).

**Do not modify `webrtc.js`** while using Steve Seguin’s public signaling/TURN.

---

## 1. Edit `studio-config.js` (the only config file)

Open `studio-config.js` and set at least:

| Key | Default now | What to put |
| --- | --- | --- |
| `showName` / `showNameEm` | `the庄live` | On-screen show name (UTF-8 OK) |
| `room` | `zhuanglive` | ASCII-safe VDO room id |
| `hostPushId` | `ZHUANGHOST` | Host camera push id (`&push=`) |
| `hostSkipPrefix` | `ZHUANG` | Autodrive skips stream IDs with this prefix |
| `hostHandle` / `youtubeHandle` | `@thezhuanglive` / `youtube.com/@thezhuanglive` | Overlay social lines |
| `liveUrl` | `https://x.com/i/broadcasts/2dKRJpzlBoegrp` | Current X live broadcast link; update each episode |
| `hostTagLabel` | `the庄live` | Label on host view iframes |
| `brand.*` | neutral gold/teal | Colors when you have a brand kit |
| `assets.*` | `media/studio-logo.svg`, etc. | Replace files or change paths |
| `siteBase` | `https://joelchng.github.io/zhuanglive-studio/` | Live Pages URL |
| `recordingConsentRequired` | `true` | Guest must tick “I understand…” before Join |
| `obs.url` | `ws://127.0.0.1:4455` | Local OBS websocket |
| `obs.password` | `""` | **Leave empty** — pass `&obspass=` on the host URL |
| `obs.scenes` / `stageInput` / `camSource` / `micInput` / `musicInput` | see file | Must match OBS |
| `bridgeWatchIds` | `""` | Optional comma-separated guest push IDs for `bridge.html` |

Guest-facing copy (`welcomeLede`, `holdLede`, `uploadFailSendHint`, consent text) is also in this file.

---

## 2. Host on GitHub Pages

1. Create a GitHub repo and push this folder (or unzip `studio.zip`).
2. **Settings → Pages → Deploy from branch `main` / root** (or `/docs` if you prefer).
3. Ensure `.nojekyll` is present (it is) so underscored paths work.
4. After deploy, guest root is:
   - `https://joelchng.github.io/zhuanglive-studio/` → redirects into branded `join.html` for room `zhuanglive`
5. `siteBase` in config is already set to that URL.

Local preview:

```sh
cd studio
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/
```

HTTPS is required for camera/mic from other devices; GitHub Pages provides HTTPS.

---

## 3. Links you will use every week

Live site: `https://joelchng.github.io/zhuanglive-studio/` (keep the trailing slash).

**Guest invite (share this one link):**  
`https://joelchng.github.io/zhuanglive-studio/`  
or explicitly `https://joelchng.github.io/zhuanglive-studio/join.html?room=zhuanglive`  
Optional: `&hold` (waiting room), `&name=Guest_Name`, `&fpmrelay` (Meshcast for screen share).

**Director (control room + Drive ISOs):**  
`https://joelchng.github.io/zhuanglive-studio/?director=zhuanglive&autodrive&autodrivebitrate=3000`  
Sign in to Google Drive when prompted (“Connect Google Drive”).

**Host page (OBS scene buttons + cast / share):**  
`https://joelchng.github.io/zhuanglive-studio/?push=ZHUANGHOST&room=zhuanglive&obspass=YOUR_OBS_PASSWORD&webcam&autostart&label=Host`  
Optional: `&obsurl=ws://127.0.0.1:4455`, `&camsource=Camera`, `&stageinput=Stage`, `&scenes=Starting Soon,Onstage`.

**OBS Browser Source — stage compositor:**  
`https://joelchng.github.io/zhuanglive-studio/stage.html?room=zhuanglive`  
(Host page stamps cast/build into the Stage input URL automatically when connected.)

**Optional screen-share → scene bridge (legacy):**  
`https://joelchng.github.io/zhuanglive-studio/bridge.html?room=zhuanglive&watch=GUESTID1,GUESTID2&pass=YOUR_OBS_PASSWORD`  
Defaults no longer hard-code guest IDs or OBS passwords.

---

## 4. OBS setup (obs-websocket v5)

1. **Tools → WebSocket Server Settings**: enable, port `4455`, set a password.  
   Put that password only in the **host URL** as `&obspass=...` (and bridge `&pass=`), never in `studio-config.js` if the repo is public.
2. Create scenes (names must match config):
   - `Starting Soon`
   - `Onstage`
3. On **Onstage**, add at least:
   - **Browser** source named `Stage` → URL `…/stage.html?room=zhuanglive` (1920×1080)
   - **Video capture** named `Camera` (or change `obs.camSource`)
   - Audio: `Mic/Aux`, optional `Intro Music` for intro mute/unmute
4. Optional legacy scenes for `bridge.html`: `Guest - Share`, `Guest - SBS`.
5. Overlays under `stage/` (`starting-soon.html`, `retro-*.html`, …) use neutral placeholders; point extra Browser Sources at them if you still use per-layout overlays, or rely on `stage.html` v2 alone.

---

## 5. Google Drive guest ISOs

- Director opens the director link with `&autodrive` (or clicks Drive-record per guest).
- First time: click **Connect Google Drive** and allow `drive.file` access.
- Guests join with `&hiddenrecord` (always added by `join.html`): recording buffers locally, uploads to **your** Drive `recordings` folder, then discards the local buffer on success.
- Guests see an upload chip / leave-hold page (“keep this tab open”). On failure they get a `-backup` file in Downloads — ask them to send it to you (`uploadFailSendHint` in config).
- `&autodrive` can stop all guest recordings when OBS streaming ends (needs `&obspass=` on the director/host page that runs autodrive).

Drive OAuth uses VDO.Ninja’s stock Google client id inside `webrtc.js` (do not change `webrtc.js`).

---

## 6. Weekly show checklist

**Before**
- [ ] Pages site loads; `studio-config.js` room/name look right
- [ ] OBS websocket on; scenes/inputs named as in config
- [ ] Open **host** URL with correct `&obspass=`
- [ ] Open **director** URL with `&autodrive`; Connect Google Drive
- [ ] Stage browser source shows the new build (host stamps `&b=` / build meta)
- [ ] Test guest on a phone/laptop: invite → consent → devices → green room / join

**During**
- [ ] Admit/bring onstage from host UI; watch Drive upload chips on guests
- [ ] Prefer guests keep the tab open until “Upload complete” after hanging up

**After**
- [ ] Confirm guest `.webm` files in Drive `recordings/`
- [ ] Stop OBS stream (autodrive should finalize remaining ISOs)
- [ ] Download ISOs for the YouTube edit; archive

---

## 7. Credits & license

- **VDO.Ninja** — Steve Seguin and contributors — AGPL-3.0-only  
- Guest-studio customizations inspired by **matt-leftcurve/studio** (FULLPORTMATT guest studio)  
- This package: **the庄live** defaults + neutral branding + `studio-config.js`

Third-party components keep their own licenses under `thirdparty/` and related notices.
