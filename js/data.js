'use strict';

const DEFAULT_PRODUCTS = [
  // ── Овощи ──────────────────────────────────────────────
  { id: 'zucchini',         name: 'Кабачок',                 emoji: '🥒', category: 'Овощи',    minAge: 4  },
  { id: 'courgette',        name: 'Цукини',                  emoji: '🥒', category: 'Овощи',    minAge: 4  },
  { id: 'cauliflower',      name: 'Цветная капуста',          emoji: '🌸', category: 'Овощи',    minAge: 4  },
  { id: 'brussels-sprouts', name: 'Капуста брюссельская',     emoji: '🥦', category: 'Овощи',    minAge: 4  },
  { id: 'broccoli',         name: 'Брокколи',                 emoji: '🥦', category: 'Овощи',    minAge: 5  },
  { id: 'pumpkin',          name: 'Тыква',                    emoji: '🎃', category: 'Овощи',    minAge: 5  },
  { id: 'carrot',           name: 'Морковь',                  emoji: '🥕', category: 'Овощи',    minAge: 6  },
  { id: 'potato',           name: 'Картофель',                emoji: '🥔', category: 'Овощи',    minAge: 6  },
  { id: 'eggplant',         name: 'Баклажан',                 emoji: '🍆', category: 'Овощи',    minAge: 8  },
  { id: 'green-beans',      name: 'Зелёная фасоль',           emoji: '🌿', category: 'Овощи',    minAge: 8  },
  { id: 'green-peas',       name: 'Зелёный горошек',          emoji: '🟢', category: 'Овощи',    minAge: 8  },
  { id: 'cabbage',          name: 'Капуста белокочанная',     emoji: '🥬', category: 'Овощи',    minAge: 8  },
  { id: 'bell-pepper',      name: 'Перец',                    emoji: '🌶️', category: 'Овощи',    minAge: 8  },
  { id: 'beet',             name: 'Свёкла',                   emoji: '🟣', category: 'Овощи',    minAge: 8  },
  { id: 'tomato',           name: 'Помидор',                  emoji: '🍅', category: 'Овощи',    minAge: 8  },
  { id: 'dill',             name: 'Укроп',                    emoji: '🌿', category: 'Овощи',    minAge: 8  },
  { id: 'spinach',          name: 'Шпинат',                   emoji: '🥬', category: 'Овощи',    minAge: 8  },
  { id: 'corn-veg',         name: 'Кукуруза',                 emoji: '🌽', category: 'Овощи',    minAge: 12 },
  { id: 'onion',            name: 'Лук',                      emoji: '🧅', category: 'Овощи',    minAge: 12 },
  { id: 'cucumber',         name: 'Огурец',                   emoji: '🥒', category: 'Овощи',    minAge: 12 },
  { id: 'radish',           name: 'Редис',                    emoji: '🔴', category: 'Овощи',    minAge: 12 },
  { id: 'celery',           name: 'Сельдерей',                emoji: '🌿', category: 'Овощи',    minAge: 12 },

  // ── Каши ───────────────────────────────────────────────
  { id: 'buckwheat',        name: 'Гречневая каша',           emoji: '🌾', category: 'Каши',     minAge: 5  },
  { id: 'rice',             name: 'Рисовая каша',             emoji: '🍚', category: 'Каши',     minAge: 5  },
  { id: 'corn',             name: 'Кукурузная каша',          emoji: '🌽', category: 'Каши',     minAge: 6  },
  { id: 'oats',             name: 'Овсяная каша',             emoji: '🌿', category: 'Каши',     minAge: 7  },
  { id: 'wheat',            name: 'Пшеничная каша',           emoji: '🌾', category: 'Каши',     minAge: 8  },
  { id: 'millet',           name: 'Пшено',                    emoji: '🌾', category: 'Каши',     minAge: 8  },
  { id: 'bread-wholegrain', name: 'Хлеб ц/з',                emoji: '🍞', category: 'Каши',     minAge: 8  },
  { id: 'barley',           name: 'Ячмень',                   emoji: '🌾', category: 'Каши',     minAge: 8  },
  { id: 'bulgur',           name: 'Булгур',                   emoji: '🌾', category: 'Каши',     minAge: 12 },
  { id: 'couscous',         name: 'Кускус',                   emoji: '🌾', category: 'Каши',     minAge: 12 },
  { id: 'pasta',            name: 'Макароны',                  emoji: '🍝', category: 'Каши',     minAge: 12 },
  { id: 'semolina',         name: 'Манная каша',              emoji: '🥣', category: 'Каши',     minAge: 12 },
  { id: 'beans',            name: 'Фасоль',                   emoji: '🌰', category: 'Каши',     minAge: 12 },
  { id: 'bread-rye',        name: 'Хлеб ржаной',              emoji: '🍞', category: 'Каши',     minAge: 12 },

  // ── Фрукты ─────────────────────────────────────────────
  { id: 'prune',            name: 'Чернослив',                emoji: '🍇', category: 'Фрукты',   minAge: 4  },
  { id: 'apple',            name: 'Яблоко',                   emoji: '🍎', category: 'Фрукты',   minAge: 6  },
  { id: 'pear',             name: 'Груша',                    emoji: '🍐', category: 'Фрукты',   minAge: 6  },
  { id: 'banana',           name: 'Банан',                    emoji: '🍌', category: 'Фрукты',   minAge: 7  },
  { id: 'peach',            name: 'Персик',                   emoji: '🍑', category: 'Фрукты',   minAge: 7  },
  { id: 'apricot',          name: 'Абрикос',                  emoji: '🟠', category: 'Фрукты',   minAge: 7  },
  { id: 'plum',             name: 'Слива',                    emoji: '🍇', category: 'Фрукты',   minAge: 8  },
  { id: 'cherry',           name: 'Вишня/Черешня',            emoji: '🍒', category: 'Фрукты',   minAge: 9  },
  { id: 'wild-strawberry',  name: 'Земляника',                emoji: '🍓', category: 'Фрукты',   minAge: 9  },
  { id: 'strawberry',       name: 'Клубника',                 emoji: '🍓', category: 'Фрукты',   minAge: 9  },
  { id: 'nectarine',        name: 'Нектарин',                 emoji: '🍑', category: 'Фрукты',   minAge: 9  },
  { id: 'currant',          name: 'Смородина',                emoji: '🍒', category: 'Фрукты',   minAge: 9  },
  { id: 'pineapple',        name: 'Ананас',                   emoji: '🍍', category: 'Фрукты',   minAge: 12 },
  { id: 'orange',           name: 'Апельсин',                 emoji: '🍊', category: 'Фрукты',   minAge: 12 },
  { id: 'watermelon',       name: 'Арбуз',                    emoji: '🍉', category: 'Фрукты',   minAge: 12 },
  { id: 'lingonberry',      name: 'Брусника',                 emoji: '🍒', category: 'Фрукты',   minAge: 12 },
  { id: 'grape',            name: 'Виноград',                 emoji: '🍇', category: 'Фрукты',   minAge: 12 },
  { id: 'blueberry',        name: 'Голубика',                 emoji: '🍇', category: 'Фрукты',   minAge: 12 },
  { id: 'pomegranate',      name: 'Гранат',                   emoji: '🔴', category: 'Фрукты',   minAge: 12 },
  { id: 'grapefruit',       name: 'Грейпфрут',                emoji: '🍊', category: 'Фрукты',   minAge: 12 },
  { id: 'melon',            name: 'Дыня',                     emoji: '🍈', category: 'Фрукты',   minAge: 12 },
  { id: 'blackberry',       name: 'Ежевика',                  emoji: '🍇', category: 'Фрукты',   minAge: 12 },
  { id: 'kiwi',             name: 'Киви',                     emoji: '🥝', category: 'Фрукты',   minAge: 12 },
  { id: 'cranberry',        name: 'Клюква',                   emoji: '🍒', category: 'Фрукты',   minAge: 12 },
  { id: 'gooseberry',       name: 'Крыжовник',                emoji: '🍈', category: 'Фрукты',   minAge: 12 },
  { id: 'lemon',            name: 'Лимон',                    emoji: '🍋', category: 'Фрукты',   minAge: 12 },
  { id: 'raspberry',        name: 'Малина',                   emoji: '🍓', category: 'Фрукты',   minAge: 12 },
  { id: 'mandarin',         name: 'Мандарин',                 emoji: '🍊', category: 'Фрукты',   minAge: 12 },
  { id: 'persimmon',        name: 'Хурма',                    emoji: '🟠', category: 'Фрукты',   minAge: 12 },
  { id: 'mango',            name: 'Манго',                    emoji: '🥭', category: 'Фрукты',   minAge: 12 },
  { id: 'bilberry',         name: 'Черника',                  emoji: '🍇', category: 'Фрукты',   minAge: 12 },

  // ── Мясо ───────────────────────────────────────────────
  { id: 'turkey',           name: 'Индейка',                  emoji: '🦃', category: 'Мясо',     minAge: 7  },
  { id: 'rabbit',           name: 'Кролик',                   emoji: '🐰', category: 'Мясо',     minAge: 7  },
  { id: 'chicken',          name: 'Курица',                   emoji: '🍗', category: 'Мясо',     minAge: 7  },
  { id: 'beef',             name: 'Говядина',                 emoji: '🥩', category: 'Мясо',     minAge: 8  },
  { id: 'veal',             name: 'Телятина',                 emoji: '🥩', category: 'Мясо',     minAge: 8  },
  { id: 'duck',             name: 'Утка',                     emoji: '🦆', category: 'Мясо',     minAge: 8  },
  { id: 'beef-liver',       name: 'Печень говяжья',           emoji: '🥩', category: 'Мясо',     minAge: 8  },
  { id: 'lamb',             name: 'Баранина',                 emoji: '🐑', category: 'Мясо',     minAge: 12 },
  { id: 'pork',             name: 'Свинина',                  emoji: '🐷', category: 'Мясо',     minAge: 12 },

  // ── Рыба ───────────────────────────────────────────────
  { id: 'white-fish',       name: 'Белая рыба (хек, минтай)', emoji: '🐟', category: 'Рыба',     minAge: 9  },
  { id: 'salmon',           name: 'Лосось',                   emoji: '🐠', category: 'Рыба',     minAge: 12 },
  { id: 'seafood',          name: 'Морепродукты',             emoji: '🦐', category: 'Рыба',     minAge: 12 },

  // ── Молочное ───────────────────────────────────────────
  { id: 'cottage',          name: 'Творог',                   emoji: '🧀', category: 'Молочное', minAge: 8  },
  { id: 'kefir',            name: 'Кефир',                    emoji: '🥛', category: 'Молочное', minAge: 8  },
  { id: 'yogurt',           name: 'Йогурт',                   emoji: '🥛', category: 'Молочное', minAge: 8  },
  { id: 'cheese',           name: 'Сыр',                      emoji: '🧀', category: 'Молочное', minAge: 10 },
  { id: 'milk',             name: 'Молоко',                   emoji: '🥛', category: 'Молочное', minAge: 12 },
  { id: 'sour-cream',       name: 'Сметана',                  emoji: '🥛', category: 'Молочное', minAge: 12 },

  // ── Жиры ───────────────────────────────────────────────
  { id: 'butter',           name: 'Сливочное масло',          emoji: '🧈', category: 'Жиры',     minAge: 5  },
  { id: 'veg-oil',          name: 'Растительное масло',       emoji: '🌻', category: 'Жиры',     minAge: 5  },
  { id: 'avocado',          name: 'Авокадо',                  emoji: '🥑', category: 'Жиры',     minAge: 6  },
  { id: 'peanut',           name: 'Арахис',                   emoji: '🥜', category: 'Жиры',     minAge: 10 },
  { id: 'walnut',           name: 'Грецкий орех',             emoji: '🌰', category: 'Жиры',     minAge: 10 },
  { id: 'cashew',           name: 'Кешью',                    emoji: '🌰', category: 'Жиры',     minAge: 10 },
  { id: 'sesame',           name: 'Кунжут',                   emoji: '🌾', category: 'Жиры',     minAge: 10 },
  { id: 'almond',           name: 'Миндаль',                  emoji: '🌰', category: 'Жиры',     minAge: 10 },
  { id: 'olives',           name: 'Оливки',                   emoji: '🌿', category: 'Жиры',     minAge: 10 },
  { id: 'sunflower-seeds',  name: 'Семена подсолнечные',      emoji: '🌻', category: 'Жиры',     minAge: 10 },
  { id: 'pumpkin-seeds',    name: 'Семена тыквенные',         emoji: '🎃', category: 'Жиры',     minAge: 10 },
  { id: 'pistachio',        name: 'Фисташки',                 emoji: '🌰', category: 'Жиры',     minAge: 10 },
  { id: 'hazelnut',         name: 'Фундук',                   emoji: '🌰', category: 'Жиры',     minAge: 10 },

  // ── Прочее ─────────────────────────────────────────────
  { id: 'yolk',             name: 'Желток',                   emoji: '🥚', category: 'Прочее',   minAge: 7  },
  { id: 'bread',            name: 'Хлеб/Сухарик',            emoji: '🍞', category: 'Прочее',   minAge: 7  },
  { id: 'egg-white',        name: 'Яйцо (белок)',             emoji: '🥚', category: 'Прочее',   minAge: 12 },
  { id: 'mushroom',         name: 'Грибы',                    emoji: '🍄', category: 'Прочее',   minAge: 12 },
  { id: 'legumes',          name: 'Бобовые',                  emoji: '🌱', category: 'Прочее',   minAge: 12 },
  { id: 'soy',              name: 'Соя',                      emoji: '🌱', category: 'Прочее',   minAge: 12 },
  { id: 'mustard',          name: 'Горчица',                  emoji: '🌼', category: 'Прочее',   minAge: 12 },
];

const CATEGORY_ICONS = {
  'Овощи':    '🥦',
  'Каши':     '🥣',
  'Фрукты':   '🍎',
  'Мясо':     '🥩',
  'Рыба':     '🐟',
  'Молочное': '🧀',
  'Жиры':     '🥑',
  'Прочее':   '🥚',
};

const CATEGORY_TITLES = {
  'Овощи':    'Динозаврики-овощи',
  'Каши':     'Каши-астероиды',
  'Фрукты':   'Фруктовые джунгли',
  'Мясо':     'Мясные тираннозавры',
  'Рыба':     'Морские плезиозавры',
  'Молочное': 'Молочные птеродактили',
  'Жиры':     'Жирные велоцирапторы',
  'Прочее':   'Секретные яйца динозавра',
};

const CATEGORY_TITLES_GIRL = {
  'Овощи':    'Волшебный огород',
  'Каши':     'Королевские каши',
  'Фрукты':   'Фруктовый сад',
  'Мясо':     'Мясной пир принцессы',
  'Рыба':     'Дары морей',
  'Молочное': 'Молочная нежность',
  'Жиры':     'Полезные жирки',
  'Прочее':   'Тайная кладовая',
};

// Таблица рекомендуемых порций по месяцам
const PORTIONS_TABLE = [
  { age: '4–5 мес.',  veggie: '5–150 г',  porridge: '—',        fruit: '—',        meat: '—',     fish: '—',     dairy: '—',        other: 'Масло: 1–3 г' },
  { age: '5–6 мес.',  veggie: '150–200 г', porridge: '50–150 г', fruit: '5–50 г',   meat: '—',     fish: '—',     dairy: '—',        other: 'Масло: 3–5 г' },
  { age: '6–7 мес.',  veggie: '150–200 г', porridge: '150 г',    fruit: '60 г',     meat: '5–30 г', fish: '—',    dairy: '10–30 г',  other: 'Масло: 5 г' },
  { age: '7–8 мес.',  veggie: '170 г',     porridge: '150 г',    fruit: '70 г',     meat: '30–50 г', fish: '—',   dairy: '30–40 г',  other: 'Желток: ¼ шт' },
  { age: '8–9 мес.',  veggie: '180 г',     porridge: '180 г',    fruit: '80 г',     meat: '50–60 г', fish: '—',   dairy: '40–50 г',  other: 'Желток: ½ шт' },
  { age: '9–10 мес.', veggie: '200 г',     porridge: '200 г',    fruit: '80–90 г',  meat: '60–70 г', fish: '30–60 г', dairy: '200 мл', other: 'Желток: ½–1 шт' },
  { age: '10–12 мес.',veggie: '200 г',     porridge: '200 г',    fruit: '90–100 г', meat: '70–80 г', fish: '60 г', dairy: '200–300 мл', other: 'Желток: 1 шт' },
];

// Высокоаллергенные продукты
const HIGH_ALLERGEN_PRODUCTS = [
  { emoji: '🥛', name: 'Коровье молоко',     note: 'Один из самых частых аллергенов у детей' },
  { emoji: '🥚', name: 'Яйца',               note: 'Особенно белок; желток вводят раньше' },
  { emoji: '🌾', name: 'Глютен',             note: 'Пшеница, рожь, ячмень, овёс' },
  { emoji: '🐟', name: 'Рыба и морепродукты', note: 'Вводить осторожно, после 9 мес.' },
  { emoji: '🥜', name: 'Арахис и орехи',     note: 'Не давать до 1 года без показаний' },
  { emoji: '🍓', name: 'Клубника / малина',   note: 'Ярко-красные ягоды — отложить до 1 года' },
  { emoji: '🍊', name: 'Цитрусовые',          note: 'Апельсин, мандарин, лимон — до 1 года осторожно' },
  { emoji: '🍫', name: 'Шоколад / какао',    note: 'До 3 лет не рекомендуется' },
  { emoji: '🍯', name: 'Мёд',                note: 'До 1 года строго запрещён (клостридии)' },
  { emoji: '🧂', name: 'Соль и сахар',       note: 'До 1 года не добавлять в пищу' },
];
