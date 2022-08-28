import './notification.css'

export default class Notification {
	#notificationsContainer

	#notificationsContainerClass
	#notificationClass

	constructor(params) {
		this.text = params?.text || '';
		this.subtext = params?.subtext || '';

		this.#notificationsContainerClass = 'notifications-container';
		this.#notificationClass = 'notification';

		this.#create();
		this.show();
	}

	#create() {

		this.#notificationsContainer = document.querySelector(`.${this.#notificationsContainerClass}`);

		if (!this.#notificationsContainer) {
			this.#notificationsContainer = document.createElement('div');
			this.#notificationsContainer.classList.add(this.#notificationsContainerClass);
			document.body.append(this.#notificationsContainer);
		}

		this.notification = document.createElement('div');
		this.notification.classList.add(this.#notificationClass);

		const notificationBody = document.createElement('div');
		notificationBody.classList.add('notification__body');

		if (this.text) {
			const notificationText = document.createElement('div');
			notificationText.classList.add('notification__text');
			notificationText.textContent = this.text;

			notificationBody.append(notificationText);
		}

		if (this.subtext) {
			const notificationSubtext = document.createElement('div');
			notificationSubtext.classList.add('notification__subtext');
			notificationSubtext.textContent = this.subtext;

			notificationBody.append(notificationSubtext);
		}

		this.notification.append(notificationBody);

		this.#notificationsContainer.append(this.notification);

	}

	show() {
		this.notification.classList.add('notification--showing');
		this.notification.classList.add('notification--show');

		setTimeout(() => {
			this.notification.classList.remove('notification--showing');
		}, 10);

		setTimeout(() => {
			this.hide();
		}, 10000);
	}

	hide() {
		this.notification.classList.add('notification--showing');

		this.notification.addEventListener('transitionend', () => {
			this.notification.classList.remove('notification--showing');
			this.notification.classList.remove('notification--show');
			this.notification.remove();

			const notifications = this.#notificationsContainer.querySelectorAll(`.${this.#notificationClass}`);

			if (!notifications.length) {
				this.#notificationsContainer.remove();
			}

		}, { once: true });

	}
}