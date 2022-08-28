import { Module } from '../core/module'
import * as Utils from '../utils'
import './toasty.css'
import Photo from '../assets/img/iou.png'
import ToastySound from '../assets/audio/toasty.mp3'

export class ToastyModule extends Module {
	#isRunning

	#toastyContainer

	constructor(type, text) {
		super(type, text);

		this.#isRunning = false;

	}

	trigger() {
		this.#create();
		Utils.playAudio(ToastySound);

		setTimeout(() => {
			this.destroy();
		}, 2000);
	}

	#create() {
		this.#toastyContainer = document.createElement('div');
		this.#toastyContainer.classList.add('toasty');

		const img = document.createElement('img');
		img.src = Photo;
		img.classList.add('toasty__img');

		const text = document.createElement('div');
		text.classList.add('toasty__text');
		text.textContent = 'Toasty!!!';

		this.#toastyContainer.append(img, text);

		document.body.append(this.#toastyContainer);
	}

	destroy() {
		this.#toastyContainer?.remove();
	}
}