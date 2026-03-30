import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('scout-card')
export class ScoutCard extends LitElement {
  @property({ type: String }) headline = '';
  @property({ type: String }) supportingText = '';
  @property({ type: String }) eyebrow = '';

  render() {
    return html`
      <article class="card">
        ${this.eyebrow ? html`<p class="eyebrow">${this.eyebrow}</p>` : null}
        <h3>${this.headline}</h3>
        <p>${this.supportingText}</p>
      </article>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .card {
      height: 100%;
      padding: 18px;
      border-radius: 20px;
      background: var(--scout-surface);
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 8px 18px rgba(22, 32, 20, 0.06);
      box-sizing: border-box;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: var(--scout-primary);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    h3 {
      margin: 0 0 6px;
      color: var(--scout-on-surface);
      font-size: 1rem;
      line-height: 1.3;
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
    'scout-card': ScoutCard;
  }
}
