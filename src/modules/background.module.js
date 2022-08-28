import { Module } from "../core/module";
import { random } from "../utils";
import { getPhoto } from "../utils";
import { newLoader } from "../utils";
import { createLoader } from "../utils";
import "./background.css";
export class BackgroundModule extends Module {
  #url;
  #photoArray;
  #body;
  #loader;
  constructor(type, text) {
    super(type, text);

    this.#body = document.body;
    this.#loader = this.#body.append(newLoader());
    this.#url =
      "https://api.unsplash.com/photos/?client_id=hyjD8yAQ-fkXg7qz8w6vJRpqFHOTzk-957CMFtN9b6g";
    this.#photoArray = [];
  }
  async trigger() {
    const photos = await getPhoto(this.#url);
    this.#photoArray = photos.map((el) => el.urls.full);
    this.#body.style.backgroundImage = `url(${
      this.#photoArray[random(0, this.#photoArray.length - 1)]
    })`;
  }
}


