import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-settings-page')
export class ScoutSettingsPage extends LitElement {
  @property({ type: String }) label = 'Settings';

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
    'scout-settings-page': ScoutSettingsPage;
  }
}
