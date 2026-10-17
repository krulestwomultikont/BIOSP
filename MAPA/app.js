/* ==========================================================================
   MAPA ŚWIATA FELOROST — renderer (SVG, bez zależności)
   ========================================================================== */
(function () {
  "use strict";

  const D = window.SWIAT;
  if (!D) { console.error("Brak danych SWIAT"); return; }

  const NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("map");
  const stage = document.getElementById("stage");
  const tooltip = document.getElementById("tooltip");
  const panel = document.getElementById("panel");
  const search = document.getElementById("search");
  const datalist = document.getElementById("placeList");
  const W = D.meta.canvas.w;
  const H = D.meta.canvas.h;

  const view = { x: 0, y: 0, k: 1 };
  let dragMoved = false;
  let dragging = false;
  let lastPt = null;
  let selectedEl = null;

  const TYPE_LABEL = {
    kontynent: "Kontynent", kraina: "Kraina", krolestwo: "Królestwo", "królestwo": "Królestwo", ksieństwo: "Księstwo",
    księstwo: "Księstwo", prowincja: "Prowincja", marchia: "Marchia", dystrykt: "Dystrykt",
    państwo: "Państwo", terytorium: "Terytorium", miasto: "Miasto", stolica: "Stolica",
    zamek: "Zamek", twierdza: "Twierdza", gród: "Gród", klasztor: "Klasztor", port: "Port",
    dwór: "Dwór", świątynia: "Świątynia", landmark: "Miejsce", biskupstwo: "Biskupstwo",
    ziemia: "Ziemia", podziemia: "Państwo podziemne", góry: "Góry", region: "Region"
  };
  const MAJOR_TYPES = ["kontynent", "królestwo", "księstwo", "państwo", "kraina"];
  function typeLabel(t) { return TYPE_LABEL[t] || t || "Miejsce"; }

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }
  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m];
    });
  }

  /* ---------------------------------------------------------------- DEFS */
  const defs = el("defs", {}, svg);

  const oceanGrad = el("radialGradient", { id: "oceanGrad", cx: "48%", cy: "42%", r: "80%" }, defs);
  el("stop", { offset: "0", "stop-color": "#d7e8ee" }, oceanGrad);
  el("stop", { offset: "0.65", "stop-color": "#a8c8d6" }, oceanGrad);
  el("stop", { offset: "1", "stop-color": "#7fa9bc" }, oceanGrad);

  const landGrad = el("linearGradient", { id: "landGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, defs);
  el("stop", { offset: "0", "stop-color": "#f2e6c9" }, landGrad);
  el("stop", { offset: "1", "stop-color": "#e0cda3" }, landGrad);

  const rough = el("filter", { id: "rough", x: "-5%", y: "-5%", width: "110%", height: "110%" }, defs);
  el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.012", numOctaves: "2", seed: "11", result: "noise" }, rough);
  el("feDisplacementMap", { in: "SourceGraphic", in2: "noise", scale: "5", xChannelSelector: "R", yChannelSelector: "G" }, rough);

  const paper = el("filter", { id: "paper", x: "0", y: "0", width: "100%", height: "100%" }, defs);
  el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.9", numOctaves: "2", seed: "3", result: "n" }, paper);
  el("feColorMatrix", { in: "n", type: "saturate", values: "0", result: "g" }, paper);
  el("feComponentTransfer", { in: "g", result: "a" }, paper);
  el("feFuncA", { type: "linear", slope: "0.05" }, paper);
  el("feComposite", { in: "a", in2: "SourceGraphic", operator: "over" }, paper);

  const glow = el("filter", { id: "glow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
  el("feGaussianBlur", { stdDeviation: "3", result: "b" }, glow);
  el("feMerge", {}, glow);
  el("feMergeNode", { in: "b" }, glow.lastChild);
  el("feMergeNode", { in: "SourceGraphic" }, glow.lastChild);

  /* ---------------------------------------------------------------- WORLD */
  const world = el("g", { id: "world" }, svg);

  el("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#oceanGrad)" }, world);

  const gContinents = el("g", { id: "continents", filter: "url(#rough)" }, world);
  const gRegions = el("g", { id: "regions" }, world);
  const gTerrain = el("g", { id: "terrain" }, world);
  const gRivers = el("g", { id: "rivers" }, world);
  const gLabels = el("g", { id: "labels" }, world);
  const gPlaces = el("g", { id: "places" }, world);
  const gBishops = el("g", { id: "bishops", class: "layer-off" }, world);

  /* ------------------------------------------------------------- LĄDY */
  D.continents.forEach(function (c) {
    el("path", { d: c.d, class: "land" }, gContinents);
  });
  D.islands.forEach(function (i) {
    el("path", { d: i.d, class: "land island" }, gContinents);
  });

  /* --------------------------------------------------------- REGIONY */
  const regionEls = {};
  D.regions.forEach(function (r) {
    const p = el("path", {
      d: r.d,
      class: "region",
      "data-id": r.id,
      fill: r.color,
      "fill-opacity": r.parent === r.id ? "0.5" : "0.42"
    }, gRegions);
    regionEls[r.id] = p;

    p.addEventListener("pointerenter", function (e) {
      if (!dragging) showTooltip(e, r.name, typeLabel(r.type));
    });
    p.addEventListener("pointermove", function (e) {
      if (!dragging) moveTooltip(e);
    });
    p.addEventListener("pointerleave", hideTooltip);
    p.addEventListener("click", function (e) {
      if (dragMoved) return;
      select(r);
    });
  });

  /* --------------------------------------------------------- TEREN */
  function mountain(x, y, s) {
    const g = el("g", { transform: `translate(${x} ${y}) scale(${s || 1})`, class: "mtn" }, gTerrain);
    el("path", { d: "M -11,8 L 0,-11 L 11,8 Z", class: "mtn-body" }, g);
    el("path", { d: "M 0,-11 L 4,-4 L -4,-4 Z", class: "mtn-snow" }, g);
  }
  function forest(x, y, s) {
    const g = el("g", { transform: `translate(${x} ${y}) scale(${s || 1})`, class: "tree" }, gTerrain);
    el("path", { d: "M 0,-9 L 6,5 L -6,5 Z", class: "tree-body" }, g);
    el("path", { d: "M 0,-3 L 5,8 L -5,8 Z", class: "tree-body" }, g);
    el("rect", { x: "-1.2", y: "8", width: "2.4", height: "4", class: "tree-trunk" }, g);
  }
  function desert(x, y) {
    const g = el("g", { transform: `translate(${x} ${y})`, class: "dune" }, gTerrain);
    el("path", { d: "M -9,2 C -4,-4 4,-4 9,2", class: "dune-line" }, g);
    el("path", { d: "M -6,7 C -2,3 2,3 6,7", class: "dune-line" }, g);
  }
  function swamp(x, y) {
    const g = el("g", { transform: `translate(${x} ${y})`, class: "swamp" }, gTerrain);
    el("path", { d: "M -8,0 L 8,0 M -6,4 L 6,4 M -4,-4 L 4,-4", class: "swamp-line" }, g);
  }

  (D.terrain.mountains || []).forEach(function (m) { mountain(m.x, m.y, m.s); });
  (D.terrain.forests || []).forEach(function (f) { forest(f.x, f.y, f.s); });
  (D.terrain.deserts || []).forEach(function (d) { desert(d.x, d.y); });
  (D.terrain.swamps || []).forEach(function (s) { swamp(s.x, s.y); });

  if (D.terrain.volcano) {
    const v = D.terrain.volcano;
    const g = el("g", { transform: `translate(${v.x} ${v.y}) scale(${v.s || 1})`, class: "volcano" }, gTerrain);
    el("path", { d: "M -16,12 L 0,-16 L 16,12 Z", class: "volcano-body" }, g);
    el("path", { d: "M 0,-16 L 6,12 L -6,12 Z", class: "volcano-lava" }, g);
    el("path", { d: "M 0,-16 L 4,-7 L -4,-7 Z", class: "volcano-crater" }, g);
  }

  /* --------------------------------------------------------- RZEKI */
  D.rivers.forEach(function (r) {
    el("path", { d: r.d, class: "river" }, gRivers);
  });

  /* --------------------------------------------------------- ETYKIETY */
  D.regions.forEach(function (r) {
    if (!r.label) return;
    const t = el("text", {
      x: r.label.x, y: r.label.y,
      class: "region-label" + (MAJOR_TYPES.indexOf(r.type) === -1 ? " minor" : ""),
      "text-anchor": "middle", "data-id": r.id
    }, gLabels);
    t.textContent = r.name;
    t.addEventListener("click", function () { if (!dragMoved) select(r); });
  });

  D.continents.forEach(function (c) {
    el("text", {
      x: c.label.x, y: c.label.y, class: "continent-label",
      "text-anchor": "middle"
    }, gLabels).textContent = c.name.toUpperCase();
  });

  D.seaLabels.forEach(function (s) {
    const t = el("text", {
      x: s.x, y: s.y, class: "sea-label",
      "text-anchor": "middle",
      transform: s.rotate ? `rotate(${s.rotate} ${s.x} ${s.y})` : null
    }, gLabels);
    t.textContent = s.text;
  });

  /* --------------------------------------------------------- MIEJSCA */
  function marker(type) {
    switch (type) {
      case "stolica":
        return '<path d="M0,-10 L2.4,-3 L9.5,-3 L3.8,1.2 L6,8 L0,3.8 L-6,8 L-3.8,1.2 L-9.5,-3 L-2.4,-3 Z" class="mk mk-stolica"/>';
      case "miasto":
        return '<circle r="5.5" class="mk mk-miasto"/>';
      case "zamek":
      case "twierdza":
      case "gród":
      case "grod":
        return '<rect x="-5.5" y="-5.5" width="11" height="11" class="mk mk-twierdza"/>';
      case "klasztor":
        return '<path d="M-5,7 L-5,-2 L0,-9 L5,-2 L5,7 Z" class="mk mk-klasztor"/>';
      case "port":
        return '<circle r="4" class="mk mk-port"/><path d="M0,-10 L0,8 M-7,2 C-5,8 5,8 7,2" class="mk mk-anchor"/>';
      case "landmark":
        return '<path d="M0,-9 L9,0 L0,9 L-9,0 Z" class="mk mk-landmark"/>';
      case "podziemia":
        return '<circle r="4" class="mk mk-podziemia"/><circle r="8" class="mk mk-dashed"/>';
      default:
        return '<circle r="4" class="mk mk-dot"/>';
    }
  }

  const placeEls = {};
  D.places.forEach(function (p) {
    const g = el("g", {
      class: "place place-" + (p.rank || 3),
      transform: `translate(${p.x} ${p.y})`,
      "data-id": p.id
    }, gPlaces);
    const anchor = p.x > 1880 ? "end" : "start";
    const lx = p.x > 1880 ? -12 : 12;
    const ly = p.y < 150 ? 18 : (p.y > 1400 ? -8 : 4);
    g.innerHTML = marker(p.type) +
      '<text class="place-label" x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '">' + esc(p.name) + "</text>";
    placeEls[p.id] = g;

    g.addEventListener("pointerenter", function (e) { if (!dragging) showTooltip(e, p.name, typeLabel(p.type)); });
    g.addEventListener("pointermove", function (e) { if (!dragging) moveTooltip(e); });
    g.addEventListener("pointerleave", hideTooltip);
    g.addEventListener("click", function () { if (!dragMoved) select(p); });
  });

  /* --------------------------------------------------------- BISKUPSTWA */
  const bishopEls = {};
  D.bishoprics.forEach(function (b) {
    const g = el("g", {
      class: "place bishop",
      transform: `translate(${b.x} ${b.y})`,
      "data-id": b.id
    }, gBishops);
    g.innerHTML = '<path d="M0,-9 L0,9 M-7,-2 L7,-2" class="mk mk-bishop"/>' +
      '<text class="place-label bishop-label" x="' + (b.x > 1880 ? -12 : 12) + '" y="4" text-anchor="' + (b.x > 1880 ? "end" : "start") + '">' + esc(b.holder) + "</text>";
    bishopEls[b.id] = g;
    g.addEventListener("pointerenter", function (e) { if (!dragging) showTooltip(e, b.name, "Biskupstwo · " + b.holder); });
    g.addEventListener("pointermove", function (e) { if (!dragging) moveTooltip(e); });
    g.addEventListener("pointerleave", hideTooltip);
    g.addEventListener("click", function () { if (!dragMoved) select(b); });
  });

  /* --------------------------------------------------------- TOOLTIP */
  function showTooltip(e, title, sub) {
    tooltip.innerHTML = "<strong>" + esc(title) + "</strong>" + (sub ? "<span>" + esc(sub) + "</span>" : "");
    tooltip.classList.add("show");
    moveTooltip(e);
  }
  function moveTooltip(e) {
    const r = stage.getBoundingClientRect();
    let x = e.clientX - r.left + 16;
    let y = e.clientY - r.top + 16;
    if (x + 240 > r.width) x = r.width - 250;
    if (y + 70 > r.height) y = r.height - 80;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
  function hideTooltip() { tooltip.classList.remove("show"); }

  /* --------------------------------------------------------- PANEL */
  function row(label, value) {
    if (!value) return "";
    return "<div class=\"prow\"><span class=\"pk\">" + esc(label) + "</span><span class=\"pv\">" + esc(value) + "</span></div>";
  }
  function parentName(item) {
    if (item.region) { const r = D.byId(item.region); return r ? r.name : ""; }
    if (item.parent) { const p = D.byId(item.parent); return p ? p.name : ""; }
    return "";
  }
  function select(item) {
    hideTooltip();
    document.querySelectorAll(".selected").forEach(function (e) { e.classList.remove("selected"); });
    const elTarget = regionEls[item.id] || placeEls[item.id] || bishopEls[item.id];
    if (elTarget) { elTarget.classList.add("selected"); selectedEl = elTarget; }

    const isBishop = item.holder !== undefined;
    let rows = "";
    if (isBishop) {
      rows += row("Biskup", item.holder);
      rows += row("Ranga", item.rank);
      rows += row("Siedziba", item.see);
    } else {
      rows += row("Stolica", item.capital);
      rows += row("Władca", item.ruler);
    }
    const parent = parentName(item);
    if (parent) rows += row("Położenie", parent);

    panel.innerHTML =
      '<button class="panel-close" id="panelClose" aria-label="Zamknij">✕</button>' +
      '<div class="panel-type">' + esc(typeLabel(item.type)) + '</div>' +
      '<h2>' + esc(item.name) + '</h2>' +
      (item.description ? '<p class="panel-desc">' + esc(item.description) + '</p>' : '') +
      (rows ? '<div class="panel-rows">' + rows + '</div>' : '') +
      '<a class="panel-link" href="../miejsce.html?id=' + encodeURIComponent(item.id) + '">Czytaj w wiki →</a>' +
      '<div class="panel-hint">Kliknij inną krainę lub miejscowość, aby zmienić szczegóły.</div>';
    panel.classList.add("open");
    document.getElementById("panelClose").addEventListener("click", closePanel);
    focusItem(item);
    if (location.hash !== "#" + item.id) history.replaceState(null, "", "#" + item.id);
  }
  function closePanel() {
    panel.classList.remove("open");
    if (selectedEl) { selectedEl.classList.remove("selected"); selectedEl = null; }
    if (/^#/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
  }

  /* --------------------------------------------------------- FOCUS */
  function focusItem(item) {
    if (typeof item.x === "number" && typeof item.y === "number") {
      view.k = Math.max(view.k, 2.0);
      view.x = W / 2 - view.k * item.x;
      view.y = H / 2 - view.k * item.y;
    } else {
      const path = regionEls[item.id] || document.querySelector('[data-id="' + item.id + '"]');
      if (!path || !path.getBBox) return;
      const b = path.getBBox();
      if (!b.width || !b.height) return;
      const k = Math.min(3.2, Math.max(0.6, Math.min((W * 0.62) / b.width, (H * 0.62) / b.height)));
      view.k = k;
      view.x = W / 2 - k * (b.x + b.width / 2);
      view.y = H / 2 - k * (b.y + b.height / 2);
    }
    apply();
  }

  /* --------------------------------------------------------- TRANSFORM */
  function apply() {
    world.setAttribute("transform", "translate(" + view.x + " " + view.y + ") scale(" + view.k + ")");
    svg.classList.toggle("zoomed-in", view.k >= 1.55);
    document.getElementById("zoomLevel").textContent = Math.round(view.k * 100) + "%";
  }
  function clientToSvg(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function zoomAt(px, py, factor) {
    const k2 = Math.min(9, Math.max(0.35, view.k * factor));
    const s = k2 / view.k;
    view.x = px - (px - view.x) * s;
    view.y = py - (py - view.y) * s;
    view.k = k2;
    apply();
  }

  svg.addEventListener("wheel", function (e) {
    e.preventDefault();
    const p = clientToSvg(e.clientX, e.clientY);
    zoomAt(p.x, p.y, e.deltaY < 0 ? 1.16 : 1 / 1.16);
  }, { passive: false });

  svg.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    dragging = true;
    dragMoved = false;
    lastPt = clientToSvg(e.clientX, e.clientY);
    svg.setPointerCapture(e.pointerId);
    svg.classList.add("dragging");
  });
  svg.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    const p = clientToSvg(e.clientX, e.clientY);
    const dx = p.x - lastPt.x, dy = p.y - lastPt.y;
    if (Math.abs(dx) + Math.abs(dy) > 0.5) dragMoved = true;
    view.x += dx; view.y += dy;
    lastPt = p;
    apply();
  });
  svg.addEventListener("pointerup", function (e) {
    dragging = false;
    svg.classList.remove("dragging");
    try { svg.releasePointerCapture(e.pointerId); } catch (_) {}
  });
  svg.addEventListener("pointercancel", function () { dragging = false; svg.classList.remove("dragging"); });

  /* --------------------------------------------------------- UI */
  document.getElementById("zoomIn").addEventListener("click", function () { zoomAt(W / 2, H / 2, 1.25); });
  document.getElementById("zoomOut").addEventListener("click", function () { zoomAt(W / 2, H / 2, 1 / 1.25); });
  document.getElementById("zoomReset").addEventListener("click", function () {
    view.x = 0; view.y = 0; view.k = 1; apply();
    closePanel();
  });

  function setLayer(id, cls, on) {
    const g = document.getElementById(id);
    if (!g) return;
    g.classList.toggle("layer-off", !on);
  }
  document.getElementById("layerPolitical").addEventListener("change", function (e) {
    setLayer("regions", "layer-off", e.target.checked);
  });
  document.getElementById("layerPhysical").addEventListener("change", function (e) {
    setLayer("terrain", "layer-off", e.target.checked);
    setLayer("rivers", "layer-off", e.target.checked);
  });
  document.getElementById("layerBishops").addEventListener("change", function (e) {
    setLayer("bishops", "layer-off", e.target.checked);
  });
  document.getElementById("layerLabels").addEventListener("change", function (e) {
    document.body.classList.toggle("hide-labels", !e.target.checked);
  });

  /* --------------------------------------------------------- SZUKAJ */
  const entries = D.allEntries().filter(function (e) { return e.id !== e.name; });
  entries.forEach(function (e) {
    const o = document.createElement("option");
    o.value = e.name;
    datalist.appendChild(o);
  });
  function findByName(q) {
    const n = norm(q);
    if (!n) return null;
    return entries.find(function (e) { return norm(e.name) === n; }) ||
      entries.find(function (e) { return norm(e.name).indexOf(n) !== -1; });
  }
  search.addEventListener("input", function () {
    const hit = findByName(search.value);
    if (hit && norm(hit.name) === norm(search.value)) select(hit);
  });
  search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const hit = findByName(search.value);
      if (hit) { search.value = hit.name; select(hit); }
    }
  });

  /* --------------------------------------------------------- HASH */
  function applyHash() {
    const id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    if (!id) return;
    const item = D.byId(id);
    if (item) select(item);
  }
  window.addEventListener("hashchange", applyHash);

  /* --------------------------------------------------------- START */
  apply();
  applyHash();
})();
