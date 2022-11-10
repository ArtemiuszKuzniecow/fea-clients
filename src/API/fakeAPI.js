export const leadsData = [
  {
    id: "laval",
    company: "Лаваль",
    manager: "Сергей",
    directions: "Европа",
    city: "Москва",
    sphere: "сантехника",
    contractType: "Прямой Контракт",
    containersTypes: "Авто",
    contacts: {
      website: "http://www.marvell.ru/",
      email: "logist@laval.ru",
      phone: "8(495)9505053 8(495)6624666",
    },
    comments: [
      {
        value:
          "Актуального ничего нет, будет актуально только в январе-феврале, тогда и прозвонить.",
        date: "02.11.2022",
      },
      {
        value:
          "пока что нет актуальных поставок, договорились созвониться в феврале, возят несистемитически",
        date: "02.03.2022",
      },
    ],
    isRequested: false,
  },

  {
    id: "posuda-mechta",
    company: "Посуда-мечта",
    manager: "Александра",
    directions: "Европа",
    city: "Москва",
    sphere: "посуда",
    contractType: "Прямой контракт",
    containersTypes: "Авто",
    contacts: {
      website: "https://posudamechta.ru/",
      email: "cccp1979@mail.ru",
      phone: "8(495)1855620 8(950)2568000",
    },
    comments: [
      {
        value:
          "Скинули запрос на неактуальный груз. Фарфор. Считаем. Дорого. Позвонить на мобильный. Нет ответа",
        date: "20.01.2020",
      },
      {
        value:
          "дозвонился, на данный момент нет больших поставок, возможно что-то будет к концу года",
        date: "20.08.2021",
      },
      { value: "не возят теперь", date: "25.10.2021" },
    ],
    isRequested: false,
  },

  {
    id: "electromax",
    company: "Электромакс",
    manager: "Константин, Виталий Сухин",
    directions: "Китай",
    city: "Санкт-Петербург",
    sphere: "шпунты",
    contractType: "Прямой контракт",
    containersTypes: "Авто",
    contacts: {
      website: "http://www.electromax.spb.ru/",
      email: "sale@electromax.spb.ru",
      phone: "8(812)3364353 8(931)9761245",
    },
    comments: [
      {
        value:
          "Работает на госзакупках, поэтому с нами работать не будет. Возможно, будет вариант работать с нами, прозванивать раз в три месяца. Всегда присылать расписаную ставку.",
        date: "20.04.2020",
      },
    ],
    isRequested: false,
  },
];

export const orders = [
  {
    clientId: "electromax",

    fixedCargoData: {
      incoterms: "FOB",
      containersTypes: "Контейнерная перевозка",
      contractType: "Прямой Контракт",
      transshipment: "yes",
      hazard: "no",
      temperature: "no",
    },

    cargoData: {
      pickupAddress: "Ningbo, China",
      typeOfCargo: "Фрейзерный станок",
      hsCode: "16132130468",
      weight: "20 000 kgs",
      volume: "20'",
      package: "pallets",
      special: "Обрешётка",
      customs: "Saint-Petersburg",
      deliveryAddress: "Saint-Petersburg",
      pickupDate: "01/04/2022",
      howOften: "Постоянно",
      addition: "нет",
    },

    prices: {
      ourPrice: [{ value: "$20 000", date: "15.01.2022" }],
      clientsPrice: [{ value: "$19 000", date: "15.01.2022" }],
    },
  },
];

const fetchAllLeads = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(leadsData);
    }, 2000);
  });
const fetchAllRequests = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(orders);
    }, 2000);
  });

export default {
  fetchAllLeads,
  fetchAllRequests,
};
