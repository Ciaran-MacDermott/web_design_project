// =============== BASIC PAGE BEHAVIOUR ===============
document.addEventListener('DOMContentLoaded', function () {
  // 1. Animated number counters
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



$(document).ready(function () {
  
  // Newsletter form popup
  const newsletterForm = document.querySelector('#newsletter form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault(); // stop page reload

      // Use Bootstrap’s validation
      if (!newsletterForm.checkValidity()) {
        newsletterForm.classList.add('was-validated');
        return;
      }

      // If valid → show modal
      const popup = new bootstrap.Modal(document.querySelector('#newsletterSuccessModal'));
      popup.show();

      // Reset form after success
      newsletterForm.reset();
      newsletterForm.classList.remove('was-validated');
    });
  }
  
});


// ==== DONATION POPUP ====

const $donateBtn   = $('#donateOnlineButton');
const $donatePopup = $('#donationSuccessPopup');
const $donateInner = $donatePopup.find('.signup-popup-inner');

if ($donateBtn.length) {
  $donateBtn.on('click', function (e) {
    e.preventDefault(); // prevent navigation

    // Show popup
    $donatePopup.attr('aria-hidden', 'false').fadeIn(200, function () {
      $donateInner.addClass('show');
    });
  });
}

// Close when clicking X, OK button, or outside
$donatePopup.on('click', '.signup-popup-close, .donation-popup-ok', function () {
  hideDonatePopup();
});

$donatePopup.on('click', function (e) {
  if ($(e.target).is('#donationSuccessPopup')) {
    hideDonatePopup();
  }
});

function hideDonatePopup() {
  $donateInner.removeClass('show');

  $donatePopup.fadeOut(180, function () {
    $donatePopup.attr('aria-hidden', 'true');
  });
}


