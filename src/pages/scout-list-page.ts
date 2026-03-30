import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-list-page')
export class ScoutListPage extends LitElement {
  @property({ type: String }) label = 'List';

  render() {
    return html`<section class="blank" aria-label=${this.label}></section>`;
  }

  static styles = css`
    :host {
      display: block;
    }

    .blank {
      min-height: 50vh;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-list-page': ScoutListPage;
  }
}
