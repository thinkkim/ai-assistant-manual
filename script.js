const toggles = document.querySelectorAll('.accordion-toggle');
const panels = document.querySelectorAll('.accordion-panel');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const sections = document.querySelectorAll('.content-section');

// Accordion toggle behavior
const closeAllPanels = () => {
  panels.forEach((panel) => (panel.style.display = 'none'));
  toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
};

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const panel = toggle.nextElementSibling;
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    closeAllPanels();
    if (!isOpen) {
      panel.style.display = 'block';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// Search behavior for titles and content
const filterContent = (query) => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    sections.forEach((section) => (section.style.display = 'block'));
    return;
  }

  sections.forEach((section) => {
    const text = section.innerText.toLowerCase();
    const title = section.dataset.title?.toLowerCase() || '';
    const keywords = section.dataset.keywords?.toLowerCase() || '';
    const matches =
      text.includes(trimmed) || title.includes(trimmed) || keywords.includes(trimmed);

    section.style.display = matches ? 'block' : 'none';
  });
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterContent(searchInput.value);
});

searchInput.addEventListener('input', (event) => {
  if (!event.target.value) {
    filterContent('');
  }
});

// Expand matching accordion sections on hash change
const openLinkedAccordion = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const targetLink = document.querySelector(`.accordion a[href="${hash}"]`);
  if (!targetLink) return;

  const parentPanel = targetLink.closest('.accordion-panel');
  const parentToggle = parentPanel?.previousElementSibling;

  if (parentPanel && parentToggle) {
    closeAllPanels();
    parentPanel.style.display = 'block';
    parentToggle.setAttribute('aria-expanded', 'true');
  }
};

const openPanelForCurrentPage = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const targetLink = document.querySelector(`.section-link[href$="${currentPath}"]`);

  if (!targetLink) return;

  const panel = targetLink.closest('.accordion-item')?.querySelector('.accordion-toggle')?.nextElementSibling;
  const toggle = targetLink.closest('.accordion-item')?.querySelector('.accordion-toggle');

  if (panel && toggle) {
    closeAllPanels();
    panel.style.display = 'block';
    toggle.setAttribute('aria-expanded', 'true');
  }
};

const initializeAccordion = () => {
  openPanelForCurrentPage();
  openLinkedAccordion();
};

window.addEventListener('hashchange', openLinkedAccordion);
window.addEventListener('DOMContentLoaded', initializeAccordion);
