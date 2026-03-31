import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-blank-page')
export class ScoutBlankPage extends LitElement {
  @property({ type: String }) label = 'Page';

  render() {
    return html`
      <section class="blank" aria-label=${this.label}>
        <h3 class="visually-hidden">${this.label}</h3>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .blank {
      min-height: 50vh;
    }

    .visually-hidden {
      position: absolute !important;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-blank-page': ScoutBlankPage;
  }
}
