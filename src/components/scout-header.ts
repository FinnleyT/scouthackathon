import { LitElement, css, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import defaultAvatarUrl from '../assets/default-avatar.svg';

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

  @state() private profileMenuOpen = false;

  private handleMenuClick = () => {
    this.dispatchEvent(
      new CustomEvent('menu-toggle', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly toggleProfileMenu = () => {
    this.profileMenuOpen = !this.profileMenuOpen;

    if (this.profileMenuOpen) {
      void this.updateComplete.then(() => {
        const firstItem = this.renderRoot.querySelector<HTMLElement>('.profile-menu a, .profile-menu button');
        firstItem?.focus();
      });
    }
  };

  private readonly closeProfileMenu = () => {
    this.profileMenuOpen = false;
  };

  private readonly handleLogoutClick = () => {
    this.closeProfileMenu();
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (!this.profileMenuOpen) {
      return;
    }

    if (event.key !== 'Escape') {
      return;
    }

    event.preventDefault();
    this.closeProfileMenu();

    void this.updateComplete.then(() => {
      const trigger = this.renderRoot.querySelector<HTMLButtonElement>('button.profile-avatar');
      trigger?.focus();
    });
  };

  private readonly handleGlobalPointerDown = (event: PointerEvent) => {
    if (!this.profileMenuOpen) {
      return;
    }

    const wrapper = this.renderRoot.querySelector<HTMLElement>('.profile-menu-wrapper');
    if (!wrapper) {
      return;
    }

    const path = event.composedPath();
    if (!path.includes(wrapper)) {
      this.closeProfileMenu();
    }
  };

  protected updated(changedProperties: PropertyValues) {
    if (!changedProperties.has('profileMenuOpen')) {
      return;
    }

    if (this.profileMenuOpen) {
      window.addEventListener('keydown', this.handleGlobalKeyDown, true);
      window.addEventListener('pointerdown', this.handleGlobalPointerDown, true);
      return;
    }

    window.removeEventListener('keydown', this.handleGlobalKeyDown, true);
    window.removeEventListener('pointerdown', this.handleGlobalPointerDown, true);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleGlobalKeyDown, true);
    window.removeEventListener('pointerdown', this.handleGlobalPointerDown, true);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <header class="top-bar">
        <div class="brand">
          <button
            class="menu-button"
            type="button"
            @click=${this.handleMenuClick}
            aria-label=${this.menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
          <div class="profile-menu-wrapper">
            <button
              class="profile-avatar"
              type="button"
              @click=${this.toggleProfileMenu}
              aria-label="Account menu"
              aria-haspopup="menu"
              aria-expanded=${this.profileMenuOpen ? 'true' : 'false'}
              aria-controls="profile-menu"
            >
              <img src=${defaultAvatarUrl} alt="" aria-hidden="true" />
            </button>

            ${this.profileMenuOpen
              ? html`
                  <div id="profile-menu" class="profile-menu" role="menu" aria-label="Account">
                    <a
                      class="menu-item"
                      role="menuitem"
                      href=${this.profileHref}
                      @click=${this.closeProfileMenu}
                    >
                      My profile
                    </a>
                    <button
                      class="menu-item"
                      role="menuitem"
                      type="button"
                      @click=${this.handleLogoutClick}
                    >
                      Log out
                    </button>
                  </div>
                `
              : null}
          </div>
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

    .profile-avatar {
      width: 44px;
      height: 44px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      text-decoration: none;
      color: var(--scout-primary);
      background: var(--scout-surface-container);
      border: 1px solid var(--scout-outline-variant);
      flex: 0 0 auto;
      cursor: pointer;
      padding: 0;
    }


    .profile-avatar:hover {
      background: var(--scout-primary-container);
    }

    .profile-avatar:focus-visible {
      outline: 3px solid var(--scout-secondary-container);
      outline-offset: 2px;
    }

    .profile-avatar svg,
    .profile-avatar img {
      width: 24px;
      height: 24px;
    }

    .profile-menu-wrapper {
      position: relative;
      flex: 0 0 auto;
    }

    .profile-menu {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      min-width: 180px;
      padding: 8px;
      border-radius: 16px;
      background: var(--scout-surface);
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 12px 24px rgba(22, 32, 20, 0.12);
      z-index: 30;
    }

    .menu-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: transparent;
      border: 0;
      font: inherit;
      color: var(--scout-on-surface);
      text-decoration: none;
      cursor: pointer;
    }

    .menu-item:hover {
      background: var(--scout-primary-container);
      color: var(--scout-on-primary-container);
    }

    .menu-item:focus-visible {
      outline: 3px solid var(--scout-secondary-container);
      outline-offset: 2px;
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

      .greeting {
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
