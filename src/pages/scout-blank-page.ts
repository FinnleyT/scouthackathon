import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-blank-page')
export class ScoutBlankPage extends LitElement {
  @property({ type: String }) label = 'Page';

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
    'scout-blank-page': ScoutBlankPage;
  }
}
