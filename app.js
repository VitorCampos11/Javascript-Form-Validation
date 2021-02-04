/*
 * JAVASCRIPT PROCEDURAL - EXECUTA FUNÇOES DE ACORDO COM SUA DECLARÇÃO
 */

// (function () {
//   if (document.readyState === "complete") {
//     validateEmail();
//     validatePassword();
//   }
// })();

// function validateEmail() {
//   const form = document.querySelector("#form");
//   const email = document.querySelector("#email");
//   const pattern = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;

//   if (email.value.match(pattern)) {
//     form.classList.add("valid");
//     form.classList.remove("invalid");
//   } else {
//     form.classList.remove("valid");
//     form.classList.add("invalid");
//   }
// }

// function validatePassword() {
// }

/*
 * JAVASCRIPT ORIENTADO A OBJETO - EXECUTA MÉTODO, PODENDO SER DECLARADO EM QUALQUER LUGAR DO SCRIPT
 */
class App {
  constructor() {
    this.app = {};
    this.initialize();
    this.initializeEvents();

    // debug
    console.log(this.app);
  }

  // inicializar o app
  initialize() {
    // criar uma lista de id e coloca dentro da propriedade
    document.querySelectorAll("[id]").forEach((element) => {
      this.app[Format.formatToCamelCase(element.id)] = element;
    });
  }

  initializeEvents() {
    this.basicValidateToForm();
    this.app.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // criar o payload aqui
    });
  }
  basicValidateToForm() {
    // this.app.btnSubmitLogin.setAttribute("disabled", true);
    this.isValid = {
      validEmail: false,
      validLength: false,
      validLetter: false,
      validNumber: false,
      validSpecial: false,
    };

    // patterns
    const patternEmail = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;
    const patterNumber = /\d+/g;
    const patterSpecial = /[^A-Za-z0-9]+/g;
    const patterLetter = /[A-Za-z]+/g;

    // events password
    this.app.password.addEventListener("keyup", ({ target }) => {
      this.isValid.validNumber =
        target.value.match(patterNumber) != null ? true : false;
      this.isValid.validSpecial =
        target.value.match(patterSpecial) != null ? true : false;
      this.isValid.validLetter =
        target.value.match(patterLetter) != null ? true : false;
      this.isValid.validLength = target.value.length >= 8 ? true : false;

      if (
        this.isValid.validNumber &&
        this.isValid.validSpecial &&
        this.isValid.validLetter &&
        this.isValid.validLength
      ) {
        this.app.labelChecks.style.display = "none";
        this.app.containerPassword.classList.add("valid");
        this.app.containerPassword.classList.remove("invalid");
      } else {
        this.app.labelChecks.style.display = "block";
        this.app.containerPassword.classList.remove("valid");
        this.app.containerPassword.classList.add("invalid");
      }
      this.app.btnSubmitLogin.disabled = Object.values(this.isValid).includes(
        false
      );
    });

    // events email
    this.app.email.addEventListener("keyup", ({ target }) => {
      this.isValid.validEmail =
        target.value.match(patternEmail) != null ? true : false;
      if (this.isValid.validEmail) {
        this.app.containerEmail.classList.add("valid");
        this.app.containerEmail.classList.remove("invalid");
      } else {
        this.app.containerEmail.classList.remove("valid");
        this.app.containerEmail.classList.add("invalid");
      }
      this.app.btnSubmitLogin.disabled = Object.values(this.isValid).includes(
        false
      );
    });
  }
}

class Format {
  constructor() {}

  // responsável por retorna uma lista de id
  static formatToCamelCase(text) {
    let div = document.createElement("div");
    div.innerHTML = `<div data-${text}="id"></div>`;
    return Object.keys(div.firstChild.dataset)[0];
  }
}

window.app = new App();
