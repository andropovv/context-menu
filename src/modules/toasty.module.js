import { Module } from '../core/module'

export class ToastyModule extends Module {
	trigger() {
		console.log('toasty');
	}
}