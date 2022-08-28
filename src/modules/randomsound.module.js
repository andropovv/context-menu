import { playAudio, random } from "../utils";
import { Module } from "../core/module";
import Sound1 from ".././assets/audio/modulesSound/sound1.mp3";
import Sound2 from ".././assets/audio/modulesSound/sound2.mp3";
import Sound3 from ".././assets/audio/modulesSound/sound3.mp3";
import Sound4 from ".././assets/audio/modulesSound/sound4.mp3";
import Sound5 from ".././assets/audio/modulesSound/sound5.mp3";
import Sound6 from ".././assets/audio/modulesSound/sound6.mp3";
import Sound7 from ".././assets/audio/modulesSound/sound7.mp3";
import Sound8 from ".././assets/audio/modulesSound/sound8.mp3";
import Sound9 from ".././assets/audio/modulesSound/sound9.mp3";
import Sound10 from ".././assets/audio/modulesSound/sound10.mp3";

export class RandomSound extends Module {
  #soundsArray;

  constructor(type, text) {
    super(type, text);
    this.#soundsArray = [
      Sound1,
      Sound2,
      Sound3,
      Sound4,
      Sound5,
      Sound6,
      Sound7,
      Sound8,
      Sound9,
      Sound10,
    ];
  }

  trigger() {
    const sound = this.getRandomSound();
    playAudio(sound);
  }

  getRandomSound() {
    return this.#soundsArray[random(0, this.#soundsArray.length - 1)];
  }
}
