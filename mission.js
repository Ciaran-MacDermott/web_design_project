// script.js

// Toggle text visibility for mission images (if used elsewhere)
function toggleText(id) {
  const element = document.getElementById(id);
  if (element) {
    element.hidden = !element.hidden;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const showFormBtn = document.getElementById("show-form-btn");
  const userForm = document.getElementById("user-form");
  const form = document.getElementById("erasmus-form");

  // Show/Hide Erasmus form
  if (showFormBtn && userForm) {
    showFormBtn.addEventListener("click", () => {
      if (userForm.style.display === "none" || userForm.style.display === "") {
        userForm.style.display = "block";
        showFormBtn.textContent = "Hide Form";
      } else {
        userForm.style.display = "none";
        showFormBtn.textContent = "Join our Erasmus Project";
      }
    });
  }

  // Form validation
  if (form) {
    form.addEventListener("submit", (event) => {
      let valid = true;

      // Clear old errors and success
      document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
      const successMsg = document.getElementById("success-message");
      if (successMsg) successMsg.textContent = "";

      // Name validation
      const name = document.getElementById("name").value.trim();
      if (!name) {
        document.getElementById("name-error").textContent = "Full name is required.";
        valid = false;
      }

      // Email validation
      const email = document.getElementById("email").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        document.getElementById("email-error").textContent = "Email is required.";
        valid = false;
      } else if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        valid = false;
      }

      // Phone validation (optional)
      const phone = document.getElementById("phone").value.trim();
      const phonePattern = /^[0-9\s\-\+]{7,15}$/;
      if (phone && !phonePattern.test(phone)) {
        document.getElementById("phone-error").textContent = "Please enter a valid phone number.";
        valid = false;
      }

      // Stop form submission if invalid
      if (!valid) {
        event.preventDefault();
      } else {
        event.preventDefault(); // prevent actual submission for demo
        if (successMsg) {
          successMsg.textContent = "Form submitted successfully!";
          // Optional: fade out success message
          setTimeout(() => {
            successMsg.textContent = "";
          }, 4000);
        }
      }
    });
  }
});


