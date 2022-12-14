import { Module } from "../core/module";
import { random, getRandomColor } from "../utils";
import "./shape.css";

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text);
    if (!type) {
      throw new Error('Please specify "type" param');
    }
    if (!text) {
      throw new Error('Please specify "text" param');
    }
    this.type = type;
    this.text = text;
    this.size = [0, 0];
    this.figures = [
      "square",
      "circle",
      "heart",
      "flower",
      "leaf",
      "cloud",
      "loader",
      "comment",
      "moon",
      "cross",
    ];
  }

  trigger() {
    const figure = this.createFigure();

    document.body.append(figure);

    setTimeout(() => {
      this.removeFigure(figure);
    }, 5000);
  }

  addTransform(element) {
    element.style.transform = `rotate(${random(-360, 360)}deg)`;
    element.style.transition = `all ease-in 2s`;
  }

  removeTransform(element) {
    element.style.transform = `none`;
  }

  createFigure() {
    const figure = document.createElement("div");
    figure.classList.add(this.getRandomClass(), "figure");
    figure.style.transform = `scale(${random(2, 10) / 10})`;
    figure.style.borderColor = getRandomColor();

    figure.style.position = "absolute";
    figure.style.left = `${this.getRandomPosition()[1]}px`;
    figure.style.top = `${this.getRandomPosition()[0]}px`;

    figure.addEventListener("mouseover", (e) => this.addTransform(e.target));
    figure.addEventListener("mouseleave", (e) =>
      this.removeTransform(e.target)
    );

    return figure;
  }

  getRandomClass() {
    return this.figures[random(0, this.figures.length - 1)];
  }

  getRandomPosition() {
    return [
      random(200, window.innerHeight - 200),
      random(200, window.innerWidth - 200),
    ];
  }

  removeFigure(figure) {
    document.body.removeChild(figure);
    figure.removeEventListener("mouseover", (e) => this.addTransform(e.target));
    figure.removeEventListener("mouseleave", (e) =>
      this.removeTransform(e.target)
    );
  }
}
