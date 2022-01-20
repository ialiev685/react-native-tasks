export const NormalizeDate = () => {
  const date = new Date();
  const ruWeeks = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  const minute =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

  const normalizeDate = `${day} ${ruWeeks[month]}, ${year} | ${hour}:${minute}`;
  return normalizeDate;
};
