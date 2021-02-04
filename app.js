(function () {
  if (document.readyState === "complete") {
    validate();
  }
})();

function validate() {
  const form = document.getElementById("form");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const pattern = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;
  const patternPassword = /^(?=(?:.*?[A-Z]){3})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

  if (email.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
  }

}
function validatePassword() {
  if (password.match(patternPassword)){
    form.classList.add("validPassword");
    form.classList.remove("invalidPassword");
  }else {
    form.classList.remove("validPassword");
    form.classList.add("invalidPassword");
  }
}
