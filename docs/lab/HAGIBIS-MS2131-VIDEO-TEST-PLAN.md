# Hagibis MS2131 HDMI capture — Linux test and video script

**Status:** Planned; three units owned, but no results have been verified.  
**Primary language:** English (video and article), with Norwegian Bokmål article translation.  
**Working title:** *Testing a Cheap HDMI Capture Card on Linux — Hagibis MS2131*  
**Affiliate disclosure:** The product link is an affiliate link: https://s.click.aliexpress.com/e/_c3HEV9Qp . The editorial verdict must be independent.

## Equipment and safety

- Three user-owned Hagibis HDMI capture devices, advertised as MS2131 with HDMI loop-out.
- Ubuntu workstation with OBS Studio and `v4l-utils` installed.
- One or more HDMI sources with known resolution/frame rate; HDMI monitor for loop-out.
- Prefer unprotected HDMI sources (e.g. a test PC or SBC). Do not attempt to bypass HDCP.
- Record exact source, USB port/hub, cables, OS/kernel, OBS version, and device IDs.

## Reproducible Linux discovery

Run before opening OBS:

```bash
uname -a
lsusb
sudo apt install v4l-utils
v4l2-ctl --list-devices
# Repeat for each capture device node, replacing /dev/videoX:
v4l2-ctl -d /dev/videoX --all
v4l2-ctl -d /dev/videoX --list-formats-ext
arecord -l
```

Do not assume all `/dev/video*` nodes are capture streams. Record USB vendor/product IDs for each unit and verify audio device association rather than guessing.

## OBS recording profile (starting point, not a tested preset)

1. Create a profile named **HackShack Capture Test** and a scene collection named **Hagibis MS2131**.
2. Add one **Video Capture Device (V4L2)** source per unit, explicitly selecting its `/dev/videoX` node. Use separate scenes for each unit and a comparison scene with all three.
3. Choose **Custom** resolution/FPS only from the modes actually enumerated by `v4l2-ctl`; start at 1920×1080/30 **if supported**, otherwise use a supported mode.
4. Set OBS canvas/output to 1920×1080 at 30 FPS as a reproducible initial project setting; this does **not** establish that the device captures at that resolution or rate.
5. Record to **MKV** to reduce the risk of losing footage if recording is interrupted. Remux to MP4 after recording when needed.
6. Select a local hardware encoder if reliable, otherwise a software encoder appropriate for the host; note encoder settings and CPU load.
7. Confirm audio separately in OBS; use the device's audio interface only if detected. Check sync using a visible/audible event.
8. Use a known motion pattern and a clock/timecode where possible. Capture OBS **Stats** (dropped/rendering/encoding frames), USB topology and observed behavior.
9. Save the OBS profile and scene collection using OBS's export functionality; do not commit personal paths, device serials or secrets.

## Test matrix

| Test | Method | Evidence / pass criteria |
| --- | --- | --- |
| Linux enumeration | Connect each unit alone, then all three | `lsusb`, V4L2 modes and kernel messages; document failures |
| 720p / 1080p | Select supported source modes | Actual negotiated capture mode, observed FPS and sample clips |
| 4K claims | Test 4K source only if supported by source and monitor | Distinguish input acceptance, loop-out resolution and *recorded* resolution |
| HDMI loop-out | Connect a monitor downstream | Resolution, stability and any observed lag; no unsupported zero-latency claim |
| Audio | Capture a clap/beep sync event | Availability, channel count and sync drift |
| Latency | Film source display and preview together with an independent camera | Repeated measurements with method and uncertainty stated |
| Long recording | Record 30–60 minutes | OBS Stats, thermal behavior, errors, frame drops |
| Three devices | Record simultaneously on separate USB ports/controllers where possible | USB bandwidth, CPU usage, stable capture and failure modes |
| OBS restart / reconnect | Disconnect and reconnect with OBS closed and open | Device recovery, source naming and ordering changes |

**Important:** USB bandwidth and controller sharing can prevent three simultaneous 1080p streams. Report actual results rather than promising a particular capability.

## Video rundown (approximately 8–12 minutes)

| Segment | Target | Content |
| --- | --- | --- |
| 00:00 | Hook | Can an inexpensive HDMI grabber work on Linux? Show test question, not verdict. |
| 00:30 | Disclosure | State that the team owns three units and that product links are affiliate links. |
| 01:00 | Hardware | Ports, cable routing, HDMI input and loop-out; show listing claims as unverified. |
| 02:00 | Linux discovery | `lsusb`, `v4l2-ctl`, supported formats and audio interfaces. |
| 03:30 | OBS setup | Select real V4L2 mode, recording format and audio source. |
| 05:00 | Image and audio | Compare source and recording, frame rate and sync. |
| 06:30 | Loop-out and latency | Demonstrate measurement method and observed limits. |
| 08:00 | Three-unit test | USB topology, OBS Stats and practical multi-camera use. |
| 09:30 | Verdict | Evidence-based strengths, limitations, alternatives and who it suits. |
| 10:30 | Close | Link to full written results, methodology and disclosed affiliate link. |

## Publication checklist

- [ ] Record exact hardware revisions and software versions.
- [ ] Capture evidence for each test; mark unsupported or untested features clearly.
- [ ] Prepare English article and Norwegian Bokmål translation.
- [ ] Disclose affiliate relationship in video description and near links in articles.
- [ ] Use `rel="sponsored noopener noreferrer"` on affiliate links.
- [ ] Publish article/video only after tests are performed and reviewed.
- [ ] Link video and articles to each other and to the lab equipment overview.
