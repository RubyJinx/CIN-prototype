const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.bottom-nav button');

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
  });

  navButtons.forEach(btn => {
    const tab = btn.dataset.tab;
    const activeTab = id === 'event-detail' ? 'events' : id;
    btn.classList.toggle('active', tab === activeTab);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-go]');
  if (!trigger) return;
  showScreen(trigger.dataset.go);
});

const searchInput = document.getElementById('eventSearch');
const eventCards = document.querySelectorAll('#eventList .event-card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  eventCards.forEach(card => {
    const haystack = card.dataset.search.toLowerCase();
    card.style.display = haystack.includes(query) ? 'block' : 'none';
  });
});

document.getElementById('rsvpBtn').addEventListener('click', () => {
  document.getElementById('statusMessage').textContent =
    'RSVP recorded for prototype testing.';
});

document.getElementById('calendarBtn').addEventListener('click', () => {
  document.getElementById('statusMessage').textContent =
    'Calendar action simulated for prototype testing.';
});

showScreen('home');
