/* Felorost - interaktywna mapa polityczna (wersja 1.0) */
(function () {
  "use strict";

  const DATA = window.FELOROST;
  const NS = "http://www.w3.org/2000/svg";
  const W = DATA.meta.width;
  const H = DATA.meta.height;

  const app = document.getElementById("app");
  const viewport = document.getElementById("viewport");
  const world = document.getElementById("world");
  const svg = document.getElementById("map");
  const tooltip = document.getElementById("tooltip");
  const panel = document.getElementById("panel");
  const panelContent = document.getElementById("panel-content");
  const panelClose = document.getElementById("panel-close");
  const loading = document.getElementById("loading");
  const hint = document.getElementById("hint");
  const zoomLabel = document.getElementById("zoom-label");

  const terrainImage = document.getElementById("terrain-image");
  const landSilhouette = document.getElementById("land-silhouette");
  const statesLayer = document.getElementById("states-layer");
  const coastLayer = document.getElementById("coast-layer");
  const duchiesLayer = document.getElementById("duchies-layer");
  const volcanoLayer = document.getElementById("volcano-layer");
  const terrainLabelsLayer = document.getElementById("terrain-labels-layer");
  const stateLabelsLayer = document.getElementById("state-labels-layer");
  const duchyLabelsLayer = document.getElementById("duchy-labels-layer");
  const seaLabelsLayer = document.getElementById("sea-labels-layer");

  const stateById = new Map(DATA.states.map((s) => [s.id, s]));
  const duchyById = new Map(DATA.duchies.map((d) => [d.id, d]));
  const stateEls = new Map();
  const duchyEls = new Map();
  const allLabels = [];

  let selected = null;
  let hovered = null;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let fitScale = 1;
  let minScale = 0.2;
  let maxScale = 4;
  let userZoomed = false;
  let drag = null;
  let pointers = new Map();
  let pinch = null;
  let moved = false;
  let suppressClick = false;
  let hintTimer = null;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v !== undefined && v !== null) node.setAttribute(k, String(v));
      }
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pathFor(g) {
    return (g.paths || []).join(" ");
  }

  /* ------------------------------------------------------------------ */
  /* SVG construction                                                    */
  /* ------------------------------------------------------------------ */

  function buildSvg() {
    // Land silhouette (visible when the terrain layer is off)
    for (const d of DATA.land) {
      el("path", { d, "fill-rule": "evenodd" }, landSilhouette);
    }

    // States: thick casing, translucent fill, coloured outline
    for (const state of DATA.states) {
      const g = el("g", {
        class: "state",
        "data-state": state.id,
        style: `--state-color:${state.color};--state-line:${state.color2}`,
      }, statesLayer);

      const d = pathFor(state);
      el("path", { class: "state-casing", d }, g);
      el("path", { class: "state-fill", d, "fill-rule": "nonzero" }, g);
      el("path", { class: "state-outline", d }, g);
      stateEls.set(state.id, g);
    }

    // Coastline: a soft glow and a crisp dark edge.
    for (const d of DATA.land) {
      el("path", { class: "coast-glow", d }, coastLayer);
      el("path", { class: "coast-line", d }, coastLayer);
    }

    // Invisible duchy hover regions inside the Crown.
    for (const duchy of DATA.duchies) {
      if (!duchy.paths || !duchy.paths.length) continue;
      const p = el("path", {
        class: "duchy-hotspot",
        d: pathFor(duchy),
        "data-duchy": duchy.id,
        "aria-label": duchy.name,
      }, duchiesLayer);
      duchyEls.set(duchy.id, p);
    }

    // Terrain labels
    for (const label of DATA.terrainLabels) {
      const parent = label.type === "water" ? seaLabelsLayer : terrainLabelsLayer;
      const node = makeText(label.text, label.x, label.y, label.size, `terrain-label ${label.type}`);
      if (label.rotate) node.setAttribute("transform", `rotate(${label.rotate} ${label.x} ${label.y})`);
      parent.appendChild(node);
    }

    // State labels
    for (const state of DATA.states) {
      const labels = state.labels && state.labels.length ? state.labels : [state.label];
      labels.forEach((pos, index) => {
        if (!pos) return;
        const size = (state.labelSize || 30) * 1.45 * (index === 0 ? 1 : 0.82);
        const lines = state.labelLines || [state.name.toUpperCase()];
        const node = makeTextLines(lines, pos.x, pos.y, size, "state-label");
        node.setAttribute("data-state", state.id);
        node.setAttribute("aria-label", state.name);
        stateLabelsLayer.appendChild(node);
      });
    }

    // Duchy labels (no internal borders — labels only)
    for (const duchy of DATA.duchies) {
      const pos = duchy.label;
      if (!pos) continue;
      const lines = duchy.labelLines || [duchy.name];
      const node = makeTextLines(lines, pos.x, pos.y, duchy.labelSize || 20, "duchy-label");
      node.setAttribute("data-duchy", duchy.id);
      node.setAttribute("aria-label", duchy.name);
      duchyLabelsLayer.appendChild(node);
    }

    // Volcano and capital markers
    if (DATA.volcano) addVolcano(DATA.volcano.x, DATA.volcano.y);
    addCapital(3420, 1805, "Tarkwinogród", "duchy", "domena");
    addCapital(4270, 1040, "Kapitol", "state", "azuria");
    addCapital(600, 1150, "Gród Siedmiu Kręgów", "state", "mythandria");
    (DATA.cities || []).forEach(addCity);

    // Keep label font sizes for zoom-aware scaling.
    document.querySelectorAll("#map text").forEach((node) => {
      if (node.classList.contains("cartouche-title") ||
          node.classList.contains("cartouche-sub") ||
          node.classList.contains("cartouche-note") ||
          node.classList.contains("compass-n") ||
          node.classList.contains("compass-s")) return;
      const size = parseFloat(node.getAttribute("font-size") || "20");
      if (Number.isFinite(size) && size > 0) {
        node.dataset.baseSize = String(size);
        allLabels.push(node);
      }
    });
  }

  function makeText(text, x, y, size, cls) {
    const node = el("text", {
      x,
      y,
      "font-size": size,
      class: cls,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    node.textContent = text;
    return node;
  }

  function makeTextLines(lines, x, y, size, cls) {
    const node = el("text", {
      x,
      y: y - (lines.length - 1) * size * 0.52,
      "font-size": size,
      class: cls,
      "text-anchor": "middle",
    });
    lines.forEach((line, i) => {
      const tspan = el("tspan", {
        x,
        dy: i === 0 ? 0 : size * 1.04,
      }, node);
      tspan.textContent = line;
    });
    return node;
  }

  function addCapital(x, y, text, kind, id, size) {
    const attrs = { class: "capital", transform: `translate(${x} ${y})` };
    if (kind === "state") attrs["data-state"] = id;
    else attrs["data-duchy"] = id;
    const g = el("g", attrs, duchyLabelsLayer);
    const star = el("path", {
      d: "M 0 -13 L 3.2 -4.2 L 12.4 -4.2 L 5.0 1.6 L 7.7 10.6 L 0 5.2 L -7.7 10.6 L -5.0 1.6 L -12.4 -4.2 L -3.2 -4.2 Z",
      fill: "#f3d58f",
      stroke: "rgba(45, 20, 10, .8)",
      "stroke-width": "1.2",
    });
    g.appendChild(star);
    const label = el("text", {
      x: 0,
      y: 30,
      "text-anchor": "middle",
      "font-size": size || 20,
      class: "capital-label",
    });
    label.textContent = text;
    g.appendChild(label);
  }

  function addCity(city) {
    const attrs = { class: "city", transform: `translate(${city.x} ${city.y})` };
    if (city.parentKind === "state") attrs["data-state"] = city.parent;
    else attrs["data-duchy"] = city.parent;
    const g = el("g", attrs, duchyLabelsLayer);
    el("path", {
      d: "M 0 -7 L 7 0 L 0 7 L -7 0 Z",
      fill: "#efd59c",
      stroke: "rgba(45, 20, 10, .85)",
      "stroke-width": "1.2",
    }, g);
    el("circle", { r: 2.1, fill: "#2a1a12" }, g);
    const label = el("text", {
      x: 0,
      y: typeof city.labelDy === "number" ? city.labelDy : 24,
      "text-anchor": "middle",
      "font-size": 17,
      class: "city-label",
    });
    label.textContent = city.name;
    g.appendChild(label);
  }

  function addVolcano(x, y) {
    if (!volcanoLayer) return;
    const g = el("g", { class: "volcano-icon", transform: `translate(${x} ${y})` }, volcanoLayer);
    el("path", {
      d: "M -46 26 L -18 -20 L -8 -30 L 0 -22 L 10 -32 L 20 -18 L 46 26 Z",
      fill: "#4b4038",
      stroke: "rgba(17, 14, 12, .85)",
      "stroke-width": "2",
      "stroke-linejoin": "round",
    }, g);
    el("path", {
      d: "M -14 -18 L -6 -26 L 4 -18 L 14 -27 L 22 -16 L 10 -10 L 0 -15 L -6 -8 Z",
      fill: "#6c5b4e",
    }, g);
    el("ellipse", {
      cx: 0,
      cy: -18,
      rx: 12,
      ry: 6,
      fill: "#1f1714",
      stroke: "rgba(20, 12, 9, .85)",
      "stroke-width": "1.5",
    }, g);
    el("ellipse", { cx: 0, cy: -17, rx: 7, ry: 3.2, fill: "#d06135" }, g);
    el("path", {
      d: "M -3 -27 C -14 -42 4 -48 -4 -64 C -12 -78 6 -82 2 -96",
      fill: "none",
      stroke: "rgba(224, 210, 186, .35)",
      "stroke-width": "4",
      "stroke-linecap": "round",
    }, g);
    el("path", {
      d: "M 14 -26 C 6 -40 22 -48 15 -62 C 10 -72 22 -78 19 -88",
      fill: "none",
      stroke: "rgba(224, 210, 186, .22)",
      "stroke-width": "3",
      "stroke-linecap": "round",
    }, g);
  }

  /* ------------------------------------------------------------------ */
  /* Hover / tooltip                                                     */
  /* ------------------------------------------------------------------ */

  function updateTooltipPosition(x, y) {
    const pad = 12;
    const w = tooltip.offsetWidth || 180;
    const h = tooltip.offsetHeight || 50;
    const cx = clamp(x, w / 2 + pad, window.innerWidth - w / 2 - pad);
    const cy = clamp(y, h + 26, window.innerHeight - pad);
    tooltip.style.left = cx + "px";
    tooltip.style.top = cy + "px";
  }

  function showTooltip(kind, item, x, y) {
    if (kind === "state") {
      tooltip.innerHTML =
        `<span class="tt-kicker">${escapeHtml(item.type || "Państwo")}</span>` +
        `<span class="tt-name">${escapeHtml(item.name)}</span>`;
    } else {
      const parent = stateById.get(item.parent);
      tooltip.innerHTML =
        `<span class="tt-kicker">Księstwo Korony</span>` +
        `<span class="tt-name">${escapeHtml(item.name)}</span>` +
        (parent ? `<span class="tt-parent">${escapeHtml(parent.name)}</span>` : "");
    }
    updateTooltipPosition(x, y);
    tooltip.classList.add("is-visible");
  }

  function clearHover() {
    hovered = null;
    tooltip.classList.remove("is-visible");
    document.querySelectorAll(".state.is-hover").forEach((n) => n.classList.remove("is-hover"));
    document.querySelectorAll(".duchy-hotspot.is-hover").forEach((n) => n.classList.remove("is-hover"));
  }

  function setHover(kind, id, x, y) {
    const key = kind + ":" + id;
    if (hovered === key) {
      if (kind === "state") showTooltip("state", stateById.get(id), x, y);
      else showTooltip("duchy", duchyById.get(id), x, y);
      return;
    }
    clearHover();
    hovered = key;
    if (kind === "state") {
      const g = stateEls.get(id);
      if (g) g.classList.add("is-hover");
      showTooltip("state", stateById.get(id), x, y);
    } else {
      const p = duchyEls.get(id);
      if (p) p.classList.add("is-hover");
      showTooltip("duchy", duchyById.get(id), x, y);
    }
  }

  function pickTarget(x, y) {
    const node = document.elementFromPoint(x, y);
    if (!node) return null;
    const stateNode = node.closest ? node.closest("[data-state]") : null;
    if (stateNode) {
      return { kind: "state", id: stateNode.getAttribute("data-state") };
    }
    const duchyNode = node.closest ? node.closest("[data-duchy]") : null;
    if (duchyNode) return { kind: "duchy", id: duchyNode.getAttribute("data-duchy") };
    return null;
  }

  function handlePointerMoveHover(e) {
    if (e.pointerType === "touch" || drag || pinch) return;
    const target = pickTarget(e.clientX, e.clientY);
    if (!target) {
      clearHover();
      return;
    }
    setHover(target.kind, target.id, e.clientX, e.clientY);
  }

  /* ------------------------------------------------------------------ */
  /* Selection / panel                                                   */
  /* ------------------------------------------------------------------ */

  function clearSelection() {
    selected = null;
    document.querySelectorAll(".state.is-selected").forEach((n) => n.classList.remove("is-selected"));
    document.querySelectorAll(".duchy-hotspot.is-selected").forEach((n) => n.classList.remove("is-selected"));
  }

  function select(kind, id) {
    clearHover();
    clearSelection();
    selected = { kind, id };
    if (kind === "state") {
      const g = stateEls.get(id);
      if (g) g.classList.add("is-selected");
      openState(id);
    } else {
      const p = duchyEls.get(id);
      if (p) p.classList.add("is-selected");
      openDuchy(id);
    }
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    clearSelection();
  }

  function linkButtons(item) {
    const out = [];
    if (item.wiki) {
      out.push(`<a class="link-btn" href="${escapeHtml(item.wiki)}" target="_blank" rel="noopener">Wiki</a>`);
    }
    const wikiEntryBase = window.FELOROST_WIKI_ENTRY || "opisy.html#";
    out.push(`<a class="link-btn is-quiet" href="${escapeHtml(wikiEntryBase)}${encodeURIComponent(item.id)}" target="_top" rel="noopener">Pełny opis w wiki</a>`);
    return `<div class="links">${out.join("")}</div>`;
  }

  function openState(id) {
    const state = stateById.get(id);
    if (!state) return;
    const duchies = DATA.duchies.filter((d) => d.parent === id);
    let html = `
      <p class="panel-kicker">${escapeHtml(state.type || "Państwo")}</p>
      <h2>${escapeHtml(state.name)}</h2>
      <p>${escapeHtml(state.description || "")}</p>`;
    if (duchies.length) {
      html += `<div class="rule"></div><p class="panel-kicker">Księstwa Korony</p><div class="duchy-list">`;
      for (const d of duchies) {
        html += `<button type="button" data-open-duchy="${escapeHtml(d.id)}">${escapeHtml(d.name)}</button>`;
      }
      html += `</div>`;
    }
    html += linkButtons(state);
    html += `<p class="panel-note">Opis państwa.</p>`;
    panelContent.innerHTML = html;
    openPanel();
    panelContent.querySelectorAll("[data-open-duchy]").forEach((btn) => {
      btn.addEventListener("click", () => select("duchy", btn.getAttribute("data-open-duchy")));
    });
    panelContent.scrollTop = 0;
  }

  function openDuchy(id) {
    const duchy = duchyById.get(id);
    if (!duchy) return;
    const parent = stateById.get(duchy.parent);
    let html = `
      <p class="panel-kicker">Księstwo Korony</p>
      <h2>${escapeHtml(duchy.name)}</h2>`;
    if (parent) {
      html += `<p class="panel-parent">Wchodzi w skład: ${escapeHtml(parent.name)}</p>`;
    }
    html += `<p>${escapeHtml(duchy.description || "")}</p>`;
    if (parent) {
      html += `<div class="links"><button type="button" class="link-btn is-quiet" data-open-state="${escapeHtml(parent.id)}">← ${escapeHtml(parent.short || parent.name)}</button></div>`;
    }
    html += linkButtons(duchy);
    html += `<p class="panel-note">Granice wewnętrzne Korony nie są wyznaczone — widoczne są tylko nazwy księstw.</p>`;
    panelContent.innerHTML = html;
    openPanel();
    panelContent.querySelectorAll("[data-open-state]").forEach((btn) => {
      btn.addEventListener("click", () => select("state", btn.getAttribute("data-open-state")));
    });
    panelContent.scrollTop = 0;
  }

  /* ------------------------------------------------------------------ */
  /* Pan / zoom                                                          */
  /* ------------------------------------------------------------------ */

  function updateLabelScale() {
    const z = scale / fitScale;
    const f = clamp(1 / Math.pow(Math.max(0.25, z), 0.78), 0.52, 1.16);
    for (const node of allLabels) {
      const base = parseFloat(node.dataset.baseSize || "20");
      node.style.fontSize = (base * f).toFixed(2) + "px";
    }
  }

  function clampPan() {
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const w = W * scale;
    const h = H * scale;
    const margin = 70;
    if (w <= vw) tx = (vw - w) / 2;
    else tx = clamp(tx, vw - w - margin, margin);
    if (h <= vh) ty = (vh - h) / 2;
    else ty = clamp(ty, vh - h - margin, margin);
  }

  function apply(animate) {
    clampPan();
    if (animate) {
      world.classList.add("is-animating");
      window.clearTimeout(apply._timer);
      apply._timer = window.setTimeout(() => world.classList.remove("is-animating"), 360);
    } else {
      world.classList.remove("is-animating");
    }
    world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    zoomLabel.textContent = Math.round((scale / fitScale) * 100) + "%";
    updateLabelScale();
  }

  function fit(animate) {
    clearHover();
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    fitScale = Math.min(vw / W, vh / H) * 0.965;
    minScale = fitScale * 0.82;
    maxScale = Math.max(3.6, fitScale * 7.2);
    scale = fitScale;
    tx = (vw - W * scale) / 2;
    ty = (vh - H * scale) / 2;
    userZoomed = false;
    apply(animate);
  }

  function zoomAt(clientX, clientY, factor, animate) {
    clearHover();
    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const next = clamp(scale * factor, minScale, maxScale);
    if (Math.abs(next - scale) < 1e-6) return;
    const k = next / scale;
    tx = px - (px - tx) * k;
    ty = py - (py - ty) * k;
    scale = next;
    userZoomed = true;
    apply(animate);
    hideHint();
  }

  function zoomBy(factor, animate) {
    const rect = viewport.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor, animate);
  }

  function hideHint() {
    if (!hint) return;
    hint.classList.add("is-hidden");
  }

  /* ------------------------------------------------------------------ */
  /* Input                                                               */
  /* ------------------------------------------------------------------ */

  function isUiTarget(target) {
    return !!(target && target.closest && target.closest("#panel"));
  }

  function onWheel(e) {
    if (isUiTarget(e.target)) return;
    e.preventDefault();
    const factor = Math.exp(-e.deltaY * 0.00145);
    zoomAt(e.clientX, e.clientY, factor, false);
  }

  function onPointerDown(e) {
    if (isUiTarget(e.target)) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    viewport.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = false;
    suppressClick = false;

    if (pointers.size === 1) {
      drag = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
        startTx: tx,
        startTy: ty,
      };
      pinch = null;
      viewport.classList.add("is-dragging");
    } else if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      pinch = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        mx: (pts[0].x + pts[1].x) / 2,
        my: (pts[0].y + pts[1].y) / 2,
      };
      drag = null;
      moved = true;
    }
  }

  function onPointerMove(e) {
    if (!pointers.has(e.pointerId)) {
      handlePointerMoveHover(e);
      return;
    }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size >= 2) {
      const pts = Array.from(pointers.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mx = (pts[0].x + pts[1].x) / 2;
      const my = (pts[0].y + pts[1].y) / 2;
      if (pinch && pinch.dist > 0) {
        const factor = dist / pinch.dist;
        if (Math.abs(factor - 1) > 0.002) zoomAt(mx, my, factor, false);
      }
      pinch = { dist, mx, my };
      moved = true;
      clearHover();
      return;
    }

    if (drag && drag.id === e.pointerId) {
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      tx = drag.startTx + dx;
      ty = drag.startTy + dy;
      apply(false);
      if (moved) clearHover();
    }
  }

  function onPointerUp(e) {
    const wasDrag = drag;
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 1) {
      const pts = Array.from(pointers.values());
      drag = {
        id: Array.from(pointers.keys())[0],
        x: pts[0].x,
        y: pts[0].y,
        startX: pts[0].x,
        startY: pts[0].y,
        startTx: tx,
        startTy: ty,
      };
    } else if (pointers.size === 0) {
      drag = null;
      viewport.classList.remove("is-dragging");
    }

    if (!moved && wasDrag && e.pointerType !== "mouse") {
      const target = pickTarget(e.clientX, e.clientY);
      if (target) select(target.kind, target.id);
    } else if (!moved && wasDrag) {
      // Mouse click is handled by the click event to respect double-click.
    }
    suppressClick = moved;
    setTimeout(() => { suppressClick = false; }, 30);
  }

  function onPointerCancel(e) {
    pointers.delete(e.pointerId);
    if (pointers.size === 0) {
      drag = null;
      pinch = null;
      viewport.classList.remove("is-dragging");
    }
  }

  function onClick(e) {
    if (isUiTarget(e.target)) return;
    if (suppressClick || moved) {
      moved = false;
      return;
    }
    const target = pickTarget(e.clientX, e.clientY);
    if (target) {
      select(target.kind, target.id);
    } else if (panel.classList.contains("is-open")) {
      closePanel();
    }
  }

  function onDoubleClick(e) {
    if (isUiTarget(e.target)) return;
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, 1.65, true);
  }

  function onKeyDown(e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomBy(1.25, true); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomBy(0.8, true); }
    else if (e.key === "0") { e.preventDefault(); fit(true); }
    else if (e.key === "Escape") { closePanel(); clearHover(); }
  }

  /* ------------------------------------------------------------------ */
  /* Layers                                                              */
  /* ------------------------------------------------------------------ */

  function setLayer(button, appClass, on) {
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
    app.classList.toggle(appClass, !on);
    if (!on) {
      clearHover();
      if (appClass === "hide-borders") closePanel();
    }
  }

  function setupLayers() {
    const terrainBtn = document.getElementById("toggle-terrain");
    const bordersBtn = document.getElementById("toggle-borders");
    let terrainOn = true;
    let bordersOn = true;
    terrainBtn.addEventListener("click", () => {
      terrainOn = !terrainOn;
      setLayer(terrainBtn, "hide-terrain", terrainOn);
    });
    bordersBtn.addEventListener("click", () => {
      bordersOn = !bordersOn;
      setLayer(bordersBtn, "hide-borders", bordersOn);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */

  function boot() {
    if (!DATA) {
      loading.innerHTML = "<p>Brak danych mapy.</p>";
      return;
    }
    buildSvg();
    setupLayers();

    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerCancel);
    viewport.addEventListener("pointerleave", () => { if (!drag) clearHover(); });
    viewport.addEventListener("click", onClick);
    viewport.addEventListener("dblclick", onDoubleClick);
    panelClose.addEventListener("click", closePanel);
    panel.addEventListener("click", (e) => e.stopPropagation());
    panel.addEventListener("pointerdown", (e) => e.stopPropagation());
    panel.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
    panel.addEventListener("dblclick", (e) => e.stopPropagation());
    document.addEventListener("keydown", onKeyDown);

    document.getElementById("zoom-in").addEventListener("click", () => zoomBy(1.3, true));
    document.getElementById("zoom-out").addEventListener("click", () => zoomBy(0.77, true));
    document.getElementById("zoom-reset").addEventListener("click", () => fit(true));

    window.addEventListener("resize", () => {
      if (!userZoomed) fit(false);
      else {
        clampPan();
        apply(false);
      }
    });

    // Wait for the large terrain image before revealing the map.
    const preload = new Image();
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      loading.classList.add("is-hidden");
    };
    preload.onload = reveal;
    preload.onerror = reveal;
    preload.src = "assets/terrain.webp?v=4";
    window.setTimeout(reveal, 9000);
    if (terrainImage && terrainImage.complete) {
      // Some browsers report SVG image completion only after a tick.
      window.setTimeout(reveal, 120);
    }

    function applyHash() {
      const hash = decodeURIComponent((location.hash || "").replace(/^#/, ""));
      if (hash) {
        if (stateById.has(hash)) select("state", hash);
        else if (duchyById.has(hash)) select("duchy", hash);
      }
    }

    window.addEventListener("hashchange", applyHash);
    applyHash();

    // Initial fit after layout.
    requestAnimationFrame(() => {
      fit(false);
      hintTimer = window.setTimeout(hideHint, 12000);
      applyHash();
    });
  }

  boot();
})();
