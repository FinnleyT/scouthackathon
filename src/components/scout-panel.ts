import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-panel')
export class ScoutPanel extends LitElement {
  @property({ type: String }) headline = '';
  @property({ type: String }) subhead = '';

  render() {
    return html`
      <section class="panel">
        <header>
          <h2>${this.headline}</h2>
          ${this.subhead ? html`<p>${this.subhead}</p>` : null}
        </header>
        <slot></slot>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .panel {
      padding: 20px;
      border-radius: 24px;
      background: var(--scout-surface);
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 12px 24px rgba(22, 32, 20, 0.06);
    }

    header {
      margin-bottom: 14px;
    }

    h2 {
      margin: 0 0 4px;
      color: var(--scout-on-surface);
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: var(--scout-on-surface-variant);
      line-height: 1.5;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-panel': ScoutPanel;
  }
}
