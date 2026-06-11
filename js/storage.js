'use strict';

const KEYS = {
  BABY:     'dino_baby',
  PRODUCTS: 'dino_products',
  CUSTOM:   'dino_custom',
  NOTES:    'dino_notes',
};

const Storage = {
  // ─── Малыш ──────────────────────────────────────────────────────────────
  getBaby() {
    try { return JSON.parse(localStorage.getItem(KEYS.BABY)) || {}; }
    catch { return {}; }
  },
  setBaby(data) {
    localStorage.setItem(KEYS.BABY, JSON.stringify(data));
  },

  // ─── Состояния продуктов ─────────────────────────────────────────────────
  getAllProductStates() {
    try { return JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || {}; }
    catch { return {}; }
  },
  getProductState(id) {
    return this.getAllProductStates()[id] || {};
  },
  setProductState(id, state) {
    const all = this.getAllProductStates();
    all[id] = { ...all[id], ...state };
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(all));
  },

  // ─── Кастомные продукты ──────────────────────────────────────────────────
  getCustomProducts() {
    try { return JSON.parse(localStorage.getItem(KEYS.CUSTOM)) || []; }
    catch { return []; }
  },
  addCustomProduct(product) {
    const list = this.getCustomProducts();
    list.push(product);
    localStorage.setItem(KEYS.CUSTOM, JSON.stringify(list));
  },
  removeCustomProduct(id) {
    const list = this.getCustomProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.CUSTOM, JSON.stringify(list));
  },

  // ─── Заметки ─────────────────────────────────────────────────────────────
  getNotes() {
    return localStorage.getItem(KEYS.NOTES) || '';
  },
  setNotes(text) {
    localStorage.setItem(KEYS.NOTES, text);
  },

  // ─── Экспорт / Импорт ────────────────────────────────────────────────────
  exportAll() {
    return JSON.stringify({
      version: 1,
      baby:     this.getBaby(),
      products: this.getAllProductStates(),
      custom:   this.getCustomProducts(),
      notes:    this.getNotes(),
    }, null, 2);
  },
  importAll(jsonString) {
    const data = JSON.parse(jsonString);
    if (data.baby)     localStorage.setItem(KEYS.BABY,     JSON.stringify(data.baby));
    if (data.products) localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(data.products));
    if (data.custom)   localStorage.setItem(KEYS.CUSTOM,   JSON.stringify(data.custom));
    if (data.notes !== undefined) localStorage.setItem(KEYS.NOTES, data.notes);
  },

  // ─── Полная очистка ──────────────────────────────────────────────────────
  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  },
};
