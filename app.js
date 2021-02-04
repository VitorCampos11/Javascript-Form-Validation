(function () {
  if (document.readyState === "complete") {
    validateEmail();
    validatePassword();
  }
})();

function validateEmail() {
  const form = document.querySelector("#form");
  const email = document.querySelector("#email");
  const pattern = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;

  if (email.value.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
  }
}

function validatePassword() {
}
