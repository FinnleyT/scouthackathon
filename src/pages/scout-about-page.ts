import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import aboutMarkdown from '../assets/about.md?raw';

@customElement('scout-about-page')
export class ScoutAboutPage extends LitElement {
  @property({ type: String }) label = 'About';

  render() {
    const renderedMarkdown = marked.parse(aboutMarkdown) as string;

    return html`
      <section class="page" aria-label=${this.label}>
        <h3 class="visually-hidden">${this.label}</h3>
        <div class="markdown">${unsafeHTML(renderedMarkdown)}</div>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--scout-on-surface);
    }

    .page {
      min-height: 50vh;
    }

    .markdown {
      display: grid;
      gap: 12px;
    }

    .markdown :is(h1, h2, h3) {
      margin: 0;
      color: var(--scout-on-surface);
    }

    .markdown :is(p, ul, ol) {
      margin: 0;
      color: var(--scout-on-surface-variant);
      line-height: 1.6;
    }

    .markdown a {
      color: var(--scout-primary);
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
    'scout-about-page': ScoutAboutPage;
  }
}
