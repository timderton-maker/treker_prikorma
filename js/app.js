'use strict';

// ─── Эмодзи для пикера в модалке ────────────────────────────────────────────
const EMOJI_PICKER_OPTIONS = [
  '🥑','🥝','🍇','🍓','🫐','🌶','🧅','🥬','🫑','🌽',
  '🍆','🥦','🍠','🫒','🐔','🐄','🐑','🐟','🦐','🥜',
  '🌰','🍄','🫛','🫚','🧄','🫙','🥗','🍲','🥫','🫕',
];

// ─── Конфиг тем ─────────────────────────────────────────────────────────────
const THEMES = {
  boy: {
    heroTitle:    '🦕 Дино-меню малыша',
    heroSubtitle: 'Отслеживай прикорм вместе с динозавриками!',
    dinoEmoji:    '🦕',
    mascotContent:'🦕',
    mascotTitle:  'Привет! Я Рекси 🦕',
    addBtnLabel:  '🦕 Добавить!',
    addTabLabel:  '🦖 Добавить вкусняшку',
    modalH2:      '🦖 Добавить вкусняшку',
    welcomeIcon:  '🦕',
    welcomeTitle: 'Привет!',
    welcomeText:  'Это мой домашний проект, сделанный с любовью для своего малыша. Здесь могут быть баги и шероховатости — не ругайте строго 😅 Буду очень рад отзывам!',
    welcomeBtn:   '🦕 Понял, поехали!',
    mascotGreets: [
      'Привет! Я Рекси! 🦕',
      'Так держать! Малыш растёт! 💪',
      'Больше продуктов — больше динозавриков! 🦖',
      'Ура! Новый прикорм! 🎉',
      'Кушаем хорошо? 😋',
    ],
  },
  girl: {
    heroTitle:    '👸 Меню принцессы',
    heroSubtitle: 'Отслеживай прикорм вместе с принцессами!',
    dinoEmoji:    '🦋',
    mascotContent:'👸',
    mascotTitle:  'Привет! Я Принцесса 👸',
    addBtnLabel:  '👸 Добавить!',
    addTabLabel:  '🌸 Добавить вкусняшку',
    modalH2:      '🌸 Добавить вкусняшку',
    welcomeIcon:  '👸',
    welcomeTitle: 'Привет, принцесса!',
    welcomeText:  'Это мой домашний проект, сделанный с любовью для своей принцессы. Здесь могут быть баги и шероховатости — не ругайте строго 😅 Буду очень рад отзывам!',
    welcomeBtn:   '👸 Поехали!',
    mascotGreets: [
      'Привет! Я Принцесса! 👸',
      'Так держать! Принцесса растёт! 💜',
      'Больше продуктов — больше улыбок! 🌸',
      'Ура! Новый прикорм! 🎉',
      'Кушаем хорошо? 😋',
    ],
  },
};

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('app_theme', theme);
  const t = THEMES[theme];

  document.title = t.heroTitle;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  const heroSub = document.getElementById('hero-subtitle');
  if (heroSub) heroSub.textContent = t.heroSubtitle;
  const dinoEmoji = document.getElementById('dino-emoji');
  if (dinoEmoji) dinoEmoji.textContent = t.dinoEmoji;

  const mascot = document.getElementById('mascot');
  if (mascot) { mascot.textContent = t.mascotContent; mascot.title = t.mascotTitle; }

  const modalSave = document.getElementById('modal-save');
  if (modalSave) modalSave.textContent = t.addBtnLabel;
  const addTab = document.getElementById('add-product-btn');
  if (addTab) addTab.textContent = t.addTabLabel;
  const modalH2 = document.querySelector('#modal h2');
  if (modalH2) modalH2.textContent = t.modalH2;

  const welcomeIcon = document.getElementById('welcome-main-icon');
  if (welcomeIcon) welcomeIcon.textContent = t.welcomeIcon;
  const welcomeTitle = document.getElementById('welcome-main-title');
  if (welcomeTitle) welcomeTitle.textContent = t.welcomeTitle;
  const welcomeText = document.getElementById('welcome-main-text');
  if (welcomeText) welcomeText.textContent = t.welcomeText;
  const welcomeBtn = document.getElementById('welcome-close-btn');
  if (welcomeBtn) welcomeBtn.textContent = t.welcomeBtn;

  const catTitles = theme === 'girl' ? CATEGORY_TITLES_GIRL : CATEGORY_TITLES;
  document.querySelectorAll('.category-section').forEach(section => {
    const nameEl = section.querySelector('.cat-name');
    if (nameEl) nameEl.textContent = catTitles[section.dataset.cat] || section.dataset.cat;
  });
}

function openGenderSelect(afterSelect) {
  const overlay = document.getElementById('gender-overlay');
  overlay.classList.add('open');
  ['boy', 'girl'].forEach(gender => {
    document.getElementById(`gender-${gender}`).addEventListener('click', () => {
      overlay.classList.remove('open');
      applyTheme(gender);
      if (afterSelect) afterSelect();
    }, { once: true });
  });
}

// ─── Утилиты ─────────────────────────────────────────────────────────────────
function getBabyAgeMonths() {
  const baby = Storage.getBaby();
  if (!baby.birthDate) return null;
  const birth = new Date(baby.birthDate);
  const now   = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12
               + (now.getMonth() - birth.getMonth());
  return Math.max(0, months);
}

function showToast(text, duration = 2500) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), duration);
}

function generateId(prefix = 'custom') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
}

// ─── Рендер карточки продукта ────────────────────────────────────────────────
function renderCard(product, state = {}, isCustom = false) {
  const ageMonths = getBabyAgeMonths();
  const notYet = ageMonths !== null && product.minAge > ageMonths;

  const div = document.createElement('div');
  div.className = [
    'product-card',
    state.given   ? 'given'   : '',
    state.allergy ? 'allergy' : '',
    notYet        ? 'not-yet' : '',
  ].filter(Boolean).join(' ');
  div.dataset.id = product.id;

  div.innerHTML = `
    ${isCustom ? `<button class="delete-custom-btn" title="Удалить">🗑</button>` : ''}
    <span class="not-yet-badge">с ${product.minAge} мес.</span>
    <div class="product-emoji-name">
      <span class="product-emoji">${product.emoji}</span>
      <span class="product-name">${product.name}</span>
    </div>
    <label class="toggle-given">
      <input type="checkbox" ${state.given ? 'checked' : ''}>
      <span class="custom-checkbox"></span>
      <span>${state.given ? 'Введён ✓' : 'Не введён'}</span>
    </label>
    <div class="date-field">
      <label>📅 Дата первого ввода</label>
      <input type="date" value="${state.date || ''}">
    </div>
    <div class="reactions">
      <button class="reaction-btn ${state.reaction === 'like'    ? 'active' : ''}" data-r="like"    title="Нравится">😋</button>
      <button class="reaction-btn ${state.reaction === 'neutral' ? 'active' : ''}" data-r="neutral" title="Нейтрально">😐</button>
      <button class="reaction-btn ${state.reaction === 'dislike' ? 'active' : ''}" data-r="dislike" title="Не нравится">🤢</button>
    </div>
    <label class="allergy-toggle">
      <input type="checkbox" ${state.allergy ? 'checked' : ''}>
      <span class="allergy-indicator"></span>
      <span class="allergy-label">🤧 Аллергия</span>
    </label>
  `;

  // ─── Обработчики ─────────────────────────────────────────────────────────
  const checkbox = div.querySelector('.toggle-given input');
  const dateInput = div.querySelector('.date-field input');
  const allergyBox = div.querySelector('.allergy-toggle input');
  const label = div.querySelector('.toggle-given span:last-child');

  checkbox.addEventListener('change', () => {
    const given = checkbox.checked;
    if (given && !dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
    div.classList.toggle('given', given);
    label.textContent = given ? 'Введён ✓' : 'Не введён';
    saveCard(product.id, { given, date: dateInput.value });
    if (given) triggerConfetti(div);
    bounceMascot();
  });

  dateInput.addEventListener('change', () => {
    saveCard(product.id, { date: dateInput.value });
  });

  div.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = btn.dataset.r;
      const wasActive = btn.classList.contains('active');
      div.querySelectorAll('.reaction-btn').forEach(b => b.classList.remove('active'));
      if (!wasActive) {
        btn.classList.add('active');
        saveCard(product.id, { reaction: r });
        gsap.to(btn, { scale: 1.4, duration: .15, yoyo: true, repeat: 1, ease: 'back.out(2)' });
      } else {
        saveCard(product.id, { reaction: null });
      }
    });
  });

  allergyBox.addEventListener('change', () => {
    div.classList.toggle('allergy', allergyBox.checked);
    saveCard(product.id, { allergy: allergyBox.checked });
  });

  if (isCustom) {
    div.querySelector('.delete-custom-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Удалить «${product.name}»?`)) {
        Storage.removeCustomProduct(product.id);
        gsap.to(div, { scale: 0, opacity: 0, duration: .25, onComplete: () => {
          div.remove();
          updateCategoryProgress(product.category);
          updateGlobalProgress();
          renderBabyAllergies();
        }});
      }
    });
  }

  return div;
}

function saveCard(id, partial) {
  Storage.setProductState(id, partial);
  if ('given'   in partial) updateGlobalProgress();
  if ('allergy' in partial) renderBabyAllergies();
}

// ─── Обновление прогресс-бара категории ─────────────────────────────────────
function updateCategoryProgress(category) {
  const catEl = document.querySelector(`.category-section[data-cat="${CSS.escape(category)}"]`);
  if (!catEl) return;
  const cards = catEl.querySelectorAll('.product-card');
  const total = cards.length;
  const done  = catEl.querySelectorAll('.product-card.given').length;
  const fill  = catEl.querySelector('.progress-fill');
  const text  = catEl.querySelector('.category-progress span');
  if (fill) fill.style.width = total ? `${(done / total) * 100}%` : '0%';
  if (text) text.textContent = `${done}/${total}`;
}

// ─── Рендер всех категорий ───────────────────────────────────────────────────
function renderAllCategories() {
  const root = document.getElementById('categories-root');
  root.innerHTML = '';

  const custom = Storage.getCustomProducts();
  const allProducts = [...DEFAULT_PRODUCTS, ...custom];
  const states = Storage.getAllProductStates();

  // Группировка по категориям с сохранением порядка
  const catOrder = Object.keys(CATEGORY_TITLES);
  const grouped = {};
  allProducts.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  // Вывод: сначала стандартные категории, потом нестандартные
  const cats = [
    ...catOrder.filter(c => grouped[c]),
    ...Object.keys(grouped).filter(c => !catOrder.includes(c)),
  ];

  cats.forEach(category => {
    const products = grouped[category];
    const section = document.createElement('section');
    section.className = 'category-section';
    section.dataset.cat = category;

    const icon = CATEGORY_ICONS[category] || '🍽';
    const activeTheme = localStorage.getItem('app_theme') || 'boy';
    const catTitles = activeTheme === 'girl' ? CATEGORY_TITLES_GIRL : CATEGORY_TITLES;
    const title = catTitles[category] || category;

    section.innerHTML = `
      <h2 class="category-title">
        <span class="cat-icon">${icon}</span>
        <span class="cat-name">${title}</span>
        <div class="category-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
          <span>0/${products.length}</span>
        </div>
        <span class="cat-chevron">▼</span>
      </h2>
      <div class="products-grid"></div>
    `;

    const grid = section.querySelector('.products-grid');
    products.forEach(p => {
      const isCustom = custom.some(c => c.id === p.id);
      const card = renderCard(p, states[p.id] || {}, isCustom);
      grid.appendChild(card);
    });

    root.appendChild(section);
    updateCategoryProgress(category);

    // Свёрнуто по умолчанию
    const titleEl = section.querySelector('.category-title');
    const gridEl  = section.querySelector('.products-grid');
    section.classList.add('collapsed');
    gridEl.style.display = 'none';

    titleEl.addEventListener('click', () => {
      if (section.classList.contains('collapsed')) {
        section.classList.remove('collapsed');
        gridEl.style.display = 'grid';
        gsap.from(gridEl.querySelectorAll('.product-card'), {
          opacity: 0, y: 16, scale: 0.96,
          duration: 0.3, stagger: 0.03,
          ease: 'back.out(1.3)', clearProps: 'all',
        });
      } else {
        gsap.to(gridEl, {
          opacity: 0, duration: 0.15, ease: 'power2.in',
          onComplete: () => {
            gridEl.style.display = 'none';
            section.classList.add('collapsed');
            gsap.set(gridEl, { opacity: 1 });
          },
        });
      }
    });
  });
}

// ─── Анимация появления карточек (GSAP) ─────────────────────────────────────
function animateCards() {
  gsap.from('.product-card', {
    opacity: 0,
    y: 28,
    scale: .95,
    duration: .45,
    stagger: { amount: 1.2, from: 'start' },
    ease: 'back.out(1.3)',
    clearProps: 'all',
  });
}

// ─── Конфетти ────────────────────────────────────────────────────────────────
function triggerConfetti(cardEl) {
  const rect = cardEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top;
  const colors = ['#7CB342','#FFD54F','#4FC3F7','#FF8A65','#9575CD','#EF5350'];

  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    document.body.appendChild(el);

    gsap.to(el, {
      x: (Math.random() - .5) * 180,
      y: -(60 + Math.random() * 100),
      rotation: Math.random() * 720 - 360,
      opacity: 0,
      duration: .8 + Math.random() * .5,
      ease: 'power2.out',
      onComplete: () => el.remove(),
    });
  }
}

// ─── Маскот ──────────────────────────────────────────────────────────────────
function bounceMascot() {
  gsap.to('#mascot', { y: -22, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out' });
}

// ─── Параллакс ───────────────────────────────────────────────────────────────
function initParallax() {
  if (window.matchMedia('(hover: none)').matches) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.parallax-slow').forEach(el => {
      el.style.transform = `translateY(${y * .12}px)`;
    });
    document.querySelectorAll('.parallax-fast').forEach(el => {
      el.style.transform = `translateY(${y * .25}px)`;
    });
  }, { passive: true });
}

// ─── Данные малыша ───────────────────────────────────────────────────────────
function initBabySection() {
  const nameInput  = document.getElementById('baby-name');
  const birthInput = document.getElementById('baby-birth');
  const badge      = document.getElementById('age-badge');
  const ageText    = document.getElementById('age-text');
  const recBanner  = document.getElementById('rec-banner');

  function updateAge() {
    const months = getBabyAgeMonths();
    if (months !== null) {
      const y = Math.floor(months / 12);
      const m = months % 12;
      let txt = '';
      if (y > 0) txt += `${y} г. `;
      txt += `${m} мес.`;
      ageText.textContent = txt;
      badge.classList.remove('hidden');
      renderRecommendations(months);
    } else {
      badge.classList.add('hidden');
      recBanner.classList.remove('visible');
    }
  }

  // Восстановление из Storage
  const saved = Storage.getBaby();
  if (saved.name)      nameInput.value  = saved.name;
  if (saved.birthDate) birthInput.value = saved.birthDate;
  updateAge();

  nameInput.addEventListener('input', () => {
    Storage.setBaby({ ...Storage.getBaby(), name: nameInput.value });
  });

  birthInput.addEventListener('change', () => {
    Storage.setBaby({ ...Storage.getBaby(), birthDate: birthInput.value });
    updateAge();
    // Перестроить карточки (изменить not-yet классы)
    refreshNotYetClasses();
  });
}

function renderRecommendations(months) {
  const recBanner = document.getElementById('rec-banner');
  const recList   = document.getElementById('rec-list');
  const custom    = Storage.getCustomProducts();
  const all       = [...DEFAULT_PRODUCTS, ...custom];
  const states    = Storage.getAllProductStates();

  // Продукты: minAge <= months && minAge > months-1 && ещё не введены
  const fresh = all.filter(p => p.minAge <= months && p.minAge > months - 1 && !states[p.id]?.given);

  if (fresh.length === 0) {
    recBanner.classList.remove('visible');
    return;
  }

  recList.innerHTML = '';
  fresh.forEach(p => {
    const chip = document.createElement('span');
    chip.className = 'rec-chip';
    chip.textContent = `${p.emoji} ${p.name}`;
    chip.title = `Можно вводить с ${p.minAge} мес.`;
    chip.addEventListener('click', () => {
      const cardEl = document.querySelector(`.product-card[data-id="${p.id}"]`);
      if (cardEl) {
        const sectionEl = cardEl.closest('.category-section');
        if (sectionEl && sectionEl.classList.contains('collapsed')) {
          const gridEl = sectionEl.querySelector('.products-grid');
          sectionEl.classList.remove('collapsed');
          gridEl.style.display = 'grid';
        }
        setTimeout(() => cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      }
    });
    recList.appendChild(chip);
  });
  recBanner.classList.add('visible');
}

function refreshNotYetClasses() {
  const months = getBabyAgeMonths();
  const custom = Storage.getCustomProducts();
  const all    = [...DEFAULT_PRODUCTS, ...custom];

  all.forEach(p => {
    const card = document.querySelector(`.product-card[data-id="${p.id}"]`);
    if (!card) return;
    const badge = card.querySelector('.not-yet-badge');
    if (months !== null && p.minAge > months) {
      card.classList.add('not-yet');
      if (badge) badge.style.display = 'block';
    } else {
      card.classList.remove('not-yet');
      if (badge) badge.style.display = 'none';
    }
  });
}

// ─── Табы нижних панелей ─────────────────────────────────────────────────────
function initPanelTabs() {
  document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
    });
  });
}

// ─── Таблица порций ───────────────────────────────────────────────────────────
function renderPortionsTable() {
  const tbody = document.getElementById('portions-body');
  tbody.innerHTML = PORTIONS_TABLE.map(row => `
    <tr>
      <td><strong>${row.age}</strong></td>
      <td>${row.veggie}</td>
      <td>${row.porridge}</td>
      <td>${row.fruit}</td>
      <td>${row.meat}</td>
      <td>${row.fish}</td>
      <td>${row.dairy}</td>
      <td>${row.other}</td>
    </tr>
  `).join('');
}

// ─── Список аллергенов ────────────────────────────────────────────────────────
function renderAllergens() {
  document.getElementById('allergen-list').innerHTML =
    HIGH_ALLERGEN_PRODUCTS.map(a => `
      <li class="allergen-item">
        <span class="allergen-emoji">${a.emoji}</span>
        <div class="allergen-info">
          <strong>${a.name}</strong>
          <span>${a.note}</span>
        </div>
      </li>
    `).join('');
}

// ─── Аллергии малыша (динамически) ───────────────────────────────────────────
function renderBabyAllergies() {
  const states   = Storage.getAllProductStates();
  const custom   = Storage.getCustomProducts();
  const all      = [...DEFAULT_PRODUCTS, ...custom];
  const allergic = all.filter(p => states[p.id]?.allergy);

  const emptyEl = document.getElementById('baby-allergies-empty');
  const listEl  = document.getElementById('baby-allergies-list');
  if (!emptyEl || !listEl) return;

  if (allergic.length === 0) {
    emptyEl.style.display = 'block';
    listEl.innerHTML = '';
    return;
  }

  emptyEl.style.display = 'none';
  listEl.innerHTML = allergic.map(p => `
    <div class="baby-allergy-chip">
      <span class="baby-allergy-emoji">${p.emoji}</span>
      <span class="baby-allergy-name">${p.name}</span>
    </div>
  `).join('');
}

// ─── Общий счётчик прогресса ─────────────────────────────────────────────────
function updateGlobalProgress() {
  const states = Storage.getAllProductStates();
  const custom = Storage.getCustomProducts();
  const all    = [...DEFAULT_PRODUCTS, ...custom];
  const done   = all.filter(p => states[p.id]?.given).length;

  const badge = document.getElementById('global-progress-badge');
  const text  = document.getElementById('global-progress-text');
  if (!badge || !text) return;

  text.textContent = `${done} из ${all.length}`;
  badge.classList.remove('hidden');
}

// ─── Общие заметки ────────────────────────────────────────────────────────────
function initGeneralNotes() {
  const area = document.getElementById('general-notes');
  area.value = Storage.getNotes();
  let timer;
  area.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => Storage.setNotes(area.value), 600);
  });
}

// ─── Экспорт / Импорт ────────────────────────────────────────────────────────
function initIO() {
  document.getElementById('btn-export').addEventListener('click', () => {
    const json = Storage.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `dino-menu-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 Данные экспортированы!');
  });

  document.getElementById('btn-import').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        Storage.importAll(ev.target.result);
        showToast('✅ Данные импортированы! Обновляю…');
        setTimeout(() => location.reload(), 1200);
      } catch {
        showToast('❌ Ошибка: файл повреждён или неверный формат');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('btn-share').addEventListener('click', () => {
    navigator.clipboard.writeText(Storage.exportAll())
      .then(() => showToast('📋 Данные скопированы в буфер обмена!'))
      .catch(() => showToast('❌ Не удалось скопировать'));
  });

  document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('Удалить ВСЕ данные? Это действие необратимо!')) {
      Storage.clearAll();
      showToast('🗑 Данные очищены');
      setTimeout(() => location.reload(), 1000);
    }
  });
}

// ─── Модальное окно ───────────────────────────────────────────────────────────
function initModal() {
  const overlay  = document.getElementById('modal-overlay');
  const openBtn  = document.getElementById('add-product-btn');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn= document.getElementById('modal-cancel');
  const saveBtn  = document.getElementById('modal-save');
  const catSelect= document.getElementById('new-category');
  const newCatGr = document.getElementById('new-cat-group');
  const emojiPicker = document.getElementById('emoji-picker');

  // Пикер эмодзи
  let selectedEmoji = '🥑';
  EMOJI_PICKER_OPTIONS.forEach(em => {
    const span = document.createElement('span');
    span.className = 'emoji-opt' + (em === selectedEmoji ? ' selected' : '');
    span.textContent = em;
    span.addEventListener('click', () => {
      emojiPicker.querySelectorAll('.emoji-opt').forEach(s => s.classList.remove('selected'));
      span.classList.add('selected');
      selectedEmoji = em;
      document.getElementById('new-emoji').value = em;
    });
    emojiPicker.appendChild(span);
  });

  document.getElementById('new-emoji').addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) selectedEmoji = val;
    emojiPicker.querySelectorAll('.emoji-opt').forEach(s => s.classList.remove('selected'));
  });

  catSelect.addEventListener('change', () => {
    newCatGr.style.display = catSelect.value === '__new__' ? 'flex' : 'none';
  });

  function openModal() {
    overlay.classList.add('open');
    document.getElementById('new-name').focus();
  }
  function closeModal() {
    overlay.classList.remove('open');
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

  saveBtn.addEventListener('click', () => {
    const name    = document.getElementById('new-name').value.trim();
    const emoji   = (document.getElementById('new-emoji').value.trim() || selectedEmoji || '🍽');
    let   category = catSelect.value;
    if (category === '__new__') {
      category = document.getElementById('new-cat-name').value.trim() || 'Прочее';
    }
    const minAge  = parseInt(document.getElementById('new-min-age').value) || 6;

    if (!name) {
      showToast('⚠️ Введи название продукта!');
      return;
    }

    const product = { id: generateId(), name, emoji, category, minAge };
    Storage.addCustomProduct(product);
    updateGlobalProgress();

    // Найти или создать секцию категории
    let section = document.querySelector(`.category-section[data-cat="${CSS.escape(category)}"]`);
    if (!section) {
      renderAllCategories();
      gsap.from('.category-section:last-child', { opacity: 0, y: 20, duration: .4 });
    } else {
      const grid = section.querySelector('.products-grid');
      const card = renderCard(product, {}, true);
      grid.appendChild(card);
      // Авторасскрываем раздел, чтобы пользователь увидел новый продукт
      if (section.classList.contains('collapsed')) {
        section.classList.remove('collapsed');
        grid.style.display = 'grid';
      }
      gsap.from(card, { opacity: 0, scale: .85, duration: .4, ease: 'back.out(1.8)' });
      updateCategoryProgress(category);
    }

    // Сбросить форму
    document.getElementById('new-name').value    = '';
    document.getElementById('new-emoji').value   = '';
    document.getElementById('new-cat-name').value = '';
    document.getElementById('new-min-age').value = '6';
    catSelect.value = 'Прочее';
    newCatGr.style.display = 'none';

    closeModal();
    showToast(`🦕 «${name}» добавлен!`);
    bounceMascot();
  });
}

// ─── Поиск продуктов ─────────────────────────────────────────────────────────
function initSearch() {
  const input      = document.getElementById('search-input');
  const results    = document.getElementById('search-results');
  const filterWrap = document.getElementById('search-filter');
  const filterChk  = document.getElementById('search-filter-new');

  let lastMatched = [];
  let lastIsAge   = false;

  function renderSearchResults() {
    results.innerHTML = '';
    const states  = Storage.getAllProductStates();
    const visible = filterChk.checked
      ? lastMatched.filter(p => !states[p.id]?.given)
      : lastMatched;

    visible.slice(0, 30).forEach(p => {
      const chip = document.createElement('span');
      chip.className = 'search-chip';
      chip.textContent = `${p.emoji} ${p.name}`;
      if (lastIsAge) chip.title = `Можно с ${p.minAge} мес.`;

      chip.addEventListener('click', () => {
        const cardEl = document.querySelector(`.product-card[data-id="${p.id}"]`);
        if (!cardEl) return;
        const sectionEl = cardEl.closest('.category-section');
        if (sectionEl && sectionEl.classList.contains('collapsed')) {
          const gridEl = sectionEl.querySelector('.products-grid');
          sectionEl.classList.remove('collapsed');
          gridEl.style.display = 'grid';
          gsap.from(gridEl.querySelectorAll('.product-card'), {
            opacity: 0, y: 16, scale: 0.96,
            duration: 0.3, stagger: 0.03, ease: 'back.out(1.3)', clearProps: 'all',
          });
        }
        setTimeout(() => cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
        gsap.fromTo(cardEl, { outline: '3px solid #4FC3F7' }, { outline: '3px solid transparent', duration: 1.5, delay: 0.3 });
      });

      results.appendChild(chip);
    });
  }

  input.addEventListener('input', () => {
    const q = input.value.trim();
    results.innerHTML = '';

    if (!q) {
      filterWrap.classList.remove('visible');
      lastMatched = [];
      return;
    }

    const custom   = Storage.getCustomProducts();
    const all      = [...DEFAULT_PRODUCTS, ...custom];
    const ageQuery = parseInt(q, 10);
    lastIsAge      = !isNaN(ageQuery) && /^\d+$/.test(q);

    lastMatched = all.filter(p =>
      lastIsAge ? p.minAge <= ageQuery : p.name.toLowerCase().includes(q.toLowerCase())
    );

    filterWrap.classList.toggle('visible', lastMatched.length > 0);
    renderSearchResults();
  });

  filterChk.addEventListener('change', renderSearchResults);
}

// ─── Приветственное окно ─────────────────────────────────────────────────────
function initWelcomeModal() {
  const overlay  = document.getElementById('welcome-overlay');
  const noShow   = document.getElementById('welcome-no-show');
  const closeBtn = document.getElementById('welcome-close-btn');

  closeBtn.addEventListener('click', () => {
    if (noShow.checked) {
      localStorage.setItem('dino_welcome_seen', '1');
    }
    overlay.classList.remove('open');
  });
}

function initGenderSelect() {
  const savedTheme = localStorage.getItem('app_theme');
  if (savedTheme) {
    applyTheme(savedTheme);
    if (!localStorage.getItem('dino_welcome_seen')) {
      document.getElementById('welcome-overlay').classList.add('open');
    }
    return;
  }
  openGenderSelect(() => {
    if (!localStorage.getItem('dino_welcome_seen')) {
      document.getElementById('welcome-overlay').classList.add('open');
    }
  });
}

// ─── Маскот — кликабельное приветствие ───────────────────────────────────────
function initMascot() {
  const mascot = document.getElementById('mascot');
  let idx = 0;
  mascot.addEventListener('click', () => {
    const theme = localStorage.getItem('app_theme') || 'boy';
    const greets = THEMES[theme].mascotGreets;
    showToast(greets[idx % greets.length]);
    idx++;
    bounceMascot();
  });

  // Начальная анимация
  gsap.from('#mascot', { opacity: 0, scale: 0, duration: .6, delay: .8, ease: 'back.out(2)' });
}

// ─── Анимация Hero ────────────────────────────────────────────────────────────
function animateHero() {
  gsap.from('.planet-wrap', { scale: .5, opacity: 0, duration: .9, ease: 'back.out(1.5)' });
  gsap.from('.hero-title',  { y: -30, opacity: 0, duration: .7, delay: .3, ease: 'power3.out' });
  gsap.from('.hero-subtitle',{ y: -20, opacity: 0, duration: .6, delay: .5 });
  gsap.from('.baby-section',  { y: 30, opacity: 0, duration: .6, delay: .6 });
}

// ─── GSAP ScrollTrigger для карточек ─────────────────────────────────────────
function initScrollAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.category-section').forEach((section, i) => {
    gsap.from(section.querySelectorAll('.product-card'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 24,
      scale: .95,
      duration: .4,
      stagger: .04,
      ease: 'back.out(1.3)',
      clearProps: 'all',
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// ИНИЦИАЛИЗАЦИЯ
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initGenderSelect();
  renderAllCategories();
  initBabySection();
  renderPortionsTable();
  renderAllergens();
  renderBabyAllergies();
  updateGlobalProgress();
  initGeneralNotes();
  initPanelTabs();
  initIO();
  initModal();
  initSearch();
  initWelcomeModal();
  initMascot();
  initParallax();
  animateHero();

  document.getElementById('btn-change-theme').addEventListener('click', () => openGenderSelect());

  // ScrollTrigger отключён: разделы свёрнуты по умолчанию, анимация при раскрытии
  // setTimeout(initScrollAnimations, 100);
});
