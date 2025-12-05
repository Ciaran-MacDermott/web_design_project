document.addEventListener('DOMContentLoaded', function () {
  // Scroll reveal on sections
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );








    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.classList.add('reveal-visible'));
  }








  // Animated stats counters
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    let startTime = null;








    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }








    window.requestAnimationFrame(step);
  }








  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateCounter(entry.target);
            entry.target.dataset.animated = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );








    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
  }








  // Bootstrap-style form validation for newsletter
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });








  // Dynamic footer year
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});








// jQuery enhancements: smooth scroll, header shrink, back-to-top button
$(function () {
  const $window = $(window);
  const $header = $('.site-header');
  const $root = $('html, body');








  // Smooth scroll for in-page anchors
  $('a[href^="#"]').on('click', function (e) {
    const targetId = $(this).attr('href');
    if (targetId && targetId.length > 1 && $(targetId).length) {
      e.preventDefault();
      const offset = $(targetId).offset().top - 80;








      $root.stop().animate(
        {
          scrollTop: offset
        },
        600,
        'swing'
      );
    }
  });








  // Header shrink & shadow on scroll
  $window.on('scroll', function () {
    if ($window.scrollTop() > 50) {
      $header.addClass('site-header-scrolled');
    } else {
      $header.removeClass('site-header-scrolled');
    }
  });








  // Back to top button
  const $btn = $(`
    <button id="backToTop" aria-label="Back to top">
      <i class="bi bi-arrow-up"></i>
    </button>
  `).appendTo('body');








  $window.on('scroll', function () {
    if ($window.scrollTop() > 300) {
      $btn.fadeIn(200);
    } else {
      $btn.fadeOut(200);
    }
  });








  $btn.on('click', function () {
    $root.animate({ scrollTop: 0 }, 600);
  });
});




/* ============================================================
   TOKENS & GLOBAL VARIABLES
=============================================================== */
:root{
  --bg-page: #78866B;              /* overall page background (muted green) */
  --text: #333;
  --border-hard: rgba(0,0,0,.2);
  --shadow: 0 3px 12px rgba(0,0,0,.08);
  --radius-m: 16px;
  --radius-card: 0;                /* straight corners */
  --radius-soft: 0;
  --radius-pill: 999px;




  --hero-measure: 80ch;
  --section-y: clamp(2rem, 4vw, 4rem);




  --wave-fill: #ffffff;            /* color for divider waves (card color) */
  --emerald: #276749;              /* primary green */
  --emerald-deep: #1f4f38;         /* darker green for navbar */
}




/* ============================================================
   GLOBAL LAYOUT
=============================================================== */
body.bg-body{
  background: var(--bg-page);
  color: var(--text);
  padding-block: 1.5rem;
  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}




/* ============================================================
   UTILITIES
=============================================================== */
.border-all{
  border: none !important;         /* remove visible borders */
  border-radius: var(--radius-card);
}
.soft-shadow{ box-shadow: var(--shadow); }
.object-cover{ object-fit: cover; }




.text-emerald{
  color: var(--emerald);
}
.tracking-wide{
  letter-spacing: .18em;
}




/* Straight corners for main blocks */
#hero,
#main-content,
#social-links,
#contact-row,
#newsletter,
.content-box,
.contact-card,
.hero-figure,
#page-wrapper {
  border-radius: 0 !important;
  overflow: visible;
}




/* ============================================================
   HEADER & NAVBAR
=============================================================== */
.site-header{
  background: var(--emerald-deep);
  transition: background .25s ease, box-shadow .25s ease, padding .25s ease;
  padding-block: .5rem;
}




/* On scroll (jQuery adds this) */
.site-header-scrolled{
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
  padding-block: .25rem;
}




/* Logo wrapper box */
.logo-box {
  width: 55px;
  height: 55px;
  overflow: hidden;
  background: #f9f9f9;
  border-radius: 50%;
  transition: transform .25s ease;
}




/* Shrink logo slightly when header is scrolled */
.site-header-scrolled .logo-box{
  transform: scale(0.9);
}




/* Actual logo image inside */
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}




/* Smaller logo on mobile */
@media (max-width: 768px) {
  .logo-box { width: 45px; height: 45px; }
}




/* Small inline logo in hero line */
.hero-logo-inline{
  width: 30px;
  height: auto;
  margin-left: .5rem;
  vertical-align: middle;
}
@media (min-width: 768px){
  .hero-logo-inline{
    width: 40px;
  }
}




/* Nav link buttons */
.nav-pill{
  border-radius: var(--radius-pill);
  padding: .45rem 1rem;
  font-size: .95rem;
  color: #f5f5f5;
  transition: background .15s ease, color .15s ease;
}
.nav-pill:hover,
.nav-pill.active{
  background: #ffffff;
  color: #111 !important;
}




/* ============================================================
   PAGE WRAPPER
=============================================================== */
#page-wrapper {
  max-width: 1500px;
  margin: 0 auto;
  padding-inline: 1.25rem;
  border-radius: 0;
  background: var(--bg-page);
  box-shadow: 0 3px 15px rgba(0,0,0,0.05);
}




/* Slightly adjust padding on mobile */
@media (max-width: 768px) {
  #page-wrapper {
    padding-inline: 1rem;
  }
}




/* Adds space between sections inside wrapper */
#page-wrapper section {
  margin-bottom: 2rem;
}




/* ============================================================
   HERO SECTION
=============================================================== */
#hero{
  text-align: center;
  padding-block: var(--section-y);
  background: #fff;
}




/* Title text */
.hero-title{
  line-height: 1.2;
  text-align: center;
}




/* Main site name */
.hero-title-main{
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.1rem, 3vw + 1rem, 3rem);
  color: var(--bg-page);        /* same green as page background */
}




/* Script subtitle */
.hero-title-sub{
  font-family: 'Pacifico', cursive;
  font-size: clamp(1.4rem, 2.2vw + 0.8rem, 2.2rem);
  color: #222;
}




/* Paragraph width */
.hero-lead{
  max-width: var(--hero-measure);
  margin: 0 auto;
}




/* Hero image area */
.hero-figure{
  width: min(1100px, 96vw);
  height: clamp(180px, 28vw, 420px);
  margin-inline: auto;
}




/* ============================================================
   WAVY DIVIDERS
=============================================================== */
.section-wave{
  width: 100%;
  line-height: 0;
}
.section-wave svg{
  display: block;
  width: 100%;
  height: 50px;
}
.section-wave path{
  fill: var(--wave-fill);
  opacity: 0.9;
}
.wave-down{ margin-top: -2px; }
.wave-up{
  margin-bottom: -4px;
  transform: rotate(180deg);
}




/* ============================================================
   MAIN CONTENT AREA
=============================================================== */
#main-content{
  padding-block: var(--section-y);
  background: #fff;
}
.content-box{
  max-width: min(1100px, 96vw);
  margin-inline: auto;
}
#main-content p{
  text-align: center;
  line-height: 1.65;
}




/* Stats */
.stat-card{
  background: #fff;
}
.stats-row .stat-value{
  font-weight: 700;
}




/* ============================================================
   SOCIAL LINKS SECTION
=============================================================== */
#social-links{
  text-align: center;
  background: #fff;
}




/* Each social button */
.social-link{
  font-size: .9rem;
  text-decoration: none;
  background: #fff;
  padding: .4rem 1rem;
  border-radius: var(--radius-soft);
  color: #000;
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  transition: background .15s ease, transform .15s ease;
}
.social-link:hover{
  background: #f4f4f4;
  transform: translateY(-1px);
}




/* ============================================================
   CONTACT SECTION
=============================================================== */
#contact-row{ background: #fff; }
.contact-card{
  background: #fff;
}




/* ============================================================
   FOOTER
=============================================================== */
.site-footer{
  background: var(--bg-page);
}




/* ============================================================
   CONTAINER GUTTERS
=============================================================== */
.container,
.container-sm,
.container-md,
.container-lg,
.container-xl,
.container-xxl {
  padding-left: 0.85rem !important;
  padding-right: 0.85rem !important;
}




/* ============================================================
   BUTTONS
=============================================================== */
.btn-outline-emerald{
  border: 1px solid var(--emerald);
  color: var(--emerald);
  background-color: transparent;
}
.btn-outline-emerald:hover{
  background-color: var(--emerald);
  color: #fff;
}




/* ============================================================
   BACK TO TOP BUTTON
=============================================================== */
#backToTop {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border: none;
  border-radius: 999px;
  padding: .6rem .9rem;
  background: var(--emerald);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,.25);
  display: none;
  z-index: 999;
}
#backToTop i {
  font-size: 1.1rem;
}




/* ============================================================
   ACCESSIBILITY: Reduced Motion
=============================================================== */
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important; }
}




// =============== BASIC PAGE BEHAVIOUR (VANILLA JS) ===============
document.addEventListener('DOMContentLoaded', function () {
  // 1. Animated number counters
  //    This slowly counts from 0 up to the number in data-count
  const counters = document.querySelectorAll('[data-count]');




  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    let current = 0;
    const steps = 60;           // how many "jumps" we do
    const stepTime = 30;        // time between each jump (ms)
    const increment = Math.ceil(target / steps);




    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, stepTime);
  });




  // 2. Simple form validation (uses built-in browser validation)
  const forms = document.querySelectorAll('.needs-validation');




  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });




  // 3. Dynamic footer year
  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});




// =============== jQUERY ENHANCEMENTS (SMOOTH SCROLL, HEADER, BACK-TO-TOP) ===============
$(function () {
  const $window = $(window);
  const $header = $('.site-header');
  const $root = $('html, body');




  // 1. Smooth scroll for links that start with "#"
  $('a[href^="#"]').on('click', function (e) {
    const targetId = $(this).attr('href');




    // Only handle it if it points to an element on the page
    if (targetId && targetId.length > 1 && $(targetId).length) {
      e.preventDefault();




      // Position we want to scroll to (80px above so it's not hidden by header)
      const offsetTop = $(targetId).offset().top - 80;




      $root.animate(
        { scrollTop: offsetTop },
        600    // duration in ms
      );
    }
  });




  // 2. Change header style when we scroll down
  $window.on('scroll', function () {
    if ($window.scrollTop() > 50) {
      $header.addClass('site-header-scrolled');
    } else {
      $header.removeClass('site-header-scrolled');
    }
  });




  // 3. Back to top button (created with jQuery)
  const $btn = $(`
    <button id="backToTop" aria-label="Back to top">
      <i class="bi bi-arrow-up"></i>
    </button>
  `).appendTo('body');




  // Show / hide button based on scroll position
  $window.on('scroll', function () {
    if ($window.scrollTop() > 300) {
      $btn.fadeIn(200);
    } else {
      $btn.fadeOut(200);
    }
  });




  // Scroll smoothly back to the top when button is clicked
  $btn.on('click', function () {
    $root.animate({ scrollTop: 0 }, 600);
  });
});






