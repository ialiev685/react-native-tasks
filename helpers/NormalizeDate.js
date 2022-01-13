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

  const day = date.getDate() > 9 ? "0" + date.getDate() : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours() > 9 ? "0" + date.getHours() : date.getHours();
  const minute =
    date.getMinutes() > 9 ? "0" + date.getMinutes() : date.getMinutes();

  const normalizeDate = `${day} ${ruWeeks[month]}, ${year} | ${hour}:${minute}`;
  return normalizeDate;
};
