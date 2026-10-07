/* ASSET landing: progressive navigation, illustrative demo and contact form. */
(() => {
  "use strict";
  const menu = document.querySelector(".main-nav");
  const menuButton = document.querySelector(".menu-toggle");
  const dialog = document.querySelector(".demo-dialog");
  let previousOverflow = "";
  let demoTrigger = null;
  const menuIcon = menuButton.innerHTML;
  const closeIcon = dialog.querySelector("[data-close-demo]").innerHTML;
  document
    .querySelector(".brand-link")
    .addEventListener("click", () => setMenu(false));

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menuButton.innerHTML = open ? closeIcon : menuIcon;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document
    .querySelector(".site-header")
    .addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        menuButton.focus();
      }
    });
  document.addEventListener("click", (event) => {
    if (
      !event.composedPath().includes(document.querySelector(".site-header")) &&
      menu.classList.contains("is-open")
    )
      setMenu(false);
  });
  window
    .matchMedia("(min-width: 1001px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });

  const moduleNames = ["overview", "assets", "maintenance", "reports"];
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  const controllers = [];
  document.querySelectorAll("[data-preview]").forEach((preview) => {
    const panel = preview.querySelector('[role="tabpanel"]');
    const tabs = [...preview.querySelectorAll('[role="tab"]')];
    const state = { active: "overview", query: "", completed: new Set() };

    function filterAssets() {
      const rows = [...panel.querySelectorAll(".asset-row")];
      let matches = 0;
      rows.forEach((row) => {
        const match = normalize(row.querySelector("div").textContent).includes(
          normalize(state.query),
        );
        row.hidden = !match;
        if (match) matches += 1;
      });
      panel.querySelector(".result-count").textContent =
        `${matches} de ${rows.length} activos de ejemplo`;
      let empty = panel.querySelector(".empty-state");
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML =
          '<strong>No encontramos ese activo</strong><p>Prueba con otro nombre, código o ubicación.</p><button type="button" class="text-button" data-clear-search>Limpiar búsqueda</button>';
        panel.querySelector(".asset-list").append(empty);
      }
      empty.hidden = matches !== 0;
    }

    function updateTasks() {
      const pending = 3 - state.completed.size;
      panel.querySelector(".maintenance-summary strong").textContent = pending
        ? `${pending} tareas por completar`
        : "¡Todo al día!";
      panel.querySelectorAll(".maintenance-row").forEach((row, index) => {
        const complete = state.completed.has(index);
        row.classList.toggle("is-complete", complete);
        const button = row.querySelector("button");
        button.dataset.task = String(index);
        button.setAttribute("aria-pressed", String(complete));
        button.setAttribute(
          "aria-label",
          `${complete ? "Reabrir" : "Completar"}: ${row.querySelector("strong").textContent}`,
        );
        button.textContent = complete ? "✓" : "";
        const status = row.querySelector(".status");
        status.className = `status ${complete ? "green" : index === 0 ? "amber" : "neutral"}`;
        status.textContent = complete
          ? "Lista"
          : ["Hoy", "Mañana", "Esta semana"][index];
      });
    }

    function render() {
      panel.replaceChildren(
        document
          .querySelector(`#module-${state.active}`)
          .content.cloneNode(true),
      );
      panel.querySelectorAll("svg").forEach((svg) => {
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
      });
      tabs.forEach((tab) => {
        const active = tab.dataset.module === state.active;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panel.setAttribute(
        "aria-labelledby",
        tabs.find((tab) => tab.dataset.module === state.active).id,
      );
      if (state.active === "overview") {
        panel.querySelector(
          ".metric:nth-child(2) strong",
        ).firstChild.textContent = String(3 - state.completed.size);
        const status = panel.querySelector(".preview-task .status");
        status.textContent = state.completed.has(0) ? "Completado" : "Hoy";
        status.className = `status ${state.completed.has(0) ? "green" : "amber"}`;
      } else if (state.active === "assets") {
        panel.querySelector("input").value = state.query;
        filterAssets();
      } else if (state.active === "maintenance") updateTasks();
      else
        panel.querySelector(
          ".report-totals > div:nth-child(2) strong",
        ).textContent = `${state.completed.size} de 3`;
    }
    preview.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-module]");
      if (tab) {
        state.active = tab.dataset.module;
        render();
      }
      const task = event.target.closest("[data-task]");
      if (task) {
        const index = Number(task.dataset.task);
        if (state.completed.has(index)) state.completed.delete(index);
        else state.completed.add(index);
        updateTasks();
      }
      if (event.target.closest("[data-clear-search]")) {
        state.query = "";
        const input = panel.querySelector("input");
        input.value = "";
        filterAssets();
        input.focus();
      }
    });
    preview.addEventListener("input", (event) => {
      if (event.target.matches(".asset-search input")) {
        state.query = event.target.value;
        filterAssets();
      }
    });
    preview.addEventListener("keydown", (event) => {
      const current = tabs.indexOf(event.target);
      if (current === -1) return;
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key)
        ? 1
        : ["ArrowLeft", "ArrowUp"].includes(event.key)
          ? -1
          : 0;
      if (!direction && !["Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (current + direction + tabs.length) % tabs.length;
      state.active = moduleNames[next];
      render();
      tabs[next].focus();
    });
    controllers.push({
      preview,
      reset() {
        state.active = "overview";
        state.query = "";
        state.completed.clear();
        render();
      },
    });
    render();
  });

  document.querySelectorAll("[data-open-demo]").forEach((button) =>
    button.addEventListener("click", () => {
      if (dialog.open) return;
      demoTrigger = button;
      setMenu(false);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
    }),
  );
  document
    .querySelectorAll("[data-close-demo]")
    .forEach((button) =>
      button.addEventListener("click", () => dialog.close()),
    );
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = previousOverflow;
    controllers
      .filter((controller) => dialog.contains(controller.preview))
      .forEach((controller) => controller.reset());
    demoTrigger?.focus({ preventScroll: true });
  });

  // Keep the native POST as a no-JavaScript fallback. Confirm success only from
  // FormSubmit's JSON response; errors preserve the visitor's input for retry.
  const form = document.querySelector("#contactForm");
  if ("IntersectionObserver" in window) {
    const callbackLink = document.querySelector(".whatsapp-float");
    const contactVisibility = new IntersectionObserver(([entry]) => {
      callbackLink.hidden = entry.isIntersecting;
    });
    contactVisibility.observe(form);
  }
  const phone = form.elements.telefono;
  phone.addEventListener("input", () => {
    const normalized = phone.value.replace(/[\s().-]/g, "");
    if (normalized !== phone.value) phone.value = normalized;
  });
  document.querySelectorAll("[data-request-contact]").forEach((link) => {
    link.addEventListener("click", () => {
      form.elements.origen.value = link.dataset.requestContact;
      if (link.dataset.plan) form.elements.plan.value = link.dataset.plan;
      if (link.dataset.interest)
        form.elements.interes.value = link.dataset.interest;
      else if (link.dataset.plan)
        form.elements.interes.value = "La plataforma ASSET";
      const focusName = () =>
        form.elements.nombre.focus({ preventScroll: true });
      if (link.closest("dialog"))
        dialog.addEventListener("close", focusName, { once: true });
      else window.setTimeout(focusName, 0);
    });
  });
  const submitButton = form.querySelector('[type="submit"]');
  const formStatus = document.querySelector("#formStatus");
  let submitting = false;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    if (form.elements._honey.value) return;
    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = "Enviando solicitud…";
    form.setAttribute("aria-busy", "true");
    formStatus.hidden = false;
    formStatus.dataset.state = "pending";
    formStatus.textContent = "Estamos enviando tu solicitud.";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const endpoint = new URL(form.action);
      endpoint.pathname = "/ajax" + endpoint.pathname;
      const lead = Object.fromEntries(new FormData(form));
      lead.nombre = lead.nombre.trim();
      lead.whatsapp_contacto = "https://wa.me/" + lead.telefono.slice(1);
      if (!lead.email) delete lead.email;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(lead),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission rejected");
      const result = await response.json();
      if (result.success !== true && result.success !== "true")
        throw new Error("Submission unconfirmed");
      formStatus.dataset.state = "success";
      formStatus.textContent =
        "Solicitud recibida. El equipo de ASSET te contactará por WhatsApp para atender tu consulta.";
      form.reset();
    } catch {
      formStatus.dataset.state = "error";
      formStatus.textContent =
        "No pudimos confirmar el envío. Tus datos siguen aquí: vuelve a intentarlo en unos momentos.";
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      submitButton.textContent = "Quiero que me contacten";
      form.removeAttribute("aria-busy");
    }
  });
})();

/* Enhance the platform tour; all modules remain readable without JavaScript. */
(() => {
  const tablist = document.querySelector(".product-tabs");
  if (!tablist) return;
  const tabs = [...tablist.querySelectorAll("[data-product-tab]")];
  const panels = [...document.querySelectorAll("[data-product-panel]")];
  tablist.hidden = false;
  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", tab.dataset.productTab);
  });
  panels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-" + panel.id);
    panel.tabIndex = 0;
  });
  function select(id, focus = false) {
    tabs.forEach((tab) => {
      const active = tab.dataset.productTab === id;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== id;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab.dataset.productTab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft")
        next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        select(tabs[next].dataset.productTab, true);
      }
    });
  });
  function selectHash() {
    const id = location.hash.slice(1);
    if (!panels.some((panel) => panel.id === id)) return;
    select(id);
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "instant", block: "start" });
  }
  select(tabs[0].dataset.productTab);
  selectHash();
  window.addEventListener("hashchange", selectHash);
})();
