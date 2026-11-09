/* studio-config.js — THE ONE place to customize your podcast guest studio.
   Edit these values, commit, and redeploy (GitHub Pages). No other file should
   hard-code show name, room, branding, or OBS passwords.
   Loaded before join/index/host scripts. Keep parse-safe (no ?. / ??). */
(function (global) {
	"use strict";
	var STUDIO = {
		/* —— Identity —— */
		showName: "the庄live",
		showNameEm: "the庄live", // used inside <em> on the join landing
		studioLabel: "Studio", // wordmark subtitle, e.g. "Studio"
		hostName: "the host", // "Matt" → used in guest copy ("send that file to …")
		hostHandle: "@thezhuanglive", // shown on stage overlays (𝕏)
		youtubeHandle: "youtube.com/@thezhuanglive",
		hostTagLabel: "the庄live", // URL label= for host/view iframes (underscores → spaces in VDO)

		/* —— Room / links —— */
		room: "zhuanglive", // sanitized the same way VDO does ([\W]+ → _)
		hostPushId: "ZHUANGHOST", // host page &push= value (fpm-scenes skips IDs starting with this if uppercase prefix pattern — see skipPrefix)
		hostSkipPrefix: "ZHUANG", // stream IDs starting with this (case-sensitive match of leading chars) are treated as studio-side, not guests — autodrive skips them. Use same as hostPushId or "FPM" style prefix.
		siteBase: "", // optional absolute origin+path for docs only, e.g. "https://you.github.io/studio". Runtime links stay relative.
		singleInviteAtRoot: true, // bare site root → branded join for `room`

		/* —— Branding —— */
		brand: {
			primary: "#c9a15f", // gold accents
			bg: "#0a161e",
			bgDeep: "#0e121a",
			accent: "#7fd4c1", // teal tags / secondary
			danger: "#a82828",
			text: "#e8eef4"
		},
		assets: {
			logo: "media/studio-logo.svg",
			logoPng: "media/studio-logo.png",
			hostPhoto: "media/studio-host.svg",
			stageBg: "stage/bg-studio.png",
			stageLogo: "stage/studio-logo.png"
		},

		/* —— Guest join —— */
		welcomeLede: "You're about to join the show. Have a great time!",
		holdLede: "The host will bring you in shortly.",
		holdEyebrow: "Green room",
		holdTitle: "You're all set",
		holdBody: "Your camera and microphone are connected. Nobody can see or hear you yet — you'll know the moment you're on.",
		veilTitle: "Entering the studio…",
		footerCredit: "powered by VDO.Ninja",

		/* Recording consent (join.html). On by default. */
		recordingConsentRequired: true,
		recordingConsentTitle: "This session is recorded",
		recordingConsentText:
			"By joining, you understand that your camera and microphone may be recorded for the podcast (including a high-quality backup that uploads to the host's Google Drive). The live show may also be streamed and later uploaded (for example to X and YouTube).",
		recordingConsentCheckbox: "I understand this session may be recorded and published",

		/* Upload / leave copy */
		uploadFailSendHint: "Please send that file to the host.",

		/* —— OBS (host page & bridge). Password MUST stay empty here — pass &obspass= on the host URL. —— */
		obs: {
			url: "ws://127.0.0.1:4455",
			password: "", // never commit a real password
			scenes: ["Starting Soon", "Onstage"],
			stageInput: "Stage",
			onstageScene: "Onstage",
			startingSoonScene: "Starting Soon",
			camSource: "Camera",
			micInput: "Mic/Aux",
			musicInput: "Intro Music",
			/* bridge.html scene names (legacy share auto-switch) */
			shareScene: "Guest - Share",
			sbsScene: "Guest - SBS"
		},

		/* bridge.html: comma-separated push IDs to watch for screen-share, or "" to require &watch= on the URL */
		bridgeWatchIds: "",

		/* IndexedDB name for hidden guest recordings */
		hiddenRecordDb: "studioHiddenRecordings"
	};

	global.STUDIO = STUDIO;
})(typeof window !== "undefined" ? window : globalThis);
