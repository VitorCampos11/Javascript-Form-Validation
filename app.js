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
    // patterns
    const patternEmail = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;
    const patterNumber = /\d+/g;
    const patterSpecial = /[^A-Za-z0-9]+/g;
    const patterLetter = /[A-Za-z]+/g;

    // events password
    this.app.password.addEventListener("keyup", ({ target }) => {
      const validNumber = patterNumber.test(target.value);
      const validSpecial = patterSpecial.test(target.value);
      const validLetter = patterLetter.test(target.value);
      const validLength = target.value.length >= 8 ? true : false;
    });

    // events email
    this.app.email.addEventListener("keyup", ({ target }) => {
      const valid = patternEmail.test(target.value);
      if (valid) {
        this.app.form.classList.add("valid");
        this.app.form.classList.remove("invalid");
      } else {
        this.app.form.classList.remove("valid");
        this.app.form.classList.add("invalid");
      }
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
