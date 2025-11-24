const navItems = document.querySelectorAll('.nav-item');
const accordions = document.querySelectorAll('.nav-accordion');
const searchInput = document.getElementById('searchInput');
const cardGrid = document.getElementById('cardGrid');
const resultCount = document.getElementById('resultCount');
const currentPage = document.body.dataset.page;

function setActiveNav() {
  const currentHash = window.location.hash.replace('#', '');
  const fallbackSection = currentHash || currentPage || 'home';

  navItems.forEach((item) => {
    item.classList.remove('active');
    const pageMatch = item.dataset.page === currentPage;
    const sectionMatch = item.dataset.section === fallbackSection;

    if (pageMatch && (sectionMatch || (!currentHash && item.dataset.section === currentPage))) {
      item.classList.add('active');
      const panel = item.closest('.nav-panel');
      if (panel) {
        panel.classList.add('open');
        const accordion = document.querySelector(`.nav-accordion[data-target="${panel.id}"]`);
        if (accordion) {
          accordion.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });
}

accordions.forEach((accordion) => {
  accordion.addEventListener('click', () => {
    const targetId = accordion.dataset.target;
    const panel = document.getElementById(targetId);
    const isOpen = panel.classList.toggle('open');
    accordion.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((btn) => btn.classList.remove('active'));
    item.classList.add('active');
    const panel = item.closest('.nav-panel');
    if (panel) {
      panel.classList.add('open');
      const accordion = document.querySelector(`.nav-accordion[data-target="${panel.id}"]`);
      if (accordion) {
        accordion.setAttribute('aria-expanded', 'true');
      }
    }
  });
});

if (searchInput && cardGrid && resultCount) {
  function filterCards(keyword) {
    const cards = Array.from(cardGrid.querySelectorAll('.card'));
    const query = keyword.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const match = text.includes(query);
      card.style.display = match ? 'grid' : 'none';
      if (match) visibleCount += 1;
    });

    if (query) {
      resultCount.textContent = `${visibleCount}개의 카드가 검색되었습니다.`;
    } else {
      resultCount.textContent = `${cards.length}개의 카드가 검색되었습니다.`;
    }
  }

  searchInput.addEventListener('input', (event) => {
    filterCards(event.target.value);
  });

  filterCards('');
}

setActiveNav();
window.addEventListener('hashchange', setActiveNav);
