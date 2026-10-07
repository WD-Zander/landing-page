"use strict";

const PROVIDER = "https://formsubmit.co/ajax/Zanderjosue05@gmail.com";
const SITE = "https://getsmcaf.com";
const CONSENT = "Autorizo a ASSET a contactarme por WhatsApp para atender esta solicitud";
const LIMITS = {
  nombre: 200, telefono: 24, email: 200, empresa: 200,
  plan: 80, interes: 100, mensaje: 3000, origen: 200,
  autorizacion_contacto: 120, _honey: 200,
};
const MESSAGES = {
  invalid: "Revisa tu nombre, WhatsApp con código de país, correo y autorización de contacto.",
  unavailable: "El servicio de envío no está disponible en este momento. Tus datos siguen aquí; inténtalo más tarde.",
  timeout: "El servicio está tardando más de lo esperado. No pudimos confirmar el envío. Conservamos tus datos para que puedas reintentar.",
  rejected: "El servicio no confirmó la solicitud. Conservamos tus datos; inténtalo más tarde.",
  rate_limited: "Espera unos minutos antes de volver a enviar tu solicitud. Tus datos siguen aquí.",
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

function reply(req, res, status, code, fields = {}) {
  const success = code === "sent";
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const message = success
    ? "El equipo de ASSET te contactará por WhatsApp. No necesitas enviarnos otro mensaje."
    : MESSAGES[code] || "No se pudo procesar esta solicitud.";
  if (!String(req.headers.accept || "").includes("text/html")) {
    return res.status(status).json({ success, code, message });
  }
  // Native forms use the same delivery path, without putting personal data in URLs.
  const inputs = Object.entries(fields).map(([name, value]) =>
    `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(value)}">`,
  ).join("");
  const retry = !success && (status >= 500 || status === 429)
    ? `<form action="/api/contact" method="post">${inputs}<button type="submit">Reintentar envío</button></form>`
    : "";
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
  return res.status(status).send(`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Solicitud de contacto | ASSET</title><style>body{margin:0;background:#f4f7fb;color:#172b45;font:16px/1.6 system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}main{background:white;padding:clamp(24px,6vw,56px);margin:24px;max-width:520px;border:1px solid #dbe4f0;border-radius:20px}strong{color:#2563eb}h1{font-size:28px;line-height:1.25}button,a{font:inherit}button{border:0;background:#2563eb;color:white;border-radius:8px;padding:12px 20px;cursor:pointer;margin:8px 0 24px}a{color:#1d4ed8}</style><main><strong>ASSET</strong><h1>${success ? "Tu solicitud ya está enviada" : "No pudimos confirmar el envío"}</h1><p>${escapeHtml(message)}</p>${retry}<a href="/">Volver a ASSET</a>${!success ? "<p>También puedes volver con el botón Atrás de tu navegador para revisar lo escrito.</p>" : ""}</main></html>`);
}

module.exports = async function contact(req, res) {
  // Read-only diagnostics: check provider connectivity without submitting a lead.
  if (req.method === "HEAD") {
    res.setHeader("Cache-Control", "no-store");
    try {
      const response = await fetch(PROVIDER, {
        method: "OPTIONS",
        headers: { Origin: SITE, "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type" },
        redirect: "manual", signal: AbortSignal.timeout(8000),
      });
      res.setHeader("X-ASSET-Provider-Status", String(response.status));
      res.setHeader("X-ASSET-Delivery", response.ok ? "reachable" : "unavailable");
      return res.status(response.ok ? 200 : 503).send("");
    } catch (error) {
      const code = error.cause?.code;
      res.setHeader("X-ASSET-Delivery", "unavailable");
      res.setHeader("X-ASSET-Provider-Error", ["ENOTFOUND", "EAI_AGAIN", "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT"].includes(code) ? code : error.name === "TimeoutError" ? "ETIMEDOUT" : "NETWORK_ERROR");
      return res.status(503).send("");
    }
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, HEAD");
    return reply(req, res, 405, "method_not_allowed");
  }
  const allowedOrigins = new Set([SITE, "https://www.getsmcaf.com"]);
  for (const hostname of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
    if (hostname) allowedOrigins.add(`https://${hostname}`);
  }
  if (process.env.VERCEL_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }
  if (req.headers.origin && !allowedOrigins.has(req.headers.origin)) {
    return reply(req, res, 403, "origin_not_allowed");
  }
  if (Number(req.headers["content-length"]) > 16384) return reply(req, res, 413, "too_large");
  const contentType = String(req.headers["content-type"] || "").split(";")[0].trim();
  if (!["application/json", "application/x-www-form-urlencoded"].includes(contentType)) {
    return reply(req, res, 415, "unsupported_type");
  }
  let fields;
  try {
    let body = req.body;
    if (typeof body === "string") body = contentType === "application/json"
      ? JSON.parse(body) : Object.fromEntries(new URLSearchParams(body));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
    if (Buffer.byteLength(JSON.stringify(body), "utf8") > 16384) return reply(req, res, 413, "too_large");
    fields = {};
    for (const [name, maxLength] of Object.entries(LIMITS)) {
      const value = body[name] ?? "";
      if (typeof value !== "string" || value.length > maxLength) throw new Error("Invalid field");
      fields[name] = value.trim();
    }
  } catch {
    return reply(req, res, 400, "invalid");
  }
  if (fields._honey) return reply(req, res, 400, "invalid");
  fields.telefono = fields.telefono.replace(/[\s().-]/g, "");
  if (!fields.nombre || !/^\+[1-9]\d{7,14}$/.test(fields.telefono)
    || fields.autorizacion_contacto !== CONSENT
    || (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))) {
    return reply(req, res, 400, "invalid", fields);
  }
  // Only these fields are forwarded. Client input cannot alter the recipient,
  // subject, webhook, redirect or any other provider control.
  const lead = {
    nombre: fields.nombre, telefono: fields.telefono,
    empresa: fields.empresa, plan: fields.plan, interes: fields.interes,
    mensaje: fields.mensaje, origen: fields.origen,
    autorizacion_contacto: CONSENT, canal_preferido: "WhatsApp",
    whatsapp_contacto: "https://wa.me/" + fields.telefono.slice(1),
    _subject: "Nueva solicitud de contacto — ASSET",
    _template: "table", _captcha: "false", _url: SITE + "/",
  };
  if (fields.email) lead.email = fields.email;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(PROVIDER, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: SITE + "/" },
      body: JSON.stringify(lead), signal: controller.signal,
      redirect: "error",
    });
    if (!response.ok) {
      console.warn("ASSET contact: provider HTTP", response.status);
      if (response.status === 429) res.setHeader("Retry-After", "60");
      return reply(req, res, response.status === 429 ? 429 : 502,
        response.status === 429 ? "rate_limited" : "unavailable", fields);
    }
    const result = await response.json();
    if (result.success !== true && result.success !== "true") {
      console.warn("ASSET contact: provider did not confirm delivery");
      return reply(req, res, 502, "rejected", fields);
    }
    return reply(req, res, 200, "sent");
  } catch {
    const timedOut = controller.signal.aborted;
    // Never log the submitted data or the provider's potentially personal response.
    console.warn("ASSET contact:", timedOut ? "provider timeout" : "provider unavailable");
    return reply(req, res, timedOut ? 504 : 502, timedOut ? "timeout" : "unavailable", fields);
  } finally {
    clearTimeout(timeout);
  }
};
