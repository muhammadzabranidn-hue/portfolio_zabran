/* ===============================================================
   Semua kode dibungkus DOMContentLoaded supaya elemen di HTML
   (logoTrack, heroImageWrap, dst) sudah pasti ada sebelum dipakai.
   Sebelumnya script ini dipanggil di <head> tanpa "defer", jadi
   getElementById() selalu mengembalikan null -> script berhenti
   dengan error -> track kedua kosong -> marquee terlihat
   terpotong-potong saat animasi mengulang. Sekarang aman.
=================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ===============================================================
     1) Duplikasi otomatis daftar logo supaya infinite scroll mulus.
        Kalau kamu menambah / mengurangi item di atas, cukup ubah di
        satu tempat (logoTrack / softTrack), duplikat ini akan
        menyesuaikan otomatis sehingga translateX(-50%) selalu pas
        separuh lebar.

        CATATAN PERBAIKAN: sebelumnya fungsi ini HANYA dijalankan
        untuk marquee pertama (logoTrack/logoTrackClone). Marquee
        kedua (softTrack/softTrackClone) tidak pernah digabung,
        sehingga track kloningnya kosong -> terlihat jeda/putus saat
        animasi mengulang. Sekarang dibuat jadi fungsi yang dipakai
        untuk KEDUA marquee.
  =================================================================== */
  function mergeMarqueeTrack(trackId, cloneId) {
    const track = document.getElementById(trackId);
    const clone = document.getElementById(cloneId);
    if (!track || !clone) return;

    clone.innerHTML = track.innerHTML;
    clone.setAttribute('aria-hidden', 'true');

    // Gabungkan kedua track jadi satu elemen flex agar animasi -50% translateX pas
    const marquee = track.parentElement;
    const merged = document.createElement('div');
    merged.className = track.className; // pertahankan class asal (mis. "track-reverse")
    merged.append(...track.children, ...clone.children);
    marquee.innerHTML = '';
    marquee.appendChild(merged);
  }

  mergeMarqueeTrack('logoTrack', 'logoTrackClone');
  mergeMarqueeTrack('softTrack', 'softTrackClone');

  /* ===============================================================
     2) Efek hover pada foto: zoom + mengikuti posisi kursor.
        Ini satu-satunya bagian yang perlu sedikit JavaScript, karena
        CSS murni tidak bisa membaca posisi kursor secara real-time.
  =================================================================== */
  const wrap = document.getElementById('heroImageWrap');
  const img  = document.getElementById('heroImage');
  const MAX_SHIFT = 22; // px, seberapa jauh foto bergeser mengikuti kursor

  if (wrap && img) {
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 .. 0.5
      const relY = (e.clientY - rect.top)  / rect.height - 0.5;

      img.style.transform =
        `scale(1.12) translate(${relX * -MAX_SHIFT}px, ${relY * -MAX_SHIFT}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) translate(0, 0)';
    });
  }

  /* ===============================================================
     3) Navbar fixed: kasih background gelap + blur (mengikuti
        referensi) begitu halaman discroll, supaya navbar tetap
        terlihat jelas di atas konten yang lewat di belakangnya.
        Hanya class "is-scrolled" yang ditoggle di sini — semua
        tampilan/desain diatur lewat CSS, isi navbar tidak disentuh.
  =================================================================== */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const SCROLL_THRESHOLD = 24; // px, jarak scroll sebelum background berubah
    const MIN_INSET = 14;        // px, jarak minimal pill ke tepi layar

    const setNavbarOffset = () => {
      // Body diberi padding-top otomatis sesuai tinggi navbar + jarak
      // melayang (14px) di state scrolled, supaya konten tidak pernah
      // ketutup navbar di kedua kondisi (normal maupun scrolled).
      const wasScrolled = navbar.classList.contains('is-scrolled');
      navbar.classList.remove('is-scrolled');
      const baseHeight = navbar.offsetHeight;
      if (wasScrolled) navbar.classList.add('is-scrolled');
      document.documentElement.style.setProperty('--navbar-offset', `${baseHeight + 14}px`);
    };

    /* ===============================================================
       Hitung lebar asli navbar di state "is-scrolled" (pas dengan
       isinya, tanpa keyword width:auto/max-content) lalu ubah jadi
       nilai left/right dalam px. Ini kunci supaya transisinya smooth:
       CSS cuma bisa menganimasikan angka, bukan keyword — makanya
       diukur dulu lewat kloningan navbar yang disembunyikan, baru
       hasilnya dipakai sebagai variabel --navbar-inset.
    =================================================================== */
    const updateScrolledInset = () => {
      const clone = navbar.cloneNode(true);
      clone.classList.add('is-scrolled');
      clone.style.position = 'fixed';
      clone.style.visibility = 'hidden';
      clone.style.pointerEvents = 'none';
      clone.style.top = '-9999px';
      clone.style.left = '0';
      clone.style.right = 'auto';
      clone.style.width = 'max-content';
      clone.style.transition = 'none';
      document.body.appendChild(clone);

      const naturalWidth = clone.offsetWidth;
      document.body.removeChild(clone);

      const viewportWidth = window.innerWidth;
      let inset = (viewportWidth - naturalWidth) / 2;
      if (!isFinite(inset) || inset < MIN_INSET) inset = MIN_INSET;

      document.documentElement.style.setProperty('--navbar-inset', `${inset}px`);
    };

    const handleScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    };

    setNavbarOffset();
    updateScrolledInset();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      setNavbarOffset();
      updateScrolledInset();
    });

    // Font custom (Google Fonts) bisa mengubah lebar teks setelah load,
    // jadi hitung ulang begitu semua font siap supaya pill tetap presisi.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateScrolledInset);
    }
  }

});