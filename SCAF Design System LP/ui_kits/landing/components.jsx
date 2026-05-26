/* @jsxRuntime classic @jsx React.createElement */

// SCAF Landing UI Kit — small composable JSX components.
// Cosmetic only; no real state. Drop into a page with React + Babel.

const Eyebrow = ({ children, color }) => (
  <span className="dsk-eyebrow" style={color ? { color } : null}>{children}</span>
);

const Button = ({ children, variant = "primary", size = "md", icon, href = "#", ...rest }) => {
  const cls = `dsk-btn dsk-btn-${variant} dsk-btn-${size}`;
  return (
    <a href={href} className={cls} {...rest}>
      {icon ? <span className="dsk-btn-icon">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
};

const Badge = ({ tone = "green", children }) => (
  <span className={`dsk-badge dsk-badge-${tone}`}>
    <span className="dsk-badge-dot"></span>
    {children}
  </span>
);

const Card = ({ children, variant = "default", className = "", style }) => (
  <div className={`dsk-card dsk-card-${variant} ${className}`} style={style}>{children}</div>
);

const PainCard = ({ icon, title, stat, children }) => (
  <Card variant="pain">
    <div className="dsk-pain-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{children}</p>
    {stat ? <span className="dsk-pain-stat">{stat}</span> : null}
  </Card>
);

const EcoCard = ({ icon, color, name, desc }) => (
  <div className="dsk-eco-card">
    <div className="dsk-eco-icon" style={{ color }}>{icon}</div>
    <div className="dsk-eco-name">{name}</div>
    <div className="dsk-eco-desc">{desc}</div>
  </div>
);

const DiffCard = ({ icon, tone = "amber", title, children, wide, highlight }) => (
  <Card variant="glass" className={`dsk-diff-card ${wide ? "dsk-wide" : ""} ${highlight ? "dsk-highlight" : ""}`}>
    <div className={`dsk-diff-icon dsk-diff-icon-${tone}`}>{icon}</div>
    <h3>{title}</h3>
    <p>{children}</p>
  </Card>
);

const TrustItem = ({ value, label }) => (
  <div className="dsk-trust-item">
    <div className="dsk-trust-num">{value}</div>
    <div className="dsk-trust-lbl">{label}</div>
  </div>
);

const KPI = ({ label, value, tone = "blue" }) => (
  <div className="mock-kpi">
    <div className="mock-kpi-label">{label}</div>
    <div className={`mock-kpi-value ${tone}`}>{value}</div>
  </div>
);

const MockFrame = ({ title, children, sidebar = true }) => (
  <div className="mockup-frame">
    <div className="mockup-titlebar">
      <span className="mockup-dot red"></span>
      <span className="mockup-dot yellow"></span>
      <span className="mockup-dot green"></span>
      {title ? <span className="mockup-title">{title}</span> : null}
    </div>
    <div className="mockup-body">
      {sidebar ? (
        <div className="mockup-sidebar">
          <div className="sb-item active"></div>
          <div className="sb-item"></div>
          <div className="sb-item"></div>
          <div className="sb-item"></div>
          <div className="sb-item"></div>
          <div className="sb-item"></div>
        </div>
      ) : null}
      <div className="mockup-main">{children}</div>
    </div>
  </div>
);

const StepRow = ({ n, title, children }) => (
  <div className="dsk-step">
    <div className="dsk-step-num">{n}</div>
    <div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
);

const ContactCard = ({ kind, label, value, hint, href }) => (
  <a href={href} className={`dsk-contact dsk-contact-${kind}`}>
    <div className="dsk-contact-icon">
      {kind === "wa" ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      )}
    </div>
    <div className="dsk-contact-text">
      <span className="dsk-contact-label">{label}</span>
      <span className="dsk-contact-value">{value}</span>
      <span className="dsk-contact-hint">{hint}</span>
    </div>
  </a>
);

const Nav = ({ active }) => (
  <nav className="dsk-nav">
    <div className="dsk-nav-inner">
      <span className="dsk-logo">SC<span className="dsk-logo-accent">AF</span></span>
      <ul className="dsk-nav-links">
        <li><a href="#funcionalidades" className={active === "func" ? "active" : ""}>Funcionalidades</a></li>
        <li><a href="#ecosistema" className={active === "eco" ? "active" : ""}>Ecosistema</a></li>
        <li><a href="#diferenciadores" className={active === "diff" ? "active" : ""}>Diferenciadores</a></li>
        <li><a href="#planes" className={active === "plans" ? "active" : ""}>Planes</a></li>
        <li><a href="#contacto" className={active === "cnt" ? "active" : ""}>Contacto</a></li>
      </ul>
      <div className="dsk-nav-cta">
        <Button variant="primary" size="sm">Solicitar Demo</Button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="dsk-footer">
    <div className="dsk-container">
      <div className="dsk-footer-grid">
        <div className="dsk-footer-brand">
          <span className="dsk-logo">SC<span className="dsk-logo-accent">AF</span></span>
          <p>Sistema de Control de Activos Fijos. Plataforma ERP para gestión integral de inventario, mantenimiento preventivo, personal y operaciones.</p>
        </div>
        <div className="dsk-footer-col">
          <h4>Plataforma</h4>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#ecosistema">Ecosistema</a>
          <a href="#diferenciadores">Diferenciadores</a>
          <a href="#planes">Planes</a>
          <a href="#contacto">Solicitar Demo</a>
        </div>
        <div className="dsk-footer-col">
          <h4>Contacto directo</h4>
          <a href="https://wa.me/584124982079">+58 412-498-2079</a>
          <a href="mailto:info@scaf.app">info@scaf.app</a>
        </div>
      </div>
      <div className="dsk-footer-bottom">
        <p>&copy; 2026 SCAF. Todos los derechos reservados.</p>
        <p>Hecho con precisión.</p>
      </div>
    </div>
  </footer>
);

Object.assign(window, {
  Eyebrow, Button, Badge, Card, PainCard, EcoCard, DiffCard,
  TrustItem, KPI, MockFrame, StepRow, ContactCard, Nav, Footer
});
