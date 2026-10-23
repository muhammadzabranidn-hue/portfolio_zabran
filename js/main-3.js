/* Smooth scroll + animasi section Philosophy → Contact */
document.addEventListener('DOMContentLoaded',()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!window.gsap)return;
  gsap.registerPlugin(ScrollTrigger);
  const lenis=new Lenis({lerp:.085});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');if(id==='#')return;e.preventDefault();
    id==='#home'?lenis.scrollTo(0):lenis.scrollTo(id,{offset:-90,duration:1.4});}));
  if(location.hash&&document.querySelector(location.hash))setTimeout(()=>lenis.scrollTo(location.hash,{offset:-90,immediate:true}),150);
  // Philosophy: kata menyala mengikuti scroll
  const mp=document.querySelector('.manifesto p');
  mp.innerHTML=mp.textContent.trim().split(' ').map(x=>`<span class="mw">${x}</span>`).join(' ');
  gsap.to('.mw',{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top 70%',end:'bottom 60%',scrub:true}});
  // Journey: pin + scroll horizontal (desktop), vertikal di mobile
  const mm=gsap.matchMedia(),jr=document.querySelector('.journey'),jt=document.querySelector('.j-track');
  mm.add('(min-width:901px)',()=>{
    jr.classList.add('h');const d=()=>jt.scrollWidth-innerWidth;
    const tw=gsap.to(jt,{x:()=>-d(),ease:'none',scrollTrigger:{trigger:'.j-wrap',pin:true,scrub:1,end:()=>'+='+d(),
      invalidateOnRefresh:true,onUpdate:s=>document.querySelector('.j-bar i').style.transform=`scaleX(${s.progress})`}});
    gsap.utils.toArray('.chap').forEach(c=>gsap.from(c.querySelectorAll('.chap-no,h3,p,.chip-row,.code'),
      {y:50,opacity:0,stagger:.08,duration:.8,scrollTrigger:{trigger:c,containerAnimation:tw,start:'left 80%',toggleActions:'play none none reverse'}}));
    return()=>jr.classList.remove('h');});
  mm.add('(max-width:900px)',()=>{gsap.utils.toArray('.chap').forEach(c=>
    gsap.from(c.children,{y:40,opacity:0,stagger:.1,scrollTrigger:{trigger:c,start:'top 85%'}}));});
  // Proyek: kartu bertumpuk
  mm.add('(min-width:901px)',()=>{const cs=gsap.utils.toArray('.pcard');
    cs.forEach((c,i)=>{const n=cs[i+1];
      gsap.from(c.querySelector('.mock'),{yPercent:14,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'top 20%',scrub:true}});
      if(n)gsap.to(c,{scale:.93,opacity:.55,ease:'none',scrollTrigger:{trigger:n,start:'top 90%',end:'top 20%',scrub:true}});});});
  gsap.from('.contact h2,.contact .hero-actions',{y:60,opacity:0,stagger:.15,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.contact',start:'top 75%'}});
});
