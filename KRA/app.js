// ==========================================================================
// FUNKCJE POMOCNICZE
// ==========================================================================

function toggleCard(headerElement) {
  headerElement.classList.toggle("active");
  const body = headerElement.nextElementSibling;
  if (body) {
    body.classList.toggle("open");
  }
}

function renderClassesTable(classes) {
  if (!classes) return '<span>Brak danych</span>';
  return `
    <table class="classes-table">
      <thead>
        <tr>
          <th>Klasa szlachectwa (art. 11 Dekretu)</th>
          <th style="text-align:center;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="${classes.publicFunction ? 'active-row' : ''}">
          <td>Tytuł związany z określoną funkcją publiczną (pkt 1)</td>
          <td class="center">${classes.publicFunction ? '✓' : '—'}</td>
        </tr>
        <tr class="${classes.landAndBusiness ? 'active-row' : ''}">
          <td>Tytuł związany z majątkiem ziemskim i przedsiębiorstwem (pkt 2)</td>
          <td class="center">${classes.landAndBusiness ? '✓' : '—'}</td>
        </tr>
        <tr class="${classes.honorary ? 'active-row' : ''}">
          <td>Tytuł związany z honorowym wyróżnieniem (pkt 3)</td>
          <td class="center">${classes.honorary ? '✓' : '—'}</td>
        </tr>
      </tbody>
    </table>
  `;
}

// ==========================================================================
// GENERATORY WIDOKÓW
// ==========================================================================

// 1. Rodzina Krulewska
function renderKrolewska(container) {
  if (typeof krolewskaDb === "undefined") {
    container.innerHTML = `<div class="vassal-box">Oczekiwanie na plik data/krolewska.js...</div>`;
    return;
  }

  const d = krolewskaDb;
  container.innerHTML = `
    <article class="item-card">
      <header class="item-header active" onclick="toggleCard(this)">
        <div class="item-title-group">
          <img src="${d.koronaImg}" class="rank-crown" alt="Korona">
          <span class="item-sig">${d.houseName}</span>
        </div>
        <span class="badge badge-grand">Dynastia Panująca</span>
      </header>
      
      <div class="item-body open">
        <div class="meta-section">
          <div class="section-label">Podstawa prawna ujawnienia danych</div>
          <div class="meta-grid">
            <span class="grid-key">Reżim prawny:</span>
            <span class="grid-val">${d.legalBasis}</span>
          </div>
        </div>

        <div class="meta-section">
          <div class="section-label">1. Informacje o członkach Rodziny Krulewskiej</div>
          <div class="meta-grid">
            <span class="grid-key">N.1.1. Imię Krula Multikont:</span>
            <span class="grid-val"><strong>${d.monarchName}</strong></span>
            
            <span class="grid-key">N.1.2. Wzór herbu Rodziny:</span>
            <div class="grid-val heraldry-preview">
              <img src="${d.royalArmsImg}" class="herb-thumb" alt="Herb Rodziny">
              <div class="herb-blazon">${d.royalArmsBlazon}</div>
            </div>

            <span class="grid-key">N.1.3. Imię Krulowej:</span>
            <span class="grid-val"><strong>${d.queenName}</strong></span>

            <span class="grid-key">N.1.4. Pozostali członkowie Rodziny:</span>
            <span class="grid-val">
              ${(d.familyMembers || []).map(m => `<div>• ${m}</div>`).join('')}
            </span>
          </div>
        </div>

        <div class="meta-section">
          <div class="section-label">2. Linia sukcesji Tronu Korony</div>
          <div class="meta-grid">
            <span class="grid-key">N.2.1. Kolejność sukcesorów:</span>
            <span class="grid-val">
              <div class="vassal-box">
                ${(d.successionLine || []).map(s => `<div>${s}</div>`).join('')}
              </div>
            </span>
          </div>
        </div>

        <div class="meta-section">
          <div class="section-label">3. Herb używany przez Monarchę</div>
          <div class="meta-grid">
            <span class="grid-key">N.3.1. Herb z Koroną Krula:</span>
            <div class="grid-val heraldry-preview">
              <img src="${d.personalArmsImg}" class="herb-thumb" alt="Herb Krula">
              <div class="herb-blazon">${d.personalArmsBlazon}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

// 2. Wielkie Rody
function renderWielkieRody(container) {
  if (typeof rodyWielkieDb === "undefined" || !Array.isArray(rodyWielkieDb)) {
    container.innerHTML = `<div class="vassal-box">Oczekiwanie na bazę danych Wielkich Rodów (data/rody_wielkie.js)...</div>`;
    return;
  }

  container.innerHTML = rodyWielkieDb.map(item => `
    <article class="item-card">
      <header class="item-header" onclick="toggleCard(this)">
        <div class="item-title-group">
          <img src="${item.koronaImg}" class="rank-crown" alt="Korona">
          <span class="item-sig">${item.title}</span>
        </div>
        <span class="badge badge-grand">${item.kategoriaRodu || 'Wielki Ród'}</span>
      </header>
      
      <div class="item-body">
        
        <!-- 1. INFORMACJE O TYTULE -->
        <div class="meta-section">
          <div class="section-label">1. Informacje o tytule</div>
          <div class="meta-grid">
            <span class="grid-key">N.1.1. Pełna nazwa tytułu:</span><span class="grid-val">${item.n11_title}</span>
            <span class="grid-key">N.1.2. Postanowienie o utworzeniu:</span><span class="grid-val"><strong>${item.n12_creationOrder}</strong></span>
            <span class="grid-key">N.1.3. Klasy tytułu:</span><div class="grid-val">${renderClassesTable(item.classes)}</div>
            <span class="grid-key">N.1.4. Ranga tytułu:</span><span class="grid-val">${item.n14_ranga}</span>
            <span class="grid-key">N.1.5. Majątek powiązany z urzędem:</span><span class="grid-val">${item.n15_publicEstate}</span>
            <span class="grid-key">N.1.6. Majątek ziemski i przedsiębiorstwo:</span><span class="grid-val"><strong>${item.n16_businessEstate}</strong></span>
            <span class="grid-key">N.1.7. Podstawa funkcji publicznej:</span><span class="grid-val">${item.n17_publicLegalBasis}</span>
            <span class="grid-key">N.1.8. Opis sygnetu szlacheckiego:</span><span class="grid-val">${item.n18_ringDesc}</span>
            <span class="grid-key">N.1.9. Data utworzenia / zniesienia:</span><span class="grid-val">${item.n19_dates}</span>
          </div>
        </div>

        <!-- 2. INFORMACJE O OSOBIE NOSZĄCEJ TYTUŁ -->
        <div class="meta-section">
          <div class="section-label">2. Informacje o osobie noszącej tytuł</div>
          <div class="meta-grid">
            <span class="grid-key">N.2.1. Imię aktualnego arystokraty:</span><span class="grid-val"><strong>${item.n21_holderName}</strong></span>
            <span class="grid-key">N.2.2. Postanowienie o nadaniu:</span><span class="grid-val"><strong>${item.n22_grantOrder}</strong></span>
            <span class="grid-key">N.2.3. Imiona poprzednich użytkowników:</span><span class="grid-val">${item.n23_prevHolders}</span>
            <span class="grid-key">N.2.4. Informacja o dziedzicu:</span><span class="grid-val">${item.n24_heir}</span>
            <span class="grid-key">N.2.5. Uprawnienia indywidualne:</span><span class="grid-val">${item.n25_individualPrivileges}</span>
          </div>
        </div>

        <!-- 3. POZOSTAŁE INFORMACJE O ARYSTOKRACIE -->
        <div class="meta-section">
          <div class="section-label">3. Pozostałe informacje o arystokracie</div>
          <div class="meta-grid">
            <span class="grid-key">N.3.1. Wzór używanego herbu:</span>
            <div class="grid-val heraldry-preview">
              <img src="${item.n31_usedHerbImg}" class="herb-thumb" alt="Herb arystokraty">
              <div class="herb-blazon">${item.n31_usedHerbDesc}</div>
            </div>
            <span class="grid-key">N.3.2. Używany tytuł użytkowy:</span><span class="grid-val">${item.n32_usageTitle}</span>
            <span class="grid-key">N.3.3. Inne tytuły arystokraty:</span><span class="grid-val">${item.n33_otherTitles}</span>
          </div>
        </div>

        <!-- 4. INFORMACJE O RODZIE SZLACHECKIM -->
        <div class="meta-section">
          <div class="section-label">4. Informacje o rodzie szlacheckim i relacjach lennych</div>
          <div class="meta-grid">
            <span class="grid-key">N.4.1. Kategoria i ranga rodu:</span><span class="grid-val"><strong>${item.n41_houseCategory}</strong></span>
            <span class="grid-key">N.4.2. Relacje lenne (wasalitet):</span>
            <div class="grid-val">
              <div class="vassal-box">${item.n42_vassalStatus}</div>
            </div>
            <span class="grid-key">N.4.3. Wzór herbu rodu szlacheckiego:</span>
            <div class="grid-val heraldry-preview">
              <img src="${item.n43_houseHerbImg}" class="herb-thumb" alt="Herb rodu">
              <div class="herb-blazon">${item.n43_houseHerbDesc}</div>
            </div>
            <span class="grid-key">N.4.4. Członkowie rodu szlacheckiego:</span>
            <span class="grid-val">${Array.isArray(item.n44_houseMembers) ? item.n44_houseMembers.join(', ') : item.n44_houseMembers}</span>
            <span class="grid-key">N.4.5. Siedziba rodu szlacheckiego:</span><span class="grid-val">${item.n45_houseSeat}</span>
          </div>
        </div>

      </div>
    </article>
  `).join('');
}

// 3. Fallbacki dla pozostałych zakładek
function renderWasalne(container) {
  if (typeof rodyWasalneDb === "undefined" || !Array.isArray(rodyWasalneDb)) {
    container.innerHTML = `<div class="vassal-box">Oczekiwanie na bazę danych Rodów Wasalnych (data/rody_wasalne.js)...</div>`;
    return;
  }

  container.innerHTML = rodyWasalneDb.map(item => `
    <article class="item-card">
      <header class="item-header" onclick="toggleCard(this)">
        <div class="item-title-group">
          <img src="${item.koronaImg}" class="rank-crown" alt="Korona">
          <span class="item-sig">${item.title}</span>
        </div>
        <span class="badge badge-vassal">${item.kategoriaRodu || 'Ród Wasalny'}</span>
      </header>
      
      <div class="item-body">
        
        <!-- 1. INFORMACJE O TYTULE -->
        <div class="meta-section">
          <div class="section-label">1. Informacje o tytule</div>
          <div class="meta-grid">
            <span class="grid-key">N.1.1. Pełna nazwa tytułu:</span><span class="grid-val">${item.n11_title}</span>
            <span class="grid-key">N.1.2. Postanowienie o utworzeniu:</span><span class="grid-val"><strong>${item.n12_creationOrder}</strong></span>
            <span class="grid-key">N.1.3. Klasy tytułu:</span><div class="grid-val">${renderClassesTable(item.classes)}</div>
            <span class="grid-key">N.1.4. Ranga tytułu:</span><span class="grid-val">${item.n14_ranga}</span>
            <span class="grid-key">N.1.5. Majątek publiczny:</span><span class="grid-val">${item.n15_publicEstate}</span>
            <span class="grid-key">N.1.6. Majątek ziemski i przedsiębiorstwo:</span><span class="grid-val"><strong>${item.n16_businessEstate}</strong></span>
            <span class="grid-key">N.1.7. Podstawa funkcji publicznej:</span><span class="grid-val">${item.n17_publicLegalBasis}</span>
            <span class="grid-key">N.1.8. Opis sygnetu szlacheckiego:</span><span class="grid-val">${item.n18_ringDesc}</span>
            <span class="grid-key">N.1.9. Data utworzenia / zniesienia:</span><span class="grid-val">${item.n19_dates}</span>
          </div>
        </div>

        <!-- 2. INFORMACJE O OSOBIE NOSZĄCEJ TYTUŁ -->
        <div class="meta-section">
          <div class="section-label">2. Informacje o osobie noszącej tytuł</div>
          <div class="meta-grid">
            <span class="grid-key">N.2.1. Imię aktualnego arystokraty:</span><span class="grid-val"><strong>${item.n21_holderName}</strong></span>
            <span class="grid-key">N.2.2. Postanowienie o nadaniu:</span><span class="grid-val"><strong>${item.n22_grantOrder}</strong></span>
            <span class="grid-key">N.2.3. Imiona poprzednich użytkowników:</span><span class="grid-val">${item.n23_prevHolders}</span>
            <span class="grid-key">N.2.4. Informacja o dziedzicu:</span><span class="grid-val">${item.n24_heir}</span>
            <span class="grid-key">N.2.5. Uprawnienia indywidualne:</span><span class="grid-val">${item.n25_individualPrivileges}</span>
          </div>
        </div>

        <!-- 3. POZOSTAŁE INFORMACJE O ARYSTOKRACIE -->
        <div class="meta-section">
          <div class="section-label">3. Pozostałe informacje o arystokracie</div>
          <div class="meta-grid">
            <span class="grid-key">N.3.1. Wzór używanego herbu:</span>
            <div class="grid-val heraldry-preview">
              <img src="${item.n31_usedHerbImg}" class="herb-thumb" alt="Herb arystokraty">
              <div class="herb-blazon">${item.n31_usedHerbDesc}</div>
            </div>
            <span class="grid-key">N.3.2. Używany tytuł użytkowy:</span><span class="grid-val">${item.n32_usageTitle}</span>
            <span class="grid-key">N.3.3. Inne tytuły arystokraty:</span><span class="grid-val">${item.n33_otherTitles}</span>
          </div>
        </div>

        <!-- 4. INFORMACJE O RODZIE SZLACHECKIM I RELACJACH LENNYCH -->
        <div class="meta-section">
          <div class="section-label">4. Informacje o rodzie szlacheckim i relacjach lennych</div>
          <div class="meta-grid">
            <span class="grid-key">N.4.1. Kategoria i ranga rodu:</span><span class="grid-val"><strong>${item.n41_houseCategory}</strong></span>
            <span class="grid-key">N.4.2. Stosunek wasalitetu:</span>
            <div class="grid-val">
              <div class="vassal-box">${item.n42_vassalStatus}</div>
            </div>
            <span class="grid-key">N.4.3. Wzór herbu rodu szlacheckiego:</span>
            <div class="grid-val heraldry-preview">
              <img src="${item.n43_houseHerbImg}" class="herb-thumb" alt="Herb rodu">
              <div class="herb-blazon">${item.n43_houseHerbDesc}</div>
            </div>
            <span class="grid-key">N.4.4. Członkowie rodu szlacheckiego:</span>
            <span class="grid-val">${Array.isArray(item.n44_houseMembers) ? item.n44_houseMembers.join(', ') : item.n44_houseMembers}</span>
            <span class="grid-key">N.4.5. Siedziba rodu szlacheckiego:</span><span class="grid-val">${item.n45_houseSeat}</span>
          </div>
        </div>

      </div>
    </article>
  `).join('');
}

function renderOsobiste(container) {
  if (typeof osobisteDb === "undefined" || !Array.isArray(osobisteDb)) {
    container.innerHTML = `<div class="vassal-box">Oczekiwanie na bazę danych Tytułów Osobistych (data/osobiste.js)...</div>`;
    return;
  }

  container.innerHTML = osobisteDb.map(item => `
    <article class="item-card">
      <header class="item-header" onclick="toggleCard(this)">
        <div class="item-title-group">
          <img src="${item.koronaImg}" class="rank-crown" alt="Korona">
          <span class="item-sig">${item.title}</span>
        </div>
        <span class="badge badge-personal">Tytuł Osobisty</span>
      </header>
      
      <div class="item-body">
        
        <!-- 1. INFORMACJE O TYTULE -->
        <div class="meta-section">
          <div class="section-label">1. Informacje o tytule</div>
          <div class="meta-grid">
            <span class="grid-key">N.1.1. Pełna nazwa tytułu:</span><span class="grid-val">${item.n11_title}</span>
            <span class="grid-key">N.1.2. Postanowienie o utworzeniu:</span><span class="grid-val"><strong>${item.n12_creationOrder}</strong></span>
            <span class="grid-key">N.1.3. Klasy tytułu:</span><div class="grid-val">${renderClassesTable(item.classes)}</div>
            <span class="grid-key">N.1.4. Ranga tytułu:</span><span class="grid-val">${item.n14_ranga}</span>
            <span class="grid-key">N.1.5. Majątek powiązany z urzędem:</span><span class="grid-val">${item.n15_publicEstate}</span>
            <span class="grid-key">N.1.6. Majątek ziemski i przedsiębiorstwo:</span><span class="grid-val"><strong>${item.n16_businessEstate}</strong></span>
            <span class="grid-key">N.1.7. Podstawa funkcji publicznej:</span><span class="grid-val">${item.n17_publicLegalBasis}</span>
            <span class="grid-key">N.1.8. Opis sygnetu szlacheckiego:</span><span class="grid-val">${item.n18_ringDesc}</span>
            <span class="grid-key">N.1.9. Data utworzenia / zniesienia:</span><span class="grid-val">${item.n19_dates}</span>
          </div>
        </div>

        <!-- 2. INFORMACJE O OSOBIE NOSZĄCEJ TYTUŁ -->
        <div class="meta-section">
          <div class="section-label">2. Informacje o osobie noszącej tytuł</div>
          <div class="meta-grid">
            <span class="grid-key">N.2.1. Imię aktualnego arystokraty:</span><span class="grid-val"><strong>${item.n21_holderName}</strong></span>
            <span class="grid-key">N.2.2. Postanowienie o nadaniu:</span><span class="grid-val"><strong>${item.n22_grantOrder}</strong></span>
            <span class="grid-key">N.2.3. Imiona poprzednich użytkowników:</span><span class="grid-val">${item.n23_prevHolders}</span>
            <span class="grid-key">N.2.4. Informacja o dziedzicu:</span><span class="grid-val">${item.n24_heir}</span>
            <span class="grid-key">N.2.5. Uprawnienia indywidualne:</span><span class="grid-val">${item.n25_individualPrivileges}</span>
          </div>
        </div>

        <!-- 3. POZOSTAŁE INFORMACJE O ARYSTOKRACIE -->
        <div class="meta-section">
          <div class="section-label">3. Pozostałe informacje o arystokracie</div>
          <div class="meta-grid">
            <span class="grid-key">N.3.1. Wzór używanego herbu:</span>
            <div class="grid-val">
              ${item.n31_usedHerbImg ? `
                <div class="heraldry-preview">
                  <img src="${item.n31_usedHerbImg}" class="herb-thumb" alt="Herb arystokraty">
                  <div class="herb-blazon">${item.n31_usedHerbDesc}</div>
                </div>
              ` : '<span>Brak</span>'}
            </div>
            
            <span class="grid-key">N.3.2. Używany tytuł użytkowy:</span><span class="grid-val">${item.n32_usageTitle}</span>
            <span class="grid-key">N.3.3. Inne tytuły arystokraty:</span><span class="grid-val">${item.n33_otherTitles}</span>

            <span class="grid-key">N.3.4. Wzór herbu osobistego:</span>
            <div class="grid-val">
              ${item.n34_personalHerbImg ? `
                <div class="heraldry-preview">
                  <img src="${item.n34_personalHerbImg}" class="herb-thumb" alt="Herb osobisty">
                  <div class="herb-blazon">${item.n34_personalHerbDesc}</div>
                </div>
              ` : '<span>Brak</span>'}
            </div>
          </div>
        </div>

      </div>
    </article>
  `).join('');
}

function renderRycerze(container) {
  if (typeof rycerzeDb === "undefined" || !Array.isArray(rycerzeDb)) {
    container.innerHTML = `<div class="vassal-box">Oczekiwanie na ewidencję Rycerzy Korony (data/rycerze.js)...</div>`;
    return;
  }

  container.innerHTML = `
    <article class="item-card">
      <header class="item-header" style="cursor: default;">
        <div class="item-title-group">
          <img src="../KRA/korona rycerza.png" class="rank-crown" alt="Korona rycerska" onerror="this.style.display='none'">
          <span class="item-sig">Urzędowa Ewidencja Legitymacji Rycerzy Korony</span>
        </div>
        <span class="badge badge-grand">Art. 23a Dekretu</span>
      </header>
      
      <div class="item-body open">
        <div class="meta-section">
          <div class="section-label">Podstawa prawna ewidencji</div>
          <div class="meta-grid">
            <span class="grid-key">Reżim prawny:</span>
            <span class="grid-val">Art. 23a Dekretu Krula Multikont z 24.02.2026 r. o organizacji arystokracji (Kr. Dz. U. z 2026 r. poz. 49). Godność osobista, dożywotnia i niedziedziczna, potwierdzana legitymacją Pałacu Krula.</span>
          </div>
        </div>

        <div class="table-responsive" style="margin-top: 14px;">
          <table class="official-table">
            <thead>
              <tr>
                <th style="width: 110px;">Nr legitymacji</th>
                <th>Imię i nazwisko</th>
                <th style="width: 80px;">Predykat</th>
                <th>Organ nadający</th>
                <th>Zasługi i tytuł nadania</th>
                <th style="width: 100px;">Data nadania</th>
                <th style="width: 70px; text-align: center;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rycerzeDb.map(r => `
                <tr>
                  <td><strong>${r.legitymacjaNr}</strong></td>
                  <td><strong>${r.fullName}</strong></td>
                  <td>${r.predicate}</td>
                  <td>${r.grantedBy}</td>
                  <td style="font-size: 12px; color: #57606a;">${r.merits}</td>
                  <td>${r.dateGranted}</td>
                  <td style="text-align: center;"><span class="badge badge-grand" style="font-size: 10px;">${r.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// ROUTER I START
// ==========================================================================

function loadTab(tabName, btnElement) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const container = document.getElementById("contentContainer");
  if (!container) return;
  container.innerHTML = "";

  switch (tabName) {
    case 'krolewska':
      renderKrolewska(container);
      break;
    case 'wielkie':
      renderWielkieRody(container);
      break;
    case 'wasalne':
      renderWasalne(container);
      break;
    case 'osobiste':
      renderOsobiste(container);
      break;
    case 'rycerze':
      renderRycerze(container);
      break;
    default:
      renderKrolewska(container);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const defaultTabBtn = document.querySelector('.tab-button');
  loadTab('krolewska', defaultTabBtn);
});

// ==========================================================================
// ROUTER I START
// ==========================================================================

function loadTab(tabName, btnElement) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const container = document.getElementById("contentContainer");
  if (!container) return;
  container.innerHTML = "";

  switch (tabName) {
    case 'krolewska':
      renderKrolewska(container);
      break;
    case 'wielkie':
      renderWielkieRody(container);
      break;
    case 'wasalne':
      renderWasalne(container);
      break;
    case 'osobiste':
      renderOsobiste(container);
      break;
    case 'rycerze':
      renderRycerze(container);
      break;
    default:
      renderKrolewska(container);
  }
}

// ==========================================================================
// OBSŁUGA WYSZUKIWARKI W CZASIE RZECZYWISTYM (TUTAJ WKLEJASZ TEN KOD)
// ==========================================================================

function hasMatch(value, query) {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) {
    return value.some(v => hasMatch(v, query));
  }
  return String(value).toLowerCase().includes(query);
}

function handleRegistrySearch() {
  const input = document.getElementById("registrySearch");
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  const container = document.getElementById("contentContainer");
  if (!container) return;

  if (!query) {
    const activeBtn = document.querySelector('.tab-button.active') || document.querySelector('.tab-button');
    if (activeBtn) {
      const tabMatch = activeBtn.getAttribute("onclick").match(/'([^']+)'/);
      if (tabMatch) loadTab(tabMatch[1], activeBtn);
    }
    return;
  }

  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

  let matches = [];

  // 1. Rodzina Krulewska
  if (typeof krolewskaDb !== "undefined" && krolewskaDb) {
    const k = krolewskaDb;
    if (
      hasMatch(k.houseName, query) ||
      hasMatch(k.monarchName, query) ||
      hasMatch(k.queenName, query) ||
      hasMatch(k.familyMembers, query) ||
      hasMatch(k.successionLine, query)
    ) {
      matches.push({ type: 'krolewska', data: k });
    }
  }

  // 2. Wielkie Rody
  if (typeof rodyWielkieDb !== "undefined" && Array.isArray(rodyWielkieDb)) {
    rodyWielkieDb.forEach(item => {
      if (
        hasMatch(item.title, query) ||
        hasMatch(item.n11_title, query) ||
        hasMatch(item.n21_holderName, query) ||
        hasMatch(item.n12_creationOrder, query) ||
        hasMatch(item.n22_grantOrder, query) ||
        hasMatch(item.n16_businessEstate, query) ||
        hasMatch(item.n44_houseMembers, query) ||
        hasMatch(item.n45_houseSeat, query)
      ) {
        matches.push({ type: 'wielkie', data: item });
      }
    });
  }

  // 3. Rody Wasalne
  if (typeof rodyWasalneDb !== "undefined" && Array.isArray(rodyWasalneDb)) {
    rodyWasalneDb.forEach(item => {
      if (
        hasMatch(item.title, query) ||
        hasMatch(item.n11_title, query) ||
        hasMatch(item.n21_holderName, query) ||
        hasMatch(item.n12_creationOrder, query) ||
        hasMatch(item.n22_grantOrder, query) ||
        hasMatch(item.n42_vassalStatus, query) ||
        hasMatch(item.n44_houseMembers, query)
      ) {
        matches.push({ type: 'wasalne', data: item });
      }
    });
  }

  // 4. Tytuły Osobiste
  if (typeof osobisteDb !== "undefined" && Array.isArray(osobisteDb)) {
    osobisteDb.forEach(item => {
      if (
        hasMatch(item.title, query) ||
        hasMatch(item.n11_title, query) ||
        hasMatch(item.n21_holderName, query) ||
        hasMatch(item.n12_creationOrder, query) ||
        hasMatch(item.n22_grantOrder, query) ||
        hasMatch(item.n16_businessEstate, query)
      ) {
        matches.push({ type: 'osobiste', data: item });
      }
    });
  }

  // 5. Rycerze Korony
  if (typeof rycerzeDb !== "undefined" && Array.isArray(rycerzeDb)) {
    rycerzeDb.forEach(item => {
      if (
        hasMatch(item.fullName, query) ||
        hasMatch(item.legitymacjaNr, query) ||
        hasMatch(item.grantedBy, query) ||
        hasMatch(item.merits, query)
      ) {
        matches.push({ type: 'rycerze', data: item });
      }
    });
  }

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="padding: 14px 18px; background: #ffebe9; border: 1px solid rgba(255, 129, 130, 0.4); color: #cf222e; font-size: 14px; border-radius: 4px; margin-top: 10px;">
        Nie odnaleziono wpisów w rejestrze odpowiadających kryteriom: <strong>${query}</strong>.
      </div>
    `;
    return;
  }

  let html = `<div style="font-size: 13px; font-weight: 600; margin-bottom: 16px; color: #57606a;">Liczba dopasowanych pozycji: ${matches.length}</div>`;

  matches.forEach(m => {
    const item = m.data;

    if (m.type === 'wielkie' || m.type === 'wasalne') {
      const badgeClass = m.type === 'wielkie' ? 'badge-grand' : 'badge-vassal';
      html += `
        <article class="item-card">
          <header class="item-header active" onclick="toggleCard(this)">
            <div class="item-title-group">
              <img src="${item.koronaImg}" class="rank-crown" alt="Korona">
              <span class="item-sig">${item.title}</span>
            </div>
            <span class="badge ${badgeClass}">${item.kategoriaRodu || 'Ród Szlachecki'}</span>
          </header>
          <div class="item-body open">
            <div class="meta-section">
              <div class="section-label">1. Informacje o tytule</div>
              <div class="meta-grid">
                <span class="grid-key">N.1.1. Pełna nazwa tytułu:</span><span class="grid-val">${item.n11_title}</span>
                <span class="grid-key">N.1.2. Postanowienie o utworzeniu:</span><span class="grid-val"><strong>${item.n12_creationOrder}</strong></span>
                <span class="grid-key">N.1.3. Klasy tytułu:</span><div class="grid-val">${renderClassesTable(item.classes)}</div>
                <span class="grid-key">N.1.4. Ranga tytułu:</span><span class="grid-val">${item.n14_ranga}</span>
                <span class="grid-key">N.1.5. Majątek publiczny:</span><span class="grid-val">${item.n15_publicEstate || 'Brak'}</span>
                <span class="grid-key">N.1.6. Majątek ziemski i przedsiębiorstwo:</span><span class="grid-val"><strong>${item.n16_businessEstate || 'Brak'}</strong></span>
                <span class="grid-key">N.1.7. Podstawa funkcji publicznej:</span><span class="grid-val">${item.n17_publicLegalBasis}</span>
                <span class="grid-key">N.1.8. Opis sygnetu szlacheckiego:</span><span class="grid-val">${item.n18_ringDesc}</span>
              </div>
            </div>
            <div class="meta-section">
              <div class="section-label">2. Informacje o osobie noszącej tytuł</div>
              <div class="meta-grid">
                <span class="grid-key">N.2.1. Imię aktualnego arystokraty:</span><span class="grid-val"><strong>${item.n21_holderName}</strong></span>
                <span class="grid-key">N.2.2. Postanowienie o nadaniu:</span><span class="grid-val"><strong>${item.n22_grantOrder}</strong></span>
                <span class="grid-key">N.2.4. Informacja o dziedzicu:</span><span class="grid-val">${item.n24_heir}</span>
              </div>
            </div>
            <div class="meta-section">
              <div class="section-label">3. Ród szlachecki i relacje lenne</div>
              <div class="meta-grid">
                <span class="grid-key">N.4.1. Kategoria rodu:</span><span class="grid-val"><strong>${item.n41_houseCategory}</strong></span>
                <span class="grid-key">N.4.2. Stosunek wasalitetu:</span>
                <div class="grid-val"><div class="vassal-box">${item.n42_vassalStatus}</div></div>
                <span class="grid-key">N.4.5. Siedziba rodu:</span><span class="grid-val">${item.n45_houseSeat}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    } else if (m.type === 'osobiste') {
      html += `
        <article class="item-card">
          <header class="item-header active" onclick="toggleCard(this)">
            <div class="item-title-group">
              <img src="${item.koronaImg}" class="rank-crown" alt="Korona">
              <span class="item-sig">${item.title}</span>
            </div>
            <span class="badge badge-personal">Tytuł Osobisty</span>
          </header>
          <div class="item-body open">
            <div class="meta-section">
              <div class="section-label">1. Informacje o tytule</div>
              <div class="meta-grid">
                <span class="grid-key">N.1.1. Pełna nazwa tytułu:</span><span class="grid-val">${item.n11_title}</span>
                <span class="grid-key">N.1.2. Postanowienie o utworzeniu:</span><span class="grid-val"><strong>${item.n12_creationOrder}</strong></span>
                <span class="grid-key">N.1.3. Klasy tytułu:</span><div class="grid-val">${renderClassesTable(item.classes)}</div>
                <span class="grid-key">N.1.4. Ranga tytułu:</span><span class="grid-val">${item.n14_ranga}</span>
                <span class="grid-key">N.1.6. Majątek ziemski i przedsiębiorstwo:</span><span class="grid-val"><strong>${item.n16_businessEstate || 'Brak'}</strong></span>
              </div>
            </div>
            <div class="meta-section">
              <div class="section-label">2. Osoba wyróżniona tytułem</div>
              <div class="meta-grid">
                <span class="grid-key">N.2.1. Imię aktualnego arystokraty:</span><span class="grid-val"><strong>${item.n21_holderName}</strong></span>
                <span class="grid-key">N.2.2. Postanowienie o nadaniu:</span><span class="grid-val"><strong>${item.n22_grantOrder}</strong></span>
                <span class="grid-key">N.2.4. Dziedziczenie:</span><span class="grid-val">${item.n24_heir}</span>
              </div>
            </div>
          </div>
        </article>
      `;
    } else if (m.type === 'rycerze') {
      html += `
        <article class="item-card">
          <header class="item-header active" style="cursor: default;">
            <span class="item-sig">${item.predicate} ${item.fullName}</span>
            <span class="badge badge-grand">Rycerz Korony</span>
          </header>
          <div class="item-body open">
            <div class="meta-grid">
              <span class="grid-key">Nr legitymacji:</span><span class="grid-val"><strong>${item.legitymacjaNr}</strong></span>
              <span class="grid-key">Organ nadający:</span><span class="grid-val">${item.grantedBy}</span>
              <span class="grid-key">Tytuł nadania i zasługi:</span><span class="grid-val">${item.merits}</span>
              <span class="grid-key">Data nadania:</span><span class="grid-val">${item.dateGranted}</span>
            </div>
          </div>
        </article>
      `;
    } else if (m.type === 'krolewska') {
      html += `
        <article class="item-card">
          <header class="item-header active" onclick="toggleCard(this)">
            <span class="item-sig">${item.houseName}</span>
            <span class="badge badge-grand">Dynastia Panująca</span>
          </header>
          <div class="item-body open">
            <div class="meta-grid">
              <span class="grid-key">Imię Krula:</span><span class="grid-val"><strong>${item.monarchName}</strong></span>
              <span class="grid-key">Członkowie:</span><span class="grid-val">${item.familyMembers.join(', ')}</span>
            </div>
          </div>
        </article>
      `;
    }
  });

  container.innerHTML = html;
}

function clearSearch() {
  const input = document.getElementById("registrySearch");
  if (input) {
    input.value = "";
    handleRegistrySearch();
  }
}

// ==========================================================================
// INICJALIZACJA STARTOWA
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
  const defaultTabBtn = document.querySelector('.tab-button');
  loadTab('krolewska', defaultTabBtn);
});