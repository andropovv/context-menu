import { Module } from '../core/module'
import * as Utils from '../utils'
import './timer.css'
import Icons from '../assets/img/timer-sprite.svg'
import Alarm from '../assets/audio/alarm.mp3'

export class TimerModule extends Module {
	#remainingTime  // оставшееся время на таймере
	#timerIsRunning // таймер создан и запущен
	#timerIsPaused // таймер приостановлен

	// переменные для хранения нод модального окна
	#modalContainer
	#modalShadow
	#modalClose
	#modalForm
	#modalFormInput

	// переменные для хранения нод таймера
	#timerContainer
	#timerPanel
	#timerControls
	#playPauseButton
	#stopButton

	constructor(type, text) {
		super(type, text);

		this.#remainingTime = 0;
		this.#timerIsRunning = false;
		this.#timerIsPaused = false;
		this.timerInterval = null;
	}

	// базовая функция (запускается при клике на контекстном меню)
	trigger() {
		this.#createModal();
		this.#setupModal();
		this.openModal();
	}

	// создание модального окна с запросом времени таймера
	#createModal() {
		this.closeModal();

		this.#modalContainer = document.createElement('div');
		this.#modalContainer.classList.add('timer-modal');

		this.#modalShadow = document.createElement('div');
		this.#modalShadow.classList.add('timer-modal__shadow');

		const modalContent = document.createElement('div');
		modalContent.classList.add('timer-modal__content');

		this.#modalClose = document.createElement('button');
		this.#modalClose.classList.add('timer-modal__close');
		this.#modalClose.innerHTML = Utils.svgImage(Icons, 'cross', 'modal-timer__svg-cross');

		const modalBody = document.createElement('div');
		modalBody.classList.add('timer-modal__body');


		if (this.#timerIsRunning) {
			// если таймер уже есть, то уведомляем об этом пользователя
			const modalTitle = document.createElement('h3');
			modalTitle.textContent = 'Таймер уже запущен!';

			modalBody.append(modalTitle);
		} else {
			const modalTitle = document.createElement('h3');
			modalTitle.textContent = 'На сколько секунд поставить таймер?';

			this.#modalForm = document.createElement('form');
			this.#modalForm.classList.add('timer-modal__form');

			this.#modalFormInput = document.createElement('input');
			this.#modalFormInput.classList.add('timer-modal__form-input');
			this.#modalFormInput.type = 'number';
			this.#modalFormInput.name = 'timer-seconds';
			this.#modalFormInput.min = 1;
			this.#modalFormInput.value = 10;
			this.#modalFormInput.required = true;


			const modalFormButton = document.createElement('button');
			modalFormButton.classList.add('timer-modal__form-button');
			modalFormButton.type = 'submit';
			modalFormButton.textContent = 'Запустить таймер';

			this.#modalForm.append(this.#modalFormInput, modalFormButton);
			modalBody.append(modalTitle, this.#modalForm);
		}


		modalContent.append(modalBody, this.#modalClose);

		this.#modalContainer.append(this.#modalShadow, modalContent);
		document.body.append(this.#modalContainer);
	}

	// навешивание обработчиков на модальное окно
	#setupModal() {
		this.closeModal = this.closeModal.bind(this);
		this.#modalShadow.addEventListener('click', this.closeModal);
		this.#modalClose.addEventListener('click', this.closeModal);

		this.submitForm = this.submitForm.bind(this);
		this.#modalForm?.addEventListener('submit', this.submitForm);

	}

	// открытие модального окна
	openModal() {
		this.#modalContainer.classList.add('timer-modal--show');
		this.#modalFormInput?.focus(); // сразу фокусируем полее ввода времени
	}

	// закрытие модального окна
	closeModal() {

		// убираем все обработчики
		this.#modalShadow?.removeEventListener('click', this.closeModal);
		this.#modalClose?.removeEventListener('click', this.closeModal);
		this.#modalForm?.removeEventListener('submit', this.submitForm);

		this.#modalContainer?.remove(); // удаляем со страницы
	}

	// обработчик отправки формы со временем
	submitForm(event) {
		event.preventDefault();

		const timerValue = Number(this.#modalFormInput.value);

		if (timerValue > 0) {
			this.#remainingTime = timerValue;
			this.#initializeTimer();
			this.closeModal();
		}

	}

	// инициализация таймера
	#initializeTimer() {
		this.#createTimer();
		this.timerPlay();
		this.#timerIsRunning = true;
	}

	// создание блока с таймером
	#createTimer() {
		this.#timerContainer = document.createElement('div');
		this.#timerContainer.classList.add('timer-block');

		this.#timerPanel = document.createElement('div');
		this.#timerPanel.classList.add('timer-block__panel');

		this.#timerControls = document.createElement('div');
		this.#timerControls.classList.add('timer-block__controls');

		this.#playPauseButton = document.createElement('button');
		this.#playPauseButton.classList.add('timer-block__play', 'pause');
		this.#playPauseButton.innerHTML = `${Utils.svgImage(Icons, 'play', 'timer-block__svg-play')} ${Utils.svgImage(Icons, 'pause', 'timer-block__svg-pause')}`;

		this.#stopButton = document.createElement('button');
		this.#stopButton.classList.add('timer-block__stop', 'pause');
		this.#stopButton.innerHTML = Utils.svgImage(Icons, 'stop', 'timer-block__svg-stop');

		this.#timerControls.append(this.#playPauseButton, this.#stopButton);

		this.#timerContainer.append(this.#timerPanel, this.#timerControls);

		document.body.append(this.#timerContainer);

		this.#drawTimer(this.#remainingTime);
		this.#setupTimer();
	}

	// отрисовка значений таймера
	#drawTimer(remaining) {
		remaining = remaining > 0 ? remaining : 0;

		const minutesRaw = Math.floor(remaining / 60 % 60);
		const secondsRaw = Math.floor(remaining % 60);

		const minutes = ('0' + minutesRaw).slice(-2);
		const seconds = ('0' + secondsRaw).slice(-2);

		this.#timerPanel.innerHTML = `
			<div class="timer-block__element">${minutes}</div>
			<div class="timer-block__separator"></div>
			<div class="timer-block__element">${seconds}</div>
		`;
	}

	// навешивание обработчиков на таймер
	#setupTimer() {
		this.timerPlayPause = this.timerPlayPause.bind(this);
		this.#playPauseButton.addEventListener('click', this.timerPlayPause);

		this.timerStop = this.timerStop.bind(this);
		this.#stopButton.addEventListener('click', this.timerStop);
	}

	timerPlayPause() {
		if (this.#timerIsPaused) {
			this.timerPlay();
			this.#playPauseButton.classList.add('pause');
		} else {
			this.timerPause();
			this.#playPauseButton.classList.remove('pause');
		}
	}

	// включить таймер
	timerPlay() {
		this.#timerIsPaused = false;

		this.timerInterval = setInterval(() => {
			this.#remainingTime -= 1;
			this.#drawTimer(this.#remainingTime);

			if (this.#remainingTime < 0) {
				this.#remainingTime = 0;
				this.timerFinish();
			}
		}, 1000);
	}

	// приостановить таймер
	timerPause() {
		this.#timerIsPaused = true;
		clearInterval(this.timerInterval);
	}

	// остановить (также удаляет таймер)
	timerStop() {
		this.#playPauseButton.removeEventListener('click', this.timerPlayPause);
		this.#stopButton.removeEventListener('click', this.timerStop);

		this.timerPause();
		this.#timerContainer.remove();
		this.#remainingTime = 0;
		this.#timerIsRunning = false;
	}

	// когда время истексо
	timerFinish() {
		this.timerPause(); // сначала останавливаем таймер
		Utils.playAudio(Alarm); // проигрываем звук будильника

		this.#timerControls.remove(); // убираем кнопки управления

		this.#timerContainer.classList.add('timer-block--finished');

		// показываем алерт
		const bell = document.createElement('div');
		bell.classList.add('timer-block__bell');
		bell.innerHTML = Utils.svgImage(Icons, 'bell', 'timer-block__svg-bell');

		this.#timerPanel.innerHTML = '';
		this.#timerPanel.append(bell);

		// убираем таймер со страницы
		setTimeout(() => {
			this.timerStop();
		}, 5000);
	}

	// уничтожение всего
	destroy() {
		this.closeModal();
		this.timerStop();
	}

}