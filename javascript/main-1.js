
document.addEventListener('DOMContentLoaded', () => {

 
  function mergeMarqueeTrack(trackId, cloneId) {
    const track = document.getElementById(trackId);
    const clone = document.getElementById(cloneId);
    if (!track || !clone) return;

    clone.innerHTML = track.innerHTML;
    clone.setAttribute('aria-hidden', 'true');

    
    const marquee = track.parentElement;
    const merged = document.createElement('div');
    merged.className = track.className; 
    merged.append(...track.children, ...clone.children);
    marquee.innerHTML = '';
    marquee.appendChild(merged);
  }

  mergeMarqueeTrack('logoTrack', 'logoTrackClone');
  mergeMarqueeTrack('softTrack', 'softTrackClone');

 
  const wrap = document.getElementById('heroImageWrap');
  const img  = document.getElementById('heroImage');
  const MAX_SHIFT = 22; 
  if (wrap && img) {
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width  - 0.5; 
      const relY = (e.clientY - rect.top)  / rect.height - 0.5;

      img.style.transform =
        `scale(1.12) translate(${relX * -MAX_SHIFT}px, ${relY * -MAX_SHIFT}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) translate(0, 0)';
    });
  }

 
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const SCROLL_THRESHOLD = 24; 
    const MIN_INSET = 14;        

    const setNavbarOffset = () => {
      
      
      
      const wasScrolled = navbar.classList.contains('is-scrolled');
      navbar.classList.remove('is-scrolled');
      const baseHeight = navbar.offsetHeight;
      if (wasScrolled) navbar.classList.add('is-scrolled');
      document.documentElement.style.setProperty('--navbar-offset', `${baseHeight + 14}px`);
    };

   
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

    
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateScrolledInset);
    }
  }

});