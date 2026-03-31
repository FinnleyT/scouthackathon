import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '../components/scout-card.ts';
import '../components/scout-panel.ts';

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

@customElement('scout-home-page')
export class ScoutHomePage extends LitElement {
  @property({ attribute: false }) navigation: LinkData[] = [];
  @property({ type: String }) userName = 'Scout';

  private readonly highlights: CardData[] = [
    {
      title: 'My Messages',
      description: '2 new chats waiting from Scouts around the world.',
      eyebrow: 'Inbox',
    },
    {
      title: 'Event Schedule',
      description: 'Catch the digital campfire and badge workshop today.',
      eyebrow: 'Today',
    },
    {
      title: 'JOTI Activities',
      description: 'Take on online challenges and unlock new badges.',
      eyebrow: 'Explore',
    },
    {
      title: 'Scouting Tips',
      description: 'Fresh ideas for teamwork, safety, and leadership.',
      eyebrow: 'Learn',
    },
  ];

  private readonly updates = [
    'New JOTI event starting soon — just now',
    'You joined a new chat room — 1 hour ago',
    'Badge earned: Digital Communicator — yesterday',
  ];

  private readonly involvement: CardData[] = [
    { title: 'Join the Chat!', description: 'Talk with Scouts worldwide in real time.' },
    { title: 'Live Campfire', description: 'Watch the virtual campfire and share stories.' },
    { title: 'JOTI Challenges', description: 'Complete fun online tasks and earn badges.' },
  ];

  render() {
    const quickLinks = this.navigation.filter((link) => link.href !== '#/home').slice(0, 4);

    return html`
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Jamboree on the Internet</p>
          <h1>Welcome back, ${this.userName}!</h1>
          <p class="hero-text">
            Ready for your next JOTI adventure? Connect with Scouts from all over the world in a
            clearer, more modern dashboard.
          </p>

          <div class="hero-actions">
            <md-filled-button href="#/form">Enter JOTI</md-filled-button>
            <md-outlined-button href="#/map">Today’s schedule</md-outlined-button>
          </div>

          <div class="status-row" aria-label="Highlights">
            <span class="status-pill">2 new chats</span>
            <span class="status-pill">1 badge earned</span>
            <span class="status-pill">Campfire live at 19:00</span>
          </div>
        </div>

        <div class="hero-aside">
          <p class="eyebrow">Live now</p>
          <h2>Global Campfire</h2>
          <p>Share stories, songs, and greetings with Scouts across time zones.</p>
          <ul class="mini-list">
            <li>Opening welcome at 18:30</li>
            <li>Digital badge workshop at 20:00</li>
            <li>Friendly challenge leaderboard updates</li>
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
        <scout-panel headline="Recent Updates" subhead="Stay on top of what has changed since your last visit.">
          <ul class="bullet-list">
            ${this.updates.map((item) => html`<li>${item}</li> `)}
          </ul>
        </scout-panel>

        <scout-panel headline="Quick Links" subhead="Jump straight into the areas Scouts use the most.">
          <ul class="link-list">
            ${quickLinks.map(
              (link) => html`
                <li>
                  <a href=${link.href}>${link.label}</a>
                  <span>${link.description}</span>
                </li>
              `,
            )}
          </ul>
        </scout-panel>
      </section>

      <scout-panel headline="Get Involved" subhead="Choose an activity and keep the momentum going.">
        <div class="card-grid compact-grid">
          ${this.involvement.map(
            (item) => html`
              <scout-card .headline=${item.title} .supportingText=${item.description}></scout-card>
            `,
          )}
        </div>
      </scout-panel>

      <footer class="footer">
        <p>Built with Lit web components and Material-inspired patterns for maintainability.</p>
      </footer>
    `;
  }

  static styles = css`
    :host {
      display: grid;
      gap: 24px;
      color: var(--scout-on-surface);
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
      gap: 20px;
      padding: 24px;
      border-radius: 28px;
      background:
        linear-gradient(
          135deg,
          color-mix(in srgb, var(--scout-primary) 12%, white),
          var(--scout-surface)
        );
      border: 1px solid var(--scout-outline-variant);
      box-shadow: 0 16px 28px rgba(22, 32, 20, 0.08);
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 3vw, 2.75rem);
      line-height: 1.1;
      color: var(--scout-on-surface);
    }

    .eyebrow {
      margin: 0 0 12px;
      color: var(--scout-primary);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
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

    @media (max-width: 960px) {
      .hero,
      .two-column-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .hero {
        padding: 18px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-home-page': ScoutHomePage;
  }
}
