import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';
import '../components/scout-panel.ts';
import { signInWithEmailPassword } from '../components/firebase-auth.ts';

type FirebaseAuthError = {
  code?: string;
  message?: string;
};

type MdTextFieldLike = HTMLElement & {
  value: string;
  focus?: () => void;
};

@customElement('scout-login-page')
export class ScoutLoginPage extends LitElement {
  @state() private email = '';
  @state() private password = '';
  @state() private submitting = false;
  @state() private errorMessage = '';

  protected firstUpdated(): void {
    const emailField = this.renderRoot.querySelector<MdTextFieldLike>('md-filled-text-field');
    emailField?.focus?.();
  }

  private handleEmailInput = (event: Event) => {
    const target = event.target as MdTextFieldLike;
    this.email = target.value;
  };

  private handlePasswordInput = (event: Event) => {
    const target = event.target as MdTextFieldLike;
    this.password = target.value;
  };

  private handleFormKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    void this.submit();
  };

  private submit = async () => {
    if (this.submitting) {
      return;
    }

    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      this.errorMessage = 'Enter your email and password.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    try {
      await signInWithEmailPassword(email, password);
      this.password = '';
    } catch (error) {
      this.errorMessage = getFriendlyAuthErrorMessage(error);
    } finally {
      this.submitting = false;
    }
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    void this.submit();
  };

  render() {
    const canSubmit = Boolean(this.email.trim() && this.password);

    return html`
      <div class="page">
        <scout-panel
          headline="Sign in"
          subhead="Use the login details provided to you."
        >
          <form class="form" @submit=${this.handleSubmit} @keydown=${this.handleFormKeyDown} aria-busy=${
            this.submitting ? 'true' : 'false'
          }>
            <md-filled-text-field
              label="Email"
              type="email"
              autocomplete="username"
              inputmode="email"
              spellcheck="false"
              .value=${this.email}
              ?disabled=${this.submitting}
              @input=${this.handleEmailInput}
            ></md-filled-text-field>

            <md-filled-text-field
              label="Password"
              type="password"
              autocomplete="current-password"
              .value=${this.password}
              ?disabled=${this.submitting}
              @input=${this.handlePasswordInput}
            ></md-filled-text-field>

            ${this.errorMessage
              ? html`<p class="error" role="alert" aria-live="assertive">${this.errorMessage}</p>`
              : nothing}

            <div class="actions">
              <md-filled-button
                type="submit"
                ?disabled=${this.submitting || !canSubmit}
                @click=${this.submit}
              >
                ${this.submitting ? 'Signing in…' : 'Sign in'}
              </md-filled-button>
            </div>
          </form>
        </scout-panel>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--scout-on-surface);
    }

    .page {
      min-height: 100svh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    scout-panel {
      width: min(520px, 100%);
    }

    .form {
      display: grid;
      gap: 14px;
    }

    md-filled-text-field {
      width: 100%;
    }

    .error {
      margin: 0;
      padding: 12px 14px;
      border-radius: 16px;
      background: var(--scout-secondary-container);
      color: var(--scout-on-secondary-container);
      line-height: 1.5;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 6px;
    }
  `;
}

function getFriendlyAuthErrorMessage(error: unknown): string {
  const { code } = error as FirebaseAuthError;

  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    default:
      return 'Sign in failed. Please try again.';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scout-login-page': ScoutLoginPage;
  }
}
