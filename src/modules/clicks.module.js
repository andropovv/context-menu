import { Module } from "../core/module";
import "./clickModule.css";
import { createHTMLTag } from "../utils";

export class ClicksModule extends Module {
  #clickCounter;
  #clickHTML;
  #startAnalysHTML;

  #timeOut;
  #clickContainer;
  #sumOfClicks;

  #dblClickCounter;
  #dblClickHTML;
  constructor(type, text) {
    super(type, text);

    this.#clickCounter = 0;
    this.#clickHTML = createHTMLTag("p");
    this.#clickHTML.className = "clicks";

    this.#timeOut;

    this.#clickContainer = createHTMLTag("div");
    this.#clickContainer.className = "clicks-wrapper";

    this.#dblClickCounter = 0;
    this.#dblClickHTML = createHTMLTag("p");
    this.#dblClickHTML.className = "clicks";

    this.#sumOfClicks = createHTMLTag("p");
    this.#sumOfClicks.className = "clicks";

    this.#startAnalysHTML = createHTMLTag("h2");
    this.#startAnalysHTML.className = "head";
    this.#startAnalysHTML.innerText = "Анализ кликов активирован";
  }

  trigger() {
    if (this.#isAnalysActive()) {
      this.#clickHTML.innerText = `Одиночных кликов: ${this.#clickCounter}`;
      this.#dblClickHTML.innerText = `Двойных кликов: ${this.#dblClickCounter}`;
      this.#sumOfClicks.innerText = `Всего кликов: ${0}`;

      this.#showStatistics();

      this.#clickEvent();
      this.#dblClickEvent();

      setTimeout(this.#removeEvents.bind(this), 5000);
      setTimeout(() => {
        this.#removeElementFromDOM(this.#clickContainer);
        this.#removeElementFromDOM(this.#clickHTML);
        this.#removeElementFromDOM(this.#dblClickHTML);
        this.#removeElementFromDOM(this.#sumOfClicks);
        this.#resetCounters();
      }, 8000);
    } else alert("Анализ кликов уже запущен");
  }
  // Функциця добавления элементов в DOM
  #renderHTML(target, element) {
    this.element = element;
    target.append(this.element);
  }
  // Проверяем активен ли анализ кликов
  #isAnalysActive() {
    const divExist = document.querySelector(".clicks-wrapper");
    if (divExist) {
      return false;
    } else return true;
  }
  // Добавляем обработчик событий клика на body
  #clickEvent() {
    this.clickHandler = this.#clickHandler.bind(this);
    document.body.addEventListener("click", this.clickHandler);
  }
  // Добавляем обработчик событий двойнога клику на body
  #dblClickEvent() {
    this.dblClickHandler = this.#dblClickHandler.bind(this);
    document.body.addEventListener("dblclick", this.dblClickHandler);
  }
  // Что нужно делать при одинарном клике
  #clickHandler() {
    if (event.target === document.body || event.target === this.#clickContainer) {
      this.#timeOut = setTimeout(() => {
        this.#clickCounter++;
        this.#clickHTML.innerText = `Одиночных кликов: ${this.#clickCounter}`;
        this.#sumOfClicks.innerText = `Всего кликов ${
          this.#clickCounter + 2 * this.#dblClickCounter
        }`;
      }, 200);
    }
    
  }
  // Что нужно делать при двойном клике
  #dblClickHandler() {
    this.#sumOfClicks.innerText = `Всего кликов ${
      this.#clickCounter + 2 * this.#dblClickCounter
    }`;
    clearTimeout(this.#timeOut);
    clearTimeout(this.#timeOut);
    
    this.#dblClickCounter++;
    this.#dblClickHTML.innerText = `Двойных кликов: ${this.#dblClickCounter}`;
  }
  // Показать статистику
  #showStatistics() {
    this.#renderHTML(document.body, this.#clickContainer);
    this.#renderHTML(this.#clickContainer, this.#startAnalysHTML);
    this.#renderHTML(this.#clickContainer, this.#clickHTML);
    this.#renderHTML(this.#clickContainer, this.#dblClickHTML);
    this.#renderHTML(this.#clickContainer, this.#sumOfClicks);
    this.#renderHTML(this.#clickContainer, this.#sumOfClicks);
  }
  // Удаление событий
  #removeEvents() {
    document.body.removeEventListener("click", this.clickHandler);
    document.body.removeEventListener("dblclick", this.dblClickHandler);
  }

  // Удаление элементов из DOM
  #removeElementFromDOM(element) {
    this.element = element;
    element.innerHTML = "";
    element.remove();
  }
  // Обнуление счетчиков
  #resetCounters() {
    this.#clickCounter = 0;
    this.#dblClickCounter = 0;
  }
}