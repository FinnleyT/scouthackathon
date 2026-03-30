import { customElement } from 'lit/decorators.js';
import { ScoutApp } from './components/scout-app.ts';

@customElement('my-element')
export class MyElement extends ScoutApp {}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}