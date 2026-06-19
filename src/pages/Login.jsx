import ThemeToggle from '../components/ThemeToggle';
import LoginForm from '../components/LoginForm';

export default function Login({ theme, onThemeChange }) {
  return (
    <main className="login-page">
      <div className="login-page__shell">
        <section className="branding-panel" aria-label="Branding area">
          <div className="branding-panel__decor branding-panel__decor--one" aria-hidden="true" />
          <div className="branding-panel__decor branding-panel__decor--two" aria-hidden="true" />
          <div className="branding-panel__decor branding-panel__decor--three" aria-hidden="true" />
          <div className="branding-panel__grid" aria-hidden="true" />

          <div className="branding-panel__content">
            <div className="branding-panel__placeholders">
              <div className="placeholder-box placeholder-box--logo" aria-hidden="true" />
              <div className="placeholder-box placeholder-box--name" aria-hidden="true" />
            </div>
            <p className="branding-panel__tagline">Track and organize your investments with confidence.</p>

            <div className="branding-panel__visuals" aria-hidden="true">
              <div className="market-visual market-visual--chart">
                <svg viewBox="0 0 320 180" role="presentation" focusable="false">
                  <defs>
                    <linearGradient id="chartGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(34,197,94,0.95)" />
                      <stop offset="100%" stopColor="rgba(96,165,250,0.85)" />
                    </linearGradient>
                  </defs>
                  <rect x="18" y="18" width="284" height="144" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
                  <path d="M40 132H280" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
                  <path d="M52 122L84 104L114 118L146 82L178 92L210 63L244 74L272 42" fill="none" stroke="url(#chartGlow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <g fill="rgba(34,197,94,0.9)">
                    <rect x="74" y="92" width="10" height="40" rx="5" />
                    <rect x="126" y="70" width="10" height="62" rx="5" />
                    <rect x="168" y="80" width="10" height="52" rx="5" />
                    <rect x="226" y="52" width="10" height="80" rx="5" />
                  </g>
                  <g stroke="rgba(255,255,255,0.4)" strokeLinecap="round">
                    <path d="M79 84v14" />
                    <path d="M131 58v22" />
                    <path d="M173 68v18" />
                    <path d="M231 40v12" />
                  </g>
                  <circle cx="272" cy="42" r="7" fill="white" />
                </svg>
              </div>

              <div className="market-visual market-visual--mini">
                <svg viewBox="0 0 240 140" role="presentation" focusable="false">
                  <rect x="10" y="10" width="220" height="120" rx="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                  <path d="M28 104H214" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <path d="M28 88C48 72 61 96 77 70C91 48 109 58 121 52C136 44 150 28 168 34C187 40 196 58 212 36" fill="none" stroke="rgba(96,165,250,0.95)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="212" cy="36" r="6" fill="rgba(34,197,94,0.95)" />
                  <text x="28" y="40" fill="rgba(248,250,252,0.9)" fontSize="16" fontWeight="700">Portfolio Pulse</text>
                  <text x="28" y="60" fill="rgba(148,163,184,0.95)" fontSize="11" fontWeight="600">Balanced gains across sectors</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel" aria-label="Authentication area">
          <div className="auth-panel__topbar">
            <ThemeToggle theme={theme} onToggle={onThemeChange} />
          </div>

          <div className="auth-panel__content">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}