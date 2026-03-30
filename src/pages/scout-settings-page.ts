import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-settings-page')
export class ScoutSettingsPage extends LitElement {
  @property({ type: String }) label = 'Settings';
  @property({ type: Boolean, attribute: 'has-content' }) hasContent = false;
  @property({ type: Boolean }) loading = false;

  render() {
    return html`
      <section class="blank" aria-label=${this.label}>
        <h3 class="visually-hidden">${this.label}</h3>
        ${this.hasContent
          ? html`<slot></slot>`
          : this.loading
            ? html`<span class="visually-hidden" role="status">Loading ${this.label}…</span>`
            : html`<span class="visually-hidden">${this.label} content coming soon.</span>`}
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
    'scout-settings-page': ScoutSettingsPage;
  }
}
