import './styles.css';
import { ContextMenu } from './menu';
import { BackgroundModule } from './modules/background.module';
import { ClicksModule } from './modules/clicks.module';
import { ShapeModule } from './modules/shape.module';
import { TimerModule } from './modules/timer.module';

const background = new BackgroundModule('back', 'Изменить фон');
const clicks = new ClicksModule('click', 'Анализ кликов');
const shape = new ShapeModule('shape', 'Создать фигуру');
const timer = new TimerModule('timer', 'Установить таймер');

const contextMenu = new ContextMenu('#menu');

contextMenu.add(background);
contextMenu.add(clicks);
contextMenu.add(shape);
contextMenu.add(timer);
