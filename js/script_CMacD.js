/* Ciaran -> JS/ J Query/ Boostrap parts for get involved page Nov/Dec 2025

=============== BASIC PAGE BEHAVIOUR ===============
This section runs once the DOCUMENT Object Model is loaded and adds in these made up stats (in production these could be queried from a database)
Also does form validation (uses browsers constraint api) and dynamic year update upon a page load.
https://www.w3schools.com/js/js_htmldom_elements.asp
https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
https://dev.to/itxshakil/the-definitive-guide-to-the-constraint-validation-api-3l80

*/
document.addEventListener('DOMContentLoaded', function () {

  // -------    1. Animated number counters from 0 → target value--------
  // fairly simple and incrments from current to target in fixed steps (looks pretty tidy on page load though)
  // Format numbers using toLocaleString() for readability.
  // used this predominantly: https://www.youtube.com/watch?v=a6XIMIKmj9k (JavaScript Animated Counter Tutorial)
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

  // ------------    2. Form validation (uses built-in boostrap browser validation) can't submit form unless all field correctly filled --------
  //https://getbootstrap.com/docs/5.3/forms/validation (code samples included here too)/
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

  // --------    3. Dynamic footer year.  (will update copyright year automatically) --------
  // https://stackoverflow.com/questions/43714006/how-can-one-create-a-dynamic-copyright-date-without-document-write-in-javascri
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

  // ----------    1. Smooth scroll for links that start with "#".  -------
/* https://dev.to/attacomsian/smooth-scroll-to-page-section-with-jquery-2jng
https://css-tricks.com/snippets/jquery/smooth-scrolling/
  */
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

  // --------   2. Change header style when we scroll down. -------
// https://stackoverflow.com/questions/12558311/add-remove-class-with-jquery-based-on-vertical-scroll
  $window.on('scroll', function () {
    if ($window.scrollTop() > 50) {
      $header.addClass('site-header-scrolled');
    } else {
      $header.removeClass('site-header-scrolled');
    }
  });

  // -----------  3. Back to top button (created with jQuery). --------
  /*
https://stackoverflow.com/questions/14249998/jquery-back-to-top
https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
https://codepen.io/jurbank/pen/PZpNjm

*/
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


  // === Newsletter form popup. ===
/* https://www.youtube.com/watch?v=tt5uUMQgzl0&pp=0gcJCf8Ao7VqN5tD ("Boostrap 5 CRASH COURSE Tutorial 16 - Modals")
https://medium.com/@AlexanderObregon/understanding-and-using-bootstrap-modals-effectively-14cf13cca2d9
https://www.w3schools.com/bootstrap/bootstrap_modal.asp

*/
$(document).ready(function () {
  
  const newsletterForm = document.querySelector('#newsletter form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault(); // stop page reload ( was happening everytime i submitted the form before - took a little bit to figure out)

      // Use Bootstrap’s validation
      if (!newsletterForm.checkValidity()) {
        newsletterForm.classList.add('was-validated');
        return;
      }

      // If valid → show modal -> This info is stored above the JS references in my HTML file at the bottom of the page
      const popup = new bootstrap.Modal(document.querySelector('#newsletterSuccessModal'));
      popup.show();

      // Reset form after 
      newsletterForm.reset();
      newsletterForm.classList.remove('was-validated');
    });
  }
  
});


// ==== DONATION POPUP  Opens a custom thank-you popup when "Donate Online" is clicked ====
// https://medium.com/@senky/pure-css-modal-with-animations-9491f4daa13a (this is more the css part but they intterlink)
const $donateBtn   = $('#donateOnlineButton');      // the Donate online button
const $donatePopup = $('#donationSuccessPopup');
const $donateInner = $donatePopup.find('.signup-popup-inner');

// trigger popup opening when button on click event
if ($donateBtn.length && $donatePopup.length) {
  $donateBtn.on('click', function (e) {
    e.preventDefault(); // don't follow link (there is no link in production this would open a visa/stripe window etc)

    $donatePopup.attr('aria-hidden', 'false').fadeIn(200, function () {
      $donateInner.addClass('show');
    });
  });

  // close popup on X or "You're amazing!"
  $donatePopup.on('click', '.signup-popup-close, .donation-popup-ok', function () {
    hideDonatePopup();
  });

  // close when clicking background overlay
  $donatePopup.on('click', function (e) {
    if ($(e.target).is('#donationSuccessPopup')) {
      hideDonatePopup();
    }
  });
}

//https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
function hideDonatePopup() {
  $donateInner.removeClass('show');
  $donatePopup.fadeOut(180, function () {
    $donatePopup.attr('aria-hidden', 'true');
  });
}


