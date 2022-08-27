import { Menu } from "./core/menu";
import { Module } from "./core/module";

export class ContextMenu extends Menu {
  #moduleList; // список модулей, подключенных к контекстному меню
  #contextMenuContainer; // селектор контейнера, при клике на который вызывается контекстное меню

  constructor(selector, containerSelector) {
    super(selector);

    this.containerSelector = containerSelector || "body"; // по умолчанию считаем что клик будет по всему документу

    this.#contextMenuContainer = document.querySelector(this.containerSelector);
    this.#moduleList = [];

    this.#render(); // создаем элементы контекстного меню
    this.#setup(); // подключаем к неему обработчики
  }

  // отрисовка контекстного меню
  #render() {
    this.el.classList.add("menu");
    this.el.innerHTML = "";

    this.#moduleList.forEach((module) => {
      this.el.insertAdjacentHTML("beforeend", module.toHTML()); // добавляемм в меню каждый подключенный модуль
    });
  }

  // установка обработчиков для контекстного меню
  #setup() {
    this.contextOpenHandler = this.contextOpenHandler.bind(this); // привязываем контекст к обработчику событий
    this.#contextMenuContainer.addEventListener(
      "contextmenu",
      this.contextOpenHandler
    );

    this.contextClickHandler = this.contextClickHandler.bind(this); // привязываем контекст к обработчику событий
    this.el.addEventListener("click", this.contextClickHandler);
  }

  // обработчик вызова контекстного меню
  contextOpenHandler(event) {
    // ничего не делаем, если к контекстному меню не привязано ни одного модуля
    if (!this.#moduleList.length) {
      return false;
    }

    event.preventDefault();

    // позиционируем меню

    this.close();

    this.el.style.left = `${this.getLocation(event)[0]}px`;
    this.el.style.top = `${this.getLocation(event)[1]}px`;

    this.open();
  }

  getLocation(event) {
    const x = event.clientX;
    const y = event.clientY;

    let location = [x, y];
    const menuSize = this.countMenuSize();

    if (this.distanceToBottom(event)) location[1] = y - menuSize[1];
    if (this.distanceToRightSide(event)) location[0] = x - menuSize[0];

    return location;
  }

  // Вычисление размера меню
  countMenuSize() {
    let menuSize = [];

    this.el.classList.add("count-size");
    menuSize[0] = this.el.offsetWidth;
    menuSize[1] = this.el.offsetHeight;

    this.el.classList.remove("count-size");

    return menuSize;
  }

  // Расстояние до нижней границы
  distanceToBottom(event) {
    return window.innerHeight - event.clientY < this.countMenuSize()[1];
  }

  // Расстояние до правой границы
  distanceToRightSide(event) {
    return window.innerWidth - event.clientX < this.countMenuSize()[0];
  }

  // обработчик нажатия на пункты меню
  contextClickHandler(event) {
    const { target } = event;
    if (target.dataset?.type) {
      const mod = this.#moduleList.find(
        (module) => module.type === target.dataset.type
      );
      mod?.trigger();
    }
    this.close();
  }

  // открытие контекстного меню
  open() {
    this.el.classList.add("open");
  }

  // закрытие контекстного меню
  close() {
    this.el.classList.remove("open");
  }

  // добавление модуля к контекстному меню
  add(module) {
    // проверяем что модуль передан и относится к классу Module
    if (!module || !module instanceof Module) {
      return;
    }

    this.#moduleList.push(module);
    this.#render(); // перерисовываем контекстное меню
  }

  // удаление
  destroy() {
    this.el.classList.remove("menu", "open");

    // удаляем прикрепленные обработики событий
    this.#contextMenuContainer.removeEventListener(
      "contextmenu",
      this.contextOpenHandler
    );
    this.el.removeEventListener("click", this.contextClickHandler);
  }
}
