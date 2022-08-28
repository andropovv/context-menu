import { Module } from "../core/module";
import "./clickModule.css";

export class ClicksModule extends Module {
  #clickCounter;
  #clickHTML;

  #timeOut;
  #clickContainer;
  #sumOfClicks;

  #dblClickCounter;
  #dblClickHTML;
  constructor(type, text) {
    super(type, text);
    this.#clickCounter = 0;
    this.#clickHTML = document.createElement("p");
    this.#clickHTML.className = "clicks";

    this.#timeOut;

    this.#clickContainer = document.createElement("div");
    this.#clickContainer.className = "clicks-wrapper";

    this.#dblClickCounter = 0;
    this.#dblClickHTML = document.createElement("p");
    this.#dblClickHTML.className = "clicks";

    this.#sumOfClicks = document.createElement("p");
    this.#sumOfClicks.className = "clicks";
  }

  trigger() {
    if (this.#isAnalysActive()) {
      this.#renderHTML(document.body, this.#clickContainer);
      this.#renderHTML(this.#clickContainer, this.#clickHTML);
      this.#renderHTML(this.#clickContainer, this.#dblClickHTML);

      this.#clickEvent();
      this.#dblClickEvent();

      setTimeout(this.#removeEvents.bind(this), 5000);
      setTimeout(this.#showStatistics.bind(this), 6000);
      setTimeout(() => {
        this.#removeElementFromDOM(this.#clickContainer);
        this.#removeElementFromDOM(this.#clickHTML);
        this.#removeElementFromDOM(this.#dblClickHTML);
      }, 8000);
      setTimeout(this.#resetCounters.bind(this), 9000);
    } else alert("Анализ кликов уже запущен");
  }
  // Проверяем активен ли анализ кликов
  #isAnalysActive() {
    const divExist = document.querySelector(".clicks-wrapper");
    if (divExist) {
      return false;
    } else return true;
  }
  // Добавляем обработчик событий по клику на body
  #clickEvent() {
    this.clickHandler = this.#clickHandler.bind(this);
    document.body.addEventListener("click", this.clickHandler);
  }
  // Добавляем обработчик событий по двойному клику на body
  #dblClickEvent() {
    this.dblClickHandler = this.#dblClickHandler.bind(this);
    document.body.addEventListener("dblclick", this.dblClickHandler);
  }
  // Что нужно делать при одинарном клике
  #clickHandler() {
    this.#timeOut = setTimeout(() => {
      this.#clickCounter++;
      this.#clickHTML.innerText = `Одинарных кликов: ${this.#clickCounter}`;
    }, 200);
  }
  // Что нужно делать при двойном клике
  #dblClickHandler() {
    clearTimeout(this.#timeOut);
    clearTimeout(this.#timeOut - 1);
    this.#dblClickCounter++;
    this.#dblClickHTML.innerText = `Двойных кликов: ${this.#dblClickCounter}`;
  }
  // Функциця добавления элементов в DOM
  #renderHTML(target, element) {
    this.element = element;
    target.append(this.element);
  }
  // Завершение анализа кликов
  #removeEvents() {
    document.body.removeEventListener("click", this.clickHandler);
    document.body.removeEventListener("dblclick", this.dblClickHandler);
  }
  // Показать статистику
  #showStatistics() {
    this.#sumOfClicks.innerText = `Всего кликов ${
      this.#clickCounter + 2 * this.#dblClickCounter
    }`;
    this.#renderHTML(this.#clickContainer, this.#sumOfClicks);
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
