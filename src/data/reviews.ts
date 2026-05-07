export type Review = {
  id: string
  companyId: string
  companyName: string
  companyCity: string
  author: string
  rating: number
  date: string // ISO
  text: string
}

export const reviews: Review[] = [
  {
    id: 'r1',
    companyId: '1',
    companyName: 'Сандуновские бани',
    companyCity: 'Москва',
    author: 'Алексей П.',
    rating: 5,
    date: '2026-04-28',
    text: 'Историческая атмосфера, отличная парная и квалифицированные банщики. Цены выше среднего, но того стоит.',
  },
  {
    id: 'r2',
    companyId: '6',
    companyName: 'Краснопресненские бани',
    companyCity: 'Москва',
    author: 'Ирина С.',
    rating: 5,
    date: '2026-04-25',
    text: 'Шикарный бассейн и СПА, ходим всей семьёй уже несколько лет. Рекомендую женский разряд по выходным.',
  },
  {
    id: 'r3',
    companyId: '8',
    companyName: 'Неклюдовские бани',
    companyCity: 'Санкт-Петербург',
    author: 'Дмитрий В.',
    rating: 4,
    date: '2026-04-20',
    text: 'Приличная парная, чистый бассейн. Минус — иногда людно по вечерам, бронируйте заранее.',
  },
  {
    id: 'r4',
    companyId: '10',
    companyName: 'Уральская баня',
    companyCity: 'Екатеринбург',
    author: 'Сергей М.',
    rating: 5,
    date: '2026-04-18',
    text: 'Настоящая дровяная баня, пар мягкий и густой. Купель с холодной водой — то, что нужно после парилки.',
  },
  {
    id: 'r5',
    companyId: '2',
    companyName: 'Селезнёвские бани',
    companyCity: 'Москва',
    author: 'Ольга К.',
    rating: 4,
    date: '2026-04-15',
    text: 'Хорошее соотношение цена/качество. Брали VIP-зал на компанию — всё понравилось.',
  },
  {
    id: 'r6',
    companyId: '5',
    companyName: 'Ямские бани',
    companyCity: 'Москва',
    author: 'Михаил Т.',
    rating: 5,
    date: '2026-04-10',
    text: 'Великолепный хамам, опытный банщик. Атмосфера старинной бани сохранена идеально.',
  },
  {
    id: 'r7',
    companyId: '4',
    companyName: 'Варшавские бани',
    companyCity: 'Москва',
    author: 'Андрей Л.',
    rating: 3,
    date: '2026-04-05',
    text: 'Бюджетный вариант. Парная нормальная, но раздевалки стоит обновить.',
  },
  {
    id: 'r8',
    companyId: '1',
    companyName: 'Сандуновские бани',
    companyCity: 'Москва',
    author: 'Виктория Н.',
    rating: 5,
    date: '2026-04-02',
    text: 'Лучшая баня в Москве. Приходим с подругами раз в месяц как на праздник.',
  },
]
