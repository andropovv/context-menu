import { Module } from '../core/module'
import * as Utils from '../utils'
import Notification from '../classes/notification';

export class QuoteModule extends Module {

	static #quotes = [
		{
			author: 'Наполеон Хилл',
			message: 'Что разум человека может постигнуть и во что он может поверить, того он способен достичь.'
		},
		{
			author: 'Альберт Эйнштейн',
			message: 'Стремитесь не к успеху, а к ценностям, которые он дает.'
		},
		{
			author: 'Джон Леннон',
			message: 'Жизнь - это то, что с тобой происходит, пока ты строишь планы.'
		},
		{
			author: 'Виталий Кличко',
			message: 'А сегодня в завтрашний день, не все могут смотреть. Вернее смотреть могут не только лишь все, не каждый может это делать.'
		},
		{
			author: 'Христофор Колумб',
			message: 'Вы никогда не пересечете океан, если не наберетесь мужества потерять берег из виду.'
		},
		{
			author: 'Владилен Минин',
			message: '42 — ответ на все вопросы. '
		}
	];

	trigger() {
		const quote = QuoteModule.#quotes[Utils.random(0, QuoteModule.#quotes.length - 1)];

		new Notification({
			text: `«${quote.message}»`,
			subtext: `— ${quote.author}`
		});

	}
}