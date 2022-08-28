import { Module } from "../core/module";
import { random } from "../utils";
import { getPhoto } from "../utils";
import "./background.css";
export class BackgroundModule extends Module {
  #url;
  #photoArray;
  #body;
  constructor(type, text) {
    super(type, text);
    this.#body = document.body;
    this.#url =
      "https://api.unsplash.com/photos/?client_id=hyjD8yAQ-fkXg7qz8w6vJRpqFHOTzk-957CMFtN9b6g";
    this.#photoArray = [];
  }
  trigger() {
    this.pushToArray(getPhoto(this.#url));
    this.#body.style.backgroundImage = `url(${
      this.#photoArray[random(0, this.#photoArray.length)]
    })`;
  }
  pushToArray(callback) {
    callback.then((photo) => {
      photo.forEach((element) => {
        this.#photoArray.push(element.urls.full);
      });
    });
  }
}
