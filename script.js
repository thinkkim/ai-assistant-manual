const navButtons = document.querySelectorAll('.nav-item');
const searchInput = document.getElementById('searchInput');
const cardGrid = document.getElementById('cardGrid');
const resultCount = document.getElementById('resultCount');
const currentPage = document.body.dataset.page;

function setActiveNav() {
  const currentHash = window.location.hash.replace('#', '');
  const fallbackSection = currentPage === 'features' ? 'overview' : 'home';
  const targetSection = currentHash || fallbackSection;
  navButtons.forEach((btn) => {
    btn.classList.remove('active');
    const pageMatch = btn.dataset.page === currentPage;
    const sectionMatch = btn.dataset.section === targetSection;
    if (pageMatch && sectionMatch) {
      btn.classList.add('active');
    }
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
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
