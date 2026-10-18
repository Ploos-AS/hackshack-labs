# Retro Video on Linux — reproducible test protocol

**Status:** Preparation only; no recordings or measurements completed.  
**Equipment owned:** 1 × RetroScaler GBS Control Pro; 3 × Hagibis HDMI capture cards (advertised MS2131).  
**Languages:** English original, Norwegian Bokmål translation.  
**Editorial policy:** Affiliate links disclosed; do not report unverified compatibility or results as facts.

## 1. Hardware inventory before connecting

- Photograph all connectors and labels; note board revision, firmware, power rating and serial/model identifiers privately.
- Confirm GBSC inputs on the *actual unit*: SCART, RGBS, VGA, YPbPr, composite and S-Video are listing claims, not verified capabilities.
- Confirm each Hagibis unit independently with `lsusb`, `v4l2-ctl --list-devices`, `v4l2-ctl --list-formats-ext`, `arecord -l`.
- Identify and label the three capture units **H1**, **H2**, **H3**. Avoid exposing unique identifiers in public screenshots.
- Record retro source, video standard, cable/pinout and power supplies. Do not connect TTL-level video/sync or RS-232 to inappropriate inputs; verify SCART/RGB pinouts and voltage levels.

## 2. Recommended Linux tools

On Debian/Ubuntu (package availability varies):

```sh
sudo apt update
sudo apt install obs-studio ffmpeg v4l-utils usbutils alsa-utils mediainfo
```

Read-only discovery commands:

```sh
uname -a
lsusb
v4l2-ctl --list-devices
v4l2-ctl --device=/dev/video0 --list-formats-ext
ffmpeg -hide_banner -f v4l2 -list_formats all -i /dev/video0
arecord -l
```

**Caution:** `/dev/video0` is only an example. Match each capture device to its actual node; multiple devices may create multiple video nodes. Prefer stable `/dev/v4l/by-id/` or `/dev/v4l/by-path/` symlinks where available.

## 3. Wiring and baseline

```text
Retro computer / console
       │ verified analog video cable
       ▼
RetroScaler GBS Control Pro
       │ HDMI
       ▼
Hagibis capture card ── USB ── Linux PC (OBS / FFmpeg)
       │
       └── HDMI loop-out (if present) ── display
```

- Record the actual connection topology; verify whether loop-out is present and works.
- Check GBSC direct-to-display output *before* adding capture card; capture limitations must not be misattributed to the scaler.
- Do not assume HDMI audio exists or passes through; document any separate audio connection.
- Keep a fixed display, cable, power source, capture USB port and software version during A/B comparisons.

## 4. OBS baseline profile

Create a dedicated **Retro-GBSC** scene collection and a **Retro-GBSC-Baseline** profile. Use a Video Capture Device source with the actual V4L2 device.

| Setting | Baseline / procedure |
| --- | --- |
| Canvas | 1920×1080, only if confirmed by the capture device |
| Output | 1920×1080 or a confirmed supported mode |
| FPS | **50** for verified PAL/50 Hz output; **60** for verified 60 Hz; avoid silent conversion |
| Video source | Explicit device, supported resolution, FPS and pixel format; no automatic settings if reproducibility is needed |
| Audio | Capture audio source separately if necessary; document routing and sample rate |
| Recording | MKV for robust recording, remux to MP4 only when needed |
| Encoder | Choose and record actual encoder (software/hardware); keep identical for comparison |
| Filters | Start with none; note every crop, scale, deinterlace and color adjustment |
| Stats | Open OBS Stats and note rendering lag, encoding lag and dropped frames |

Do not hardcode 1080p50 if the device does not enumerate it. Record both *requested* and *negotiated* formats.

## 5. FFmpeg reproducible capture example

First list modes and choose an advertised, tested mode. Example only:

```sh
ffmpeg -hide_banner -f v4l2 -list_formats all -i /dev/video0
# Replace /dev/video0, 1280x720, 50 and mjpeg with values the device actually supports:
ffmpeg -hide_banner -f v4l2 -input_format mjpeg -video_size 1280x720 \
  -framerate 50 -i /dev/video0 -t 30 \
  -c:v libx264 -preset veryfast -crf 18 \
  retro-gbsc-test-01.mkv
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,avg_frame_rate \
  -of default=noprint_wrappers=1 retro-gbsc-test-01.mkv
```

FFmpeg example has no audio track; add a verified audio input explicitly when testing A/V sync. A successful capture alone does not prove zero dropped frames or correct source cadence.

## 6. Test matrix

| ID | Source | Input | Mode | Scaler settings | Capture | Questions |
| --- | --- | --- | --- | --- | --- | --- |
| RV-01 | Test pattern / known source | Confirmed input | 50 Hz | Baseline | H1 | Handshake, stable capture, geometry |
| RV-02 | Amiga OCS/ECS (if available) | 15 kHz RGB | PAL 50 Hz | Baseline | H1 | Sync, scrolling, aspect, deinterlacing |
| RV-03 | Amiga AGA (if available) | Verified supported mode | Document | Baseline | H1 | Compatibility by mode |
| RV-04 | Atari ST (if available) | Verified RGB cable | Document | Baseline | H1 | Low/medium resolution; do not assume mono high-res |
| RV-05 | Available console | Verified input | 50/60 Hz | Baseline | H1 | Signal changes, artifacts |
| RV-06 | Same stable source | Same | Same | Identical | H1/H2/H3 | Capture unit variation |
| RV-07 | Same stable source | Same | Same | Changed one setting | H1 | Deinterlace/scale/scanlines |

Skip unavailable sources and mark **NOT TESTED**, never **PASS**.

## 7. Measurements and evidence

For every run, record:

- Test ID, date, operator, source machine and video mode.
- Actual cable/pinout, GBSC firmware and all changed settings.
- HDMI output mode/refresh rate (as reported), capture device ID and negotiated V4L2 mode.
- OS/kernel, OBS/FFmpeg version, encoder, capture duration.
- Dropped frames, observed sync loss, color/geometry issues, audio drift.
- Original screenshots/stills and a short lossless or high-quality sample where feasible.
- Latency methodology: high-speed camera/LED timer or other documented method; **do not infer input lag from a single ordinary video clip**.

Use filenames like `RV-02_H1_amiga-pal_2026-10-18.mkv` (substitute actual test date).

## 8. Publication gates

1. Claims link to reproducible observations and configuration.
2. Listing claims vs verified capabilities clearly distinguished.
3. Compare direct display and capture paths when possible.
4. Explain PAL/NTSC and 50/60 Hz limitations.
5. English original reviewed, then Norwegian translation.
6. Affiliate disclosure prominent; links marked `rel="sponsored noopener noreferrer"`.
7. Avoid publishing serial numbers, personal desktop content or unrelated identifiers.

**Next execution step:** Inspect and photograph actual ports on the RetroScaler and one Hagibis card, then run read-only Linux discovery. No recording is scheduled.
