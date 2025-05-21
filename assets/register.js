const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const profession = document.getElementById('profession');
const genderRadios = document.getElementsByName('gender');

// Helper functions
function setError(id, message) {
  const el = document.getElementById(id);
  el.classList.add('error');
  document.getElementById(id + 'Error').textContent = message;
}
function clearError(id) {
  const el = document.getElementById(id);
  el.classList.remove('error');
  document.getElementById(id + 'Error').textContent = '';
}

function validateForm() {
  let valid = true;

  // First Name
  clearError('firstName');
  if (!firstName.value.trim()) {
    setError('firstName', 'First name is required.');
    valid = false;
  }

  // Last Name
  clearError('lastName');
  if (!lastName.value.trim()) {
    setError('lastName', 'Last name is required.');
    valid = false;
  }

  // Username
  clearError('username');
  if (username.value.trim().length < 8) {
    setError('username', 'Username must be at least 8 characters.');
    valid = false;
  }

  // Email
  clearError('email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    setError('email', 'Enter a valid email address.');
    valid = false;
  }

  // Phone
  clearError('phone');
  if (!/^\d{11}$/.test(phone.value.trim())) {
    setError('phone', 'Phone number must be 11 digits.');
    valid = false;
  }

  // Date of Birth
  clearError('dob');
  if (!dob.value) {
    setError('dob', 'Date of birth is required.');
    valid = false;
  } else {
    const dobDate = new Date(dob.value);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setError('dob', 'You must be at least 18 years old.');
      valid = false;
    }
  }

  // Password
  clearError('password');
  if (password.value.length < 8) {
    setError('password', 'Password must be at least 8 characters.');
    valid = false;
  }

  // Confirm Password
  clearError('confirmPassword');
  if (confirmPassword.value !== password.value) {
    setError('confirmPassword', 'Passwords do not match.');
    valid = false;
  }

  // Profession
  clearError('profession');
  if (!profession.value) {
    setError('profession', 'Please select your profession.');
    valid = false;
  }

  // Gender
  document.getElementById('genderError').textContent = '';
  let genderSelected = false;
  for (let radio of genderRadios) {
    if (radio.checked) {
      genderSelected = true;
      break;
    }
  }
  if (!genderSelected) {
    document.getElementById('genderError').textContent = 'Please select your gender.';
    valid = false;
  }

  return valid;
}

// Remove error on input
document.addEventListener('DOMContentLoaded', function() {
  const fields = [
    'firstName', 'lastName', 'username', 'email', 'phone', 'dob', 'password', 'confirmPassword', 'profession'
  ];
  fields.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        el.classList.remove('error');
        document.getElementById(id + 'Error').textContent = '';
      });
    }
  });
  // Gender radio
  for (let radio of genderRadios) {
    radio.addEventListener('change', function() {
      document.getElementById('genderError').textContent = '';
    });
  }
});