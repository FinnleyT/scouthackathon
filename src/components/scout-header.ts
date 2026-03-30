import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/outlined-button.js';

const menuIcon = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
    ></path>
  </svg>
`;

@customElement('scout-header')
export class ScoutHeader extends LitElement {
  @property({ type: String }) appTitle = 'Scout JOTI Online';
  @property({ type: String }) userName = 'Finnley';
  @property({ type: String }) profileHref = '#/profile';
  @property({ type: Boolean }) menuOpen = false;
  @property({ type: String }) drawerId = 'primary-nav-drawer';

  private handleMenuClick = () => {
    this.dispatchEvent(
      new CustomEvent('menu-toggle', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
    return html`
      <header class="top-bar">
        <div class="brand">
          <button
            class="menu-button"
            type="button"
            @click=${this.handleMenuClick}
            aria-label="Open navigation menu"
            aria-controls=${this.drawerId}
            aria-expanded=${this.menuOpen ? 'true' : 'false'}
          >
            ${menuIcon}
          </button>

          <div>
            <p class="subtitle">Connected Scouting</p>
            <h1 class="title">${this.appTitle}</h1>
          </div>
        </div>

        <div class="user-pill">
          <div class="greeting" aria-label="Current user">
            <span>Signed in as</span>
            <strong>${this.userName}</strong>
          </div>
          <md-outlined-button href=${this.profileHref}>My Profile</md-outlined-button>
        </div>
      </header>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 20px;
      background: var(--scout-surface);
      border-bottom: 1px solid var(--scout-outline-variant);
      position: sticky;
      top: 0;
      z-index: 20;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .menu-button {
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 999px;
      display: grid;
      place-items: center;
      color: var(--scout-primary);
      background: var(--scout-primary-container);
      cursor: pointer;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }

    .menu-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px rgba(47, 111, 62, 0.15);
    }

    .menu-button:focus-visible {
      outline: 3px solid var(--scout-secondary-container);
      outline-offset: 2px;
    }

    .menu-button svg {
      width: 22px;
      height: 22px;
    }

    .subtitle {
      margin: 0;
      color: var(--scout-primary);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .title {
      margin: 2px 0 0;
      color: var(--scout-on-surface);
      font-size: 1.125rem;
      line-height: 1.2;
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .greeting {
      text-align: right;
    }

    .greeting span {
      display: block;
      font-size: 0.8rem;
      color: var(--scout-on-surface-variant);
    }

    .greeting strong {
      color: var(--scout-on-surface);
      font-size: 0.95rem;
    }

    @media (max-width: 680px) {
      .top-bar {
        padding-inline: 14px;
      }

      .greeting,
      .user-pill md-outlined-button {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-header': ScoutHeader;
  }
}
