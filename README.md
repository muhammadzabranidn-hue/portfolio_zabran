# 🚀 Personal Portfolio Website — Zabran Assyafiq

Portofolio web pribadi untuk menampilkan proyek digital, keahlian (*skills*), perjalanan belajar, dan latar belakang saya sebagai Junior Web Developer & UI/UX Designer.

---

## 🔗 Live Demo
- **URL Website:** [https://zabran.netlify.app](https://zabran.netlify.app)

---

## 🛠️ Tech Stack & Tools
- **Frontend:** HTML5, CSS3 (Grid, Flexbox, CSS Variables), JavaScript (ES6+)
- **Animasi & Interaksi:**
  - [GSAP](https://gsap.com/) + ScrollTrigger: animasi scroll (pin, horizontal scroll, scrub)
  - [Lenis](https://lenis.darkroom.engineering/): smooth scrolling
  - [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/): animasi fade-up pada Hero, About, dan Skills
- **Font:** Google Fonts (Inter, Fraunces)
- **Design Tools:** Figma
- **Deployment:** Netlify

> GSAP, ScrollTrigger, dan Lenis disimpan lokal di `js/vendor/`, jadi tidak membutuhkan CDN.

---

## ✨ Features

### Halaman Utama (`index.html`)
| No | Section | Deskripsi |
|----|---------|-----------|
| – | **Hero** | Perkenalan, status *Available for Works*, statistik, dan foto profil yang mengikuti kursor |
| – | **Marquee** | Hard skills dan soft skills yang bergerak otomatis (kiri dan kanan) |
| 02 | **Hard & Soft Skills** | Developer stack dan kompetensi utama |
| 03 | **Skills Stack** | Kemampuan di frontend, UI/UX, framework, dan design system |
| 04 | **Philosophy** | Kalimat yang menyala kata demi kata mengikuti scroll |
| 05 | **My Journey** | Perjalanan dari baris kode pertama sampai membangun website: 7 bab dengan jendela kode, di-*pin* dan bergeser horizontal saat di-scroll |
| 06 | **Featured Projects** | 3 proyek pilihan dari GitHub dalam kartu bertumpuk (*stacked cards*) |
| 07 | **Contact** | Ajakan berkolaborasi, link LinkedIn dan GitHub |

### Halaman Detail Proyek (`pages/`)
Setiap proyek punya halaman sendiri berisi ringkasan, fitur utama, tech stack, struktur proyek, dan link GitHub atau Live Demo.

| Proyek | Halaman | Teknologi |
|--------|---------|-----------|
| Bitaqwa App | `pages/project-bitaqwa.html` | Flutter, Dart |
| Personal Portfolio | `pages/project-portfolio.html` | HTML, CSS, JavaScript |
| Weather Dashboard | `pages/project-weather.html` | JavaScript, OpenWeatherMap API |

### Fitur Umum
- **Responsive Layout:** Optimal di mobile, tablet, dan desktop (navbar hamburger di layar kecil).
- **Navbar Fixed:** Transparan di atas, berubah saat halaman di-scroll.
- **Smooth Scrolling & Scroll Animation:** Pin section, scroll horizontal, kartu bertumpuk, dan efek parallax.
- **Bento Grid Layout:** Tampilan *About* yang rapi dan modern.
- **Accessibility:** Animasi scroll dinonaktifkan otomatis jika pengguna mengaktifkan *reduced motion*.
- **Lightweight & Fast:** Tanpa framework berat.

---

## 🚀 Proyek yang Ditampilkan

| Proyek | Deskripsi | Link |
|--------|-----------|------|
| **Bitaqwa App** | Aplikasi pertama saya dengan Flutter dan Dart: panduan doa, bacaan sholat, arah kiblat, waktu sholat, ayat Al-Qur'an, dan video kajian | [GitHub](https://github.com/muhammadzabranidn-hue/bitaqwa_app) |
| **Portfolio Zabran** | Website ini, dibangun dari nol dengan HTML, CSS, dan JavaScript | [Live](https://zabran.netlify.app) · [GitHub](https://github.com/muhammadzabranidn-hue/portfolio_zabran) |
| **Weather Dashboard** | Dashboard cuaca dengan tema langit dinamis, prakiraan per jam, AQI, dan kota favorit | [Live](https://weatherapp-iota-dun.vercel.app) · [GitHub](https://github.com/muhammadzabranidn-hue/weather_app) |

---

## 💻 Langkah-Langkah Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/muhammadzabranidn-hue/portfolio_zabran.git
   cd portfolio_zabran
   ```

2. **Jalankan website**

   Buka `index.html` langsung di browser, atau gunakan *local server* (disarankan, misalnya ekstensi **Live Server** di VS Code).

   ```bash
   # alternatif dengan Python
   python3 -m http.server 8000
   # lalu buka http://localhost:8000
   ```

Tidak ada proses *build* atau dependensi yang perlu diinstal.

---

## 📂 Project Structure

```text
portfolio_zabran/
├── assets/
│   └── images/            # Foto profil, ikon, dan gambar
├── css/
│   ├── style.css          # Style utama: navbar, hero, marquee, skills
│   ├── about.css          # Style halaman About / coming soon
│   └── extra.css          # Philosophy, Journey, Projects, Contact, halaman detail
├── js/
│   ├── main-1.js          # Marquee, efek foto hero, navbar, hamburger
│   ├── main-2.js          # Navbar dan countdown halaman coming soon
│   ├── main-3.js          # Smooth scroll dan animasi scroll (GSAP + Lenis)
│   └── vendor/            # gsap.min.js, ScrollTrigger.min.js, lenis.min.js
├── pages/
│   ├── staytoon.html      # Halaman coming soon
│   ├── project-bitaqwa.html
│   ├── project-portfolio.html
│   └── project-weather.html
├── index.html             # Halaman utama
└── README.md
```

---

## 🎨 Design System

| Token | Nilai |
|-------|-------|
| Warna aksen | `#0066ff` (biru) |
| Background | `#f8fafc` · Container `#ffffff` |
| Teks | `#0f172a` (utama) · `#64748b` (muted) |
| Font | Inter |
| Radius | 16px (card) · 28px (container) · pill (tombol) |

Semua token diatur lewat CSS variables di `:root` pada `css/style.css`.

---

## 📬 Kontak
- **LinkedIn:** [Muhammad Zabran Assyafiq](https://www.linkedin.com/in/muhammad-zabran-assyafiq-2292ab308/)
- **GitHub:** [@muhammadzabranidn-hue](https://github.com/muhammadzabranidn-hue)

---

*"Design and code aren't just about how things look, but how they feel and work."*
