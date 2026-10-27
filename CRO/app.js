'use strict';
(() => {
  const rows = window.CROS_PRECEDENTS || [];
  const results = document.getElementById('results');
  const query = document.getElementById('q');
  const kind = document.getElementById('kind');
  query.value = new URLSearchParams(location.search).get('q') || '';
  const normalize = value => String(value || '').toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g,'l');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date = value => value ? value.split('-').reverse().join('.') : '—';
  function render() {
    const q = normalize(query.value.trim());
    const found = rows.filter(row => (!kind.value || row.caseType === kind.value) && (!q || normalize([row.signature,row.court,row.thesis,row.legalPrinciple,row.sentence].join(' ')).includes(q)))
      .sort((a,b)=>b.date.localeCompare(a.date)||a.signature.localeCompare(b.signature,'pl'));
    document.getElementById('count').textContent = `${found.length} orzeczeń w publikatorze`;
    results.innerHTML = found.map(row => `<article class="record"><div class="record-top"><span>${esc(row.court)}</span><span>${date(row.date)} · ${esc(row.signature)}</span></div><h2><a href="https://koronalegal.krulestwomultikont.workers.dev/#act/${encodeURIComponent(row.id)}">${esc(row.caseType)} · ${esc(row.signature)}</a></h2>${row.legalPrinciple ? `<span class="tag">Zasada prawna · precedens</span>` : `<span class="tag">Orzeczenie WTK</span>`}${row.thesis?`<p>${esc(row.thesis)}</p>`:''}${row.legalPrinciple?`<div class="principle"><strong>ZASADA PRAWNA</strong><p>${esc(row.legalPrinciple)}</p></div>`:''}<p>Skład: ${esc(row.judges)}</p></article>`).join('') || '<div class="empty">Brak orzeczeń spełniających kryteria wyszukiwania.</div>';
  }
  query.addEventListener('input',render); kind.addEventListener('change',render); render();
})();
