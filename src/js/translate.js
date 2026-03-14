// Active language and cached translation data
let currentLang = 'cs';
let translations = {};

async function loadTranslations(lang) {
  try {
    const response = await fetch(`src/data/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
    translations = await response.json();
    currentLang = lang;
    applyTranslations();
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fall back to Czech if the requested language file is missing
    if (lang !== 'cs') loadTranslations('cs');
  }
}

function applyTranslations() {
  const dataAttributes = [
    'description',
    'title',
    'aircraft-reg',
    'price',
    'range',
    'speed',
    'night-rated',
    'avionics',
    'default',
  ];

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');

    // Populate related data-* attributes (e.g. data-description, data-title)
    dataAttributes.forEach(attr => {
      const attrKey = `${key}_${attr}`;
      if (translations[attrKey]) {
        el.setAttribute(`data-${attr}`, translations[attrKey]);
      }
    });

    // Set text content unless the element is locked by fleet/team hover logic
    if (translations[key] && !el.hasAttribute('keep-text')) {
      el.innerHTML = translations[key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const userLang = navigator.language.startsWith('cs') ? 'cs' : 'en';
  loadTranslations(userLang);

  document.getElementById('switch-lang-en').addEventListener('click', () => loadTranslations('en'));
  document.getElementById('switch-lang-cs').addEventListener('click', () => loadTranslations('cs'));
});
