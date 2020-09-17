function maybeAddStartingZero (obj) {
  const str = obj.toString();
  if (str.length === 1) {
    return '0' + str;
  }
  return str;
}

export function dateToStrHour(date) {
  const fullDate = new Date(date);
  const hours = fullDate.getHours();
  const minutes = fullDate.getMinutes();
  return hours.toString() + ':' + maybeAddStartingZero(minutes);
};

export function dateToStrDate(date) {
  const fullDate = new Date(date);
  const day = maybeAddStartingZero(fullDate.getDate());
  const month = maybeAddStartingZero(fullDate.getMonth() + 1);
  const year = fullDate.getFullYear().toString();
  return day + '/' + month + '/' + (year.slice(0, 2)).toString();
};

export function maybeGetFullStrDate(rawDate) {
  let time = rawDate.time.isSet? dateToStrHour(rawDate.time.value) : null;
  let date = rawDate.date.isSet? dateToStrDate(rawDate.date.value) : null;
  return {eventTime: time, eventDate: date}
}