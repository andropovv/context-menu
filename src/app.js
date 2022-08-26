import './styles.css';
import { ContextMenu } from './menu';
import { BackgroundModule } from './modules/background.module';
import { ClicksModule } from './modules/clicks.module';
import { ShapeModule } from './modules/shape.module';

const background = new BackgroundModule('back', 'Change back');
const clicks = new ClicksModule('click', 'Click');
const shape = new ShapeModule('shape', 'Shape');

const contextMenu = new ContextMenu('#menu');

contextMenu.add(background);
contextMenu.add(clicks);
contextMenu.add(shape);
