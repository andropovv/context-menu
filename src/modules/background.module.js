import { Module } from "../core/module";
import { random } from "../utils";
import { getPhoto } from "../utils";
import { newLoader } from "../utils";
import { getRandomColor } from "../utils";
import "./background.css";
export class BackgroundModule extends Module {
  #url;
  #photoArray;
  #body;
  #loader;
  constructor(type, text) {
    super(type, text);

    this.#loader = newLoader();

    this.#body = document.body;
    this.#url =
      "https://api.unsplash.com/photos/?client_id=hyjD8yAQ-fkXg7qz8w6vJRpqFHOTzk-957CMFtN9b6g";
    this.#photoArray = [];
  }
  async trigger() {
    if (this.#photoArray.length > 0) {
      this.#changeBg();
    } else {
      this.#body.append(this.#loader);
      try {
        const photos = await getPhoto(this.#url);
        this.#photoArray = photos.map((el) => el.urls.full);
        this.#changeBg();
      } catch (e) {
        getRandomColor()
      } finally {
        this.#loader.remove();
      }
    }
  }
  #changeBg() {
    this.#body.style.backgroundImage = `url(${
      this.#photoArray[random(0, this.#photoArray.length - 1)]
    })`;
  }
}


