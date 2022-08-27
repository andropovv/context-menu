import { Module } from "../core/module";

export class ClicksModule extends Module {
  #clickCounter;
  #clickHTML;

  #dblClickCounter;
  #dblClickHTML;
  constructor(type, text) {
    super(type, text);
    this.#clickCounter = 0;
    this.#clickHTML = document.createElement("p");

    this.#dblClickCounter = 0;
    this.#dblClickHTML = document.createElement("p");
  }

  trigger() {
    this.#renderHTML(this.#clickHTML);
    this.#renderHTML(this.#dblClickHTML);

    this.#clickEvent();
    this.#dblClickEvent();

    setTimeout(this.#removeSession.bind(this), 5000);
    setTimeout(this.#showStatistics.bind(this), 6000);
  }

  #clickEvent() {
    this.clickHandler = this.#clickHandler.bind(this);
    document.body.addEventListener("click", this.clickHandler);
  }

  #dblClickEvent() {
    this.dblClickHandler = this.#dblClickHandler.bind(this);
    document.body.addEventListener("dblclick", this.dblClickHandler);
  }

  #clickHandler() {
    this.#clickCounter++;
    this.#clickHTML.innerText = this.#clickCounter;
  }

  #dblClickHandler() {
    this.#dblClickCounter++;
    this.#dblClickHTML.innerText = this.#dblClickCounter;
  }

  #renderHTML(element) {
    this.element = element;
    document.body.append(this.element);
  }

  #showStatistics() {}

  #removeSession() {
    document.body.removeEventListener("click", this.clickHandler);
    document.body.removeEventListener("dblclick", this.dblClickHandler);

    this.#clickCounter = 0;
    this.#dblClickCounter = 0;
    document.body.remove(this.#clickHTML);

    // document.body.remove(this.#dblClickHTML);
  }
}
