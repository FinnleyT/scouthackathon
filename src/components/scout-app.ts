import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import './scout-card.ts';
import './scout-header.ts';
import './scout-panel.ts';

type CardData = {
  title: string;
  description: string;
  eyebrow?: string;
};

type LinkData = {
  label: string;
  href: string;
  description: string;
};

@customElement('scout-app')
export class ScoutApp extends LitElement {
  @state() private menuOpen = false;

  private readonly navigation: LinkData[] = [
    { label: 'Home', href: '#home', description: 'Overview and latest activity' },
    { label: 'Chat Rooms', href: '#chatrooms', description: 'Join global conversations' },
    { label: 'Live Events', href: '#events', description: 'See what is happening now' },
    { label: 'Resources', href: '#resources', description: 'Discover scouting ideas' },
    { label: 'Settings', href: '#settings', description: 'Manage your preferences' },
  ];

  private readonly highlights: CardData[] = [
    { title: 'My Messages', description: '2 new chats waiting from Scouts around the world.', eyebrow: 'Inbox' },

   
    { title: 'Scouting Tips', description: 'Fresh ideas for teamwork, safety, and leadership.', eyebrow: 'Learn' },
  ];

  private readonly updates = [
    'New JOTI event starting soon — just now',
    'You joined a new chat room — 1 hour ago',
    
  ];

  private readonly involvement: CardData[] = [
    { title: 'Join the Chat!', description: 'Talk with Scouts worldwide in real time.' },
    
    
  ];

  private toggleMenu = () => {
    this.menuOpen = !this.menuOpen;
  };

  private closeMenu = () => {
    this.menuOpen = false;
  };

  render() {
    return html`
      <div class="app-shell">
        <scout-header userName="Finnley" @menu-toggle=${this.toggleMenu}></scout-header>

        <div class="layout">
          ${this.menuOpen
            ? html`<button
                class="scrim"
                type="button"
                @click=${this.closeMenu}
                aria-label="Close navigation menu"
              ></button>`
            : null}

          <aside class=${this.menuOpen ? 'drawer open' : 'drawer'} aria-label="Primary navigation">
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

          <main class="content">
            <section class="hero" id="home">
              <div class="hero-copy">
                <p class="eyebrow">Jamboree on the Internet</p>
                <h1>Welcome back, Finnley!</h1>
                <p class="hero-text">
                  Ready for your next JOTI adventure? Connect with Scouts from all over the
                  world in a clearer, more modern dashboard.
                </p>

                <div class="hero-actions">
                  <md-filled-button href="#chatrooms">Enter JOTI</md-filled-button>
                  <md-outlined-button href="#events">Today’s schedule</md-outlined-button>
                </div>

                <div class="status-row" aria-label="Highlights">
                <span class="status-pill">0 new chats</span>
                
                 
                </div>
              </div>

              <div class="hero-aside" id="events">
                <p class="eyebrow">Live now</p>
                
                </ul>
              </div>
            </section>

            <section class="card-grid" aria-label="Dashboard highlights">
              ${this.highlights.map(
                (item) => html`
                  <scout-card
                    .headline=${item.title}
                    .supportingText=${item.description}
                    .eyebrow=${item.eyebrow ?? ''}
                  ></scout-card>
                `,
              )}
            </section>

            <section class="two-column-layout">
              <scout-panel
                headline="Recent Updates"
                subhead="Stay on top of what has changed since your last visit."
              >
                <ul class="bullet-list">
                  ${this.updates.map((item) => html`<li>${item}</li> `)}
                </ul>
              </scout-panel>

              <scout-panel
                headline="Quick Links"
                subhead="Jump straight into the areas Scouts use the most."
              >
                <ul class="link-list" id="chatrooms">
                  ${this.navigation.slice(0, 4).map(
                    (link) => html`
                      <li>
                        <a href=${link.href} @click=${this.closeMenu}>${link.label}</a>
                        <span>${link.description}</span>
                      </li>
                    `,
                  )}
                </ul>
              </scout-panel>
            </section>

            <scout-panel
              headline="Get Involved"
              subhead="Choose an activity and keep the momentum going."
              id="resources"
            >
              <div class="card-grid compact-grid">
                ${this.involvement.map(
                  (item) => html`
                    <scout-card
                      .headline=${item.title}
                      .supportingText=${item.description}
                    ></scout-card>
                  `,
                )}
              </div>
            </scout-panel>

            <footer class="footer" id="settings">
              <p>Built with Lit web components and Material-inspired patterns for maintainability.</p>
            </footer>
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
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 24px;
      width: min(1280px, calc(100% - 32px));
      margin: 0 auto;
      padding: 24px 0 32px;
      align-items: start;
    }

    .drawer {
      position: sticky;
      top: 92px;
      padding: 18px;
      border-radius: 24px;
      background: var(--scout-surface);
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 12px 24px rgba(22, 32, 20, 0.05);
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

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
      gap: 20px;
      padding: 24px;
      border-radius: 28px;
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--scout-primary) 12%, white), var(--scout-surface));
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 16px 28px rgba(22, 32, 20, 0.08);
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 3vw, 2.75rem);
      line-height: 1.1;
      color: var(--scout-on-surface);
    }

    .hero-text {
      margin: 0;
      color: var(--scout-on-surface-variant);
      max-width: 62ch;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 18px 0 16px;
    }

    .status-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .status-pill {
      padding: 8px 12px;
      border-radius: 999px;
      background: var(--scout-secondary-container);
      color: var(--scout-on-secondary-container);
      font-size: 0.9rem;
      font-weight: 600;
    }

    .hero-aside {
      padding: 18px;
      border-radius: 20px;
      background: var(--scout-surface-container);
      align-self: stretch;
    }

    .hero-aside h2 {
      margin: 0 0 8px;
      color: var(--scout-on-surface);
      font-size: 1.35rem;
    }

    .hero-aside p {
      margin: 0 0 12px;
      color: var(--scout-on-surface-variant);
      line-height: 1.6;
    }

    .mini-list,
    .bullet-list {
      margin: 0;
      padding-left: 18px;
      color: var(--scout-on-surface-variant);
      line-height: 1.7;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }

    .compact-grid {
      margin-top: 8px;
    }

    .two-column-layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 12px;
    }

    .link-list li {
      display: grid;
      gap: 2px;
      padding: 12px 14px;
      border-radius: 16px;
      background: var(--scout-surface-container);
    }

    .link-list a {
      color: var(--scout-primary);
      font-weight: 700;
      text-decoration: none;
    }

    .link-list a:hover {
      text-decoration: underline;
    }

    .link-list span {
      color: var(--scout-on-surface-variant);
      line-height: 1.5;
    }

    .footer {
      padding: 0 4px;
      color: var(--scout-on-surface-variant);
      font-size: 0.95rem;
    }

    .footer p {
      margin: 0;
    }

    .scrim {
      display: none;
    }

    @media (max-width: 960px) {
      .layout {
        grid-template-columns: 1fr;
        width: min(100%, calc(100% - 24px));
      }

      .drawer {
        position: fixed;
        inset: 84px auto 16px 12px;
        width: min(280px, calc(100vw - 24px));
        transform: translateX(-120%);
        transition: transform 0.25s ease;
        z-index: 30;
      }

      .drawer.open {
        transform: translateX(0);
      }

      .scrim {
        display: block;
        position: fixed;
        inset: 0;
        border: 0;
        background: rgba(15, 23, 16, 0.28);
        z-index: 25;
      }

      .hero,
      .two-column-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .layout {
        padding-top: 16px;
      }

      .hero {
        padding: 18px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-app': ScoutApp;
  }
}
