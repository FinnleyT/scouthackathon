import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import './scout-header.ts';
import '../pages/scout-blank-page.ts';
import '../pages/scout-form-page.ts';
import '../pages/scout-home-page.ts';
import '../pages/scout-list-page.ts';
import '../pages/scout-map-page.ts';
import '../pages/scout-list-page.ts';

type LinkData = {
  label: string;
  href: string;
  description: string;
};

@customElement('scout-app')
export class ScoutApp extends LitElement {
  @state() private menuOpen = false;
  @state() private route = 'home';

  private readonly userName = 'Finnley';

  private readonly drawerId = 'primary-nav-drawer';

  private readonly navigation: LinkData[] = [
    { label: 'Home', href: '#/home', description: 'Overview and latest activity' },
    { label: 'List view', href: '#/list view', description: 'Use this to find your friends!' },
    { label: 'Map', href: '#/map', description: 'Explore nearby scouting activity' },
    { label: 'Form', href: '#/form', description: 'Submit scouting updates' },
   
  ];

  private toggleMenu = () => {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      void this.updateComplete.then(() => {
        const firstLink = this.renderRoot.querySelector<HTMLAnchorElement>('a.nav-link');
        firstLink?.focus();
      });
    }
  };

  private closeMenu = () => {
    this.menuOpen = false;
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (!this.menuOpen) {
      return;
    }

    event.preventDefault();
    this.closeMenu();
  };

  private readonly handleHashChange = () => {
    this.route = this.getRouteFromLocation();
    this.closeMenu();
  };

  connectedCallback() {
    super.connectedCallback();

    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home');
    }

    this.route = this.getRouteFromLocation();
    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    if (this.menuOpen) {
      this.menuOpen = false;
      document.documentElement.style.overflow = '';
    }

    window.removeEventListener('hashchange', this.handleHashChange);
    window.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected updated() {
    document.documentElement.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  private getRouteFromLocation() {
    const rawHash = window.location.hash;

    if (!rawHash || rawHash === '#') {
      return 'home';
    }

    const withoutHash = rawHash.startsWith('#/') ? rawHash.slice(2) : rawHash.slice(1);
    const cleaned = withoutHash.replace(/^\/+/, '').trim().toLowerCase();

    return cleaned || 'home';
  }

  private getPageLabel(route: string) {
    switch (route) {
      case 'home':
        return 'Home';
      case 'settings':
        return 'List view';
      case 'map':
        return 'Map';
      case 'form':
        return 'Form';
      case 'list':
        return 'List';
      case 'profile':
        return 'My Profile';
      default:
        return 'Page';
    }
  }

  private renderPage(route: string, pageLabel: string) {
    switch (route) {
      case 'home':
        return html`<scout-home-page .navigation=${this.navigation} .userName=${this.userName}></scout-home-page>`;
      case 'settings':
        return html`<scout-settings-page .label=${pageLabel}></scout-settings-page>`;
      case 'map':
        return html`<scout-map-page .label=${pageLabel}></scout-map-page>`;
      case 'form':
        return html`<scout-form-page .label=${pageLabel}></scout-form-page>`;
      case 'list':
        return html`<scout-list-page .label=${pageLabel}></scout-list-page>`;
      default:
        return html`<scout-blank-page .label=${pageLabel}></scout-blank-page>`;
    }
  }

  render() {
    const pageLabel = this.getPageLabel(this.route);

    return html`
      <div class="app-shell">
        <scout-header
          .userName=${this.userName}
          profileHref="#/profile"
          .menuOpen=${this.menuOpen}
          drawerId=${this.drawerId}
          @menu-toggle=${this.toggleMenu}
        ></scout-header>

        <div class="layout">
          ${this.menuOpen
            ? html`<button
                class="scrim"
                type="button"
                @click=${this.closeMenu}
                aria-label="Close navigation menu"
              ></button>`
            : null}

          <aside
            id=${this.drawerId}
            class=${this.menuOpen ? 'drawer open' : 'drawer'}
            aria-label="Primary navigation"
            aria-hidden=${this.menuOpen ? 'false' : 'true'}
          >
            <p class="nav-title">Navigate</p>
            <nav>
              ${this.navigation.map(
                (link) => html`
                  <a class="nav-link" href=${link.href} @click=${this.closeMenu}>
                    <span>${link.label}</span>
                    <small>${link.description}</small>
                  </a>
                `,
              )}
            </nav>
          </aside>

          <main class="content" aria-label=${pageLabel}>
            ${this.renderPage(this.route, pageLabel)}
          </main>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--scout-on-surface);
    }

    .app-shell {
      min-height: 100svh;
    }

    .layout {
      width: min(1280px, calc(100% - 32px));
      margin: 0 auto;
      padding: 24px 0 32px;
    }

    .drawer {
      position: fixed;
      inset: 92px auto 16px 12px;
      width: min(300px, calc(100vw - 24px));
      padding: 18px;
      border-radius: 24px;
      background: var(--scout-surface);
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 12px 24px rgba(22, 32, 20, 0.12);
      transform: translateX(-120%);
      transition: transform 0.25s ease;
      z-index: 40;
    }

    .drawer.open {
      transform: translateX(0);
    }

    .nav-title,
    .eyebrow {
      margin: 0 0 12px;
      color: var(--scout-primary);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    nav {
      display: grid;
      gap: 10px;
    }

    .nav-link {
      display: grid;
      gap: 2px;
      padding: 12px 14px;
      border-radius: 16px;
      text-decoration: none;
      color: inherit;
      background: var(--scout-surface-container);
      transition:
        transform 0.2s ease,
        background 0.2s ease;
    }

    .nav-link:hover {
      transform: translateY(-1px);
      background: var(--scout-primary-container);
    }

    .nav-link span {
      font-weight: 600;
      color: var(--scout-on-surface);
    }

    .nav-link small {
      color: var(--scout-on-surface-variant);
      line-height: 1.4;
    }

    .content {
      display: grid;
      gap: 24px;
    }

    .scrim {
      position: fixed;
      inset: 92px 0 0 0;
      border: 0;
      background: rgba(15, 23, 16, 0.28);
      z-index: 35;
    }

    @media (max-width: 960px) {
      .layout {
        width: min(100%, calc(100% - 24px));
      }
    }

    @media (max-width: 640px) {
      .layout {
        padding-top: 16px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-app': ScoutApp;
  }
}
