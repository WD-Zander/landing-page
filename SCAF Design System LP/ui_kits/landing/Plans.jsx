/* @jsxRuntime classic @jsx React.createElement */

// SCAF Pricing — pulled from PAQUETES_COMERCIALES.md.
// Summary on the surface, full detail hidden behind a "Ver detalle" toggle
// (per user note: "agregarlos a Lp pero No de manera tan detallada .. solo
// que se vea el detalle si el cliente quiere verlo").

const PLANS = [
  {
    id: "basico",
    name: "Básico",
    ideal: "Talleres, ferreterías, comercios con 1–5 empleados",
    arranque: 350,
    mensual: 25,
    usuarios: 3,
    sucursales: 1,
    extra: "$5 / usuario extra",
    headline: [
      "3 usuarios incluidos, 1 sucursal",
      "Todos los módulos incluidos",
      "Soporte por email · 72h hábiles",
      "Actualizaciones menores",
    ],
    detail: {
      Arranque: [
        "Instalación remota incluida",
        "Configuración de roles y permisos iniciales",
        "1 sesión de capacitación (1h por videollamada)",
        "Configuración de categorías y ubicaciones base",
      ],
      Mensualidad: [
        "Actualizaciones de seguridad y bugfixes",
        "Asistencia remota ante fallos de software",
        "$5/mes por cada usuario adicional",
      ],
      "No incluye": [
        "Carga inicial de datos / migración",
        "Configuración de backups",
        "Soporte fuera de horario laboral",
      ],
    },
  },
  {
    id: "profesional",
    featured: true,
    name: "Profesional",
    ideal: "Empresas medianas, fábricas, clínicas con 5–20 empleados",
    arranque: 700,
    mensual: 50,
    usuarios: 10,
    sucursales: 3,
    extra: "$4 / usuario extra",
    headline: [
      "10 usuarios incluidos, hasta 3 sucursales",
      "Carga inicial desde Excel · 500 registros",
      "Soporte email + WhatsApp · 24h hábiles",
      "Todas las actualizaciones, incluidas versiones mayores",
      "Revisión trimestral de rendimiento",
    ],
    detail: {
      Arranque: [
        "Todo lo del plan Básico",
        "Carga inicial de datos desde Excel (hasta 500 registros)",
        "Configuración completa de roles, permisos, categorías, ubicaciones y proveedores",
        "2 sesiones de capacitación (2h cada una): administradores y operadores",
        "Configuración de hasta 3 sucursales",
      ],
      Mensualidad: [
        "Parches, correcciones y versiones mayores",
        "Asistencia remota + revisión trimestral",
        "$4/mes por cada usuario adicional",
      ],
      "No incluye": [
        "Backups automáticos (servicio adicional)",
        "Desarrollo a medida",
        "Integraciones con otros sistemas",
      ],
    },
  },
  {
    id: "corporativo",
    name: "Corporativo",
    ideal: "Corporativos, múltiples sedes, instituciones",
    arranque: 1500,
    mensual: 90,
    usuarios: 25,
    sucursales: "Ilimitadas",
    extra: "$3 / usuario extra",
    headline: [
      "25 usuarios incluidos, sucursales ilimitadas",
      "Migración asistida desde software anterior",
      "Soporte dedicado · 8h hábiles · llamadas",
      "Acceso anticipado a nuevos módulos",
      "1 reporte personalizado + backup automático",
    ],
    detail: {
      Arranque: [
        "Todo lo del plan Profesional",
        "Migración desde sistema anterior (si aplica)",
        "Carga de datos hasta 2,000 registros",
        "3 sesiones de capacitación (6h total) + material grabado",
        "Configuración de sucursales ilimitadas con jerarquía",
        "Auditoría de permisos y seguridad post-instalación",
      ],
      Mensualidad: [
        "Todas las actualizaciones + nuevos módulos",
        "Revisión mensual + optimización de BD",
        "$3/mes por cada usuario adicional",
      ],
      "No incluye": [
        "Desarrollo de módulos exclusivos",
        "Integraciones complejas con ERP/contabilidad",
        "Soporte presencial recurrente",
      ],
    },
  },
];

const PlanCard = ({ plan }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`dsk-plan ${plan.featured ? "featured" : ""}`}>
      <div className="dsk-plan-eyebrow">{plan.featured ? "Más vendido" : "Plan"}</div>
      <h3 className="dsk-plan-name">{plan.name}</h3>
      <p className="dsk-plan-ideal">{plan.ideal}</p>

      <div className="dsk-plan-price">
        <span className="cur">$</span>
        <span className="num">{plan.arranque.toLocaleString("en-US")}</span>
        <span className="cur">USD</span>
      </div>
      <div className="dsk-plan-cycle">Arranque · pago único</div>

      <div className="dsk-plan-mensual">
        <span className="num">${plan.mensual}</span>
        <span className="lbl">/mes · {plan.usuarios} usuarios incluidos · {plan.extra}</span>
      </div>

      <ul className="dsk-plan-feats">
        {plan.headline.map((h, i) => <li key={i}>{h}</li>)}
      </ul>

      <Button variant={plan.featured ? "primary" : "secondary"} size="sm">Solicitar este plan</Button>

      <button className="dsk-plan-detail-toggle" onClick={() => setOpen(o => !o)}>
        {open ? "↑ Ocultar detalle" : "↓ Ver detalle completo"}
      </button>
      <div className={`dsk-plan-detail ${open ? "open" : ""}`}>
        {Object.entries(plan.detail).map(([sec, lines]) => (
          <div key={sec} style={{ marginBottom: 10 }}>
            <h5>{sec}</h5>
            <ul>{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Plans = () => (
  <section className="dsk-section" id="planes">
    <div className="dsk-container">
      <div className="dsk-section-header">
        <Eyebrow>Planes</Eyebrow>
        <h2>Un arranque, una mensualidad, todos los módulos.</h2>
        <p>Sin restricciones funcionales. Pagas por escala (usuarios, sucursales) y nivel de atención, no por funcionalidad.</p>
      </div>
      <div className="dsk-plans-grid">
        {PLANS.map(p => <PlanCard key={p.id} plan={p} />)}
      </div>
      <p style={{ textAlign: "center", marginTop: 28, fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        Modelo on-premise · Pago único de arranque + suscripción mensual · Todos los módulos incluidos
      </p>
    </div>
  </section>
);

Object.assign(window, { Plans, PlanCard, PLANS });
