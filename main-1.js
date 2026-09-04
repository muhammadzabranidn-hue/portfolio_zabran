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
  
  });