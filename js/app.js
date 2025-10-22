async function safeFetchJson(url, statusEl) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    const data = await res.json();
    statusEl.textContent = '';
    return data;
  } catch (e) {
    console.error('Failed to fetch', url, e);
    statusEl.textContent = 'Could not load data. If this is the first load, check the repository paths or refresh once.';
    statusEl.classList.add('error');
    return [];
  }
}

async function loadData() {
  const settingsStatus = document.getElementById('settings-status');
  const equipStatus = document.getElementById('equipment-status');

  const settings = await safeFetchJson('./data/dispenser-settings.json', settingsStatus);
  const settingsContainer = document.getElementById('settings-content');
  settingsContainer.innerHTML = '';
  settings.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${item.product}</h3>
      <p><strong>Bottle/Flow:</strong> ${item.type}</p>
      <p><strong>Dilution:</strong> ${item.dilution}</p>
      <p><strong>Peg/Rate:</strong> ${item.peg}</p>
      <p><strong>Verification:</strong> ${item.verification}</p>
      <p><em>${item.notes || ''}</em></p>`;
    settingsContainer.appendChild(card);
  });
  if (settings.length === 0 && !settingsStatus.textContent) {
    settingsStatus.textContent = 'No settings found.';
  }

  const equipment = await safeFetchJson('./data/install-equipment.json', equipStatus);
  const equipContainer = document.getElementById('equipment-content');
  equipContainer.innerHTML = '';
  equipment.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${item.section}</h3>
      <ul>${(item.items||[]).map(i => `<li>${i}</li>`).join('')}</ul>`;
    equipContainer.appendChild(card);
  });
  if (equipment.length === 0 && !equipStatus.textContent) {
    equipStatus.textContent = 'No equipment items found.';
  }
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

window.addEventListener('load', loadData);
