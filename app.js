const ReaderDom = (component) =>
  new DOMParser().parseFromString(component, "text/html").querySelector("body")
    .firstChild;

/*
 * JAVASCRIPT ORIENTADO A OBJETO - EXECUTA MÉTODO, PODENDO SER DECLARADO EM QUALQUER LUGAR DO SCRIPT
 */

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.appendChild(ReaderDom(`<app-login></app-login>`));
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

class Template {
  constructor() {}

  static loginTemplateComponent() {
    return `
      <div class="container">
      <h3>Email Validation Check</h3>
      <form id="form">
        <div class="form-group" id="container-email">
          <input type="text" id="email" placeholder="E-mail" required name="email">
          <span class="indicator"></span>
        </div>
        <div class="form-group" id="container-password">
          <input type="password" id="password" placeholder="Senha" required name="password">
          <span class="indicator"></span>
          <div id="label-checks" class="checks">
            <span>Números</span>&nbsp;,&nbsp;
            <span>Letras</span>&nbsp;,
            <span>Caractere especiais</span>&nbsp;,
            <span>Acima 8 caracteres</span>
          </div>
        </div>
        <div class="button-container">
          <button disabled="true" id="btn-submit-login" class="btn-submit" type="submit">ENTRAR</button>
        </div>
      </form>
    </div>
    `;
  }
}

class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this.appendChild(ReaderDom(Template.loginTemplateComponent()));
    this.login = {};

    this.querySelectorAll("[id]").forEach(
      (element) => (this.login[Format.formatToCamelCase(element.id)] = element)
    );

    this.initializeEvents();

    // debug
    console.log(this.login);
  }

  initializeEvents() {
    this.basicValidateToForm();
  }

  basicValidateToForm() {
    this.isValid = {
      validEmail: false,
      validLength: false,
      validLetter: false,
      validNumber: false,
      validSpecial: false,
    };

    // patterns
    const patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patterNumber = /\d+/g;
    const patterSpecial = /[^A-Za-z0-9]+/g;
    const patterLetter = /[A-Za-z]+/g;

    // events password
    this.login.password.addEventListener("keyup", ({ target }) => {
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
        this.login.labelChecks.style.display = "none";
        this.login.containerPassword.classList.add("valid");
        this.login.containerPassword.classList.remove("invalid");
      } else {
        this.login.labelChecks.style.display = "block";
        this.login.containerPassword.classList.remove("valid");
        this.login.containerPassword.classList.add("invalid");
      }
      this.login.btnSubmitLogin.disabled = Object.values(this.isValid).includes(
        false
      );
    });

    // events email
    this.login.email.addEventListener("keyup", ({ target }) => {
      this.isValid.validEmail =
        target.value.match(patternEmail) != null ? true : false;

      if (this.isValid.validEmail) {
        this.login.containerEmail.classList.add("valid");
        this.login.containerEmail.classList.remove("invalid");
      } else {
        this.login.containerEmail.classList.remove("valid");
        this.login.containerEmail.classList.add("invalid");
      }
      this.login.btnSubmitLogin.disabled = Object.values(this.isValid).includes(
        false
      );
    });
  }
}

window.customElements.define("app-root", AppRoot);
window.customElements.define("app-login", LoginComponent);
