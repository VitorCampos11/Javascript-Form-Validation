(function () {
  if (document.readyState === "complete") {
    validate();
  }
})();

function validate() {
  const form = document.getElementById("form");
  const email = document.getElementById("email").value;
  const pattern = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;

  if (email.match(pattern)) {
    form.classList.add("valid");
    form.classList.remove("invalid");
  } else {
    form.classList.remove("valid");
    form.classList.add("invalid");
  }
}
