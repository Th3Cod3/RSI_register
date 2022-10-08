const NL_months = {
  "1": "januari",
  "2": "februari",
  "3": "maart",
  "4": "april",
  "5": "mei",
  "6": "juni",
  "7": "juli",
  "8": "augustus",
  "9": "september",
  "10": "oktober",
  "11": "november",
  "12": "december"
};

const NL_months_short = {
  "1": "jan",
  "2": "feb",
  "3": "mrt",
  "4": "apr",
  "5": "mei",
  "6": "jun",
  "7": "jul",
  "8": "aug",
  "9": "sep",
  "10": "okt",
  "11": "nov",
  "12": "dec"
};

const NL_days = { // eslint-disable-line
  "1": "maandag",
  "2": "dinsdag",
  "3": "woensdag",
  "4": "donderdag",
  "5": "vrijdag",
  "6": "zaterdag",
  "7": "zondag"
};

const validDate = date => {
  return !(
    !date ||
    date === "0000-00-00" ||
    date === "0000-00-00 00:00:00" ||
    date === ""
  );
};

const NL_date = (date, monthFormat = "s", dayFormat = "s", time = false) => {
  if (!validDate(date)) {
    return "";
  }
  let textDate = "";
  let day = parseInt(date.match(/-(\d*)[ :\d]*$/)[1]);
  let month = parseInt(date.match(/-(\d*)-/)[1]);
  let year = parseInt(date.match(/^(\d*)-/)[1]);

  switch (dayFormat) {
    case "s":
    case "l":
      textDate += `${day}`;
      break;
  }

  switch (monthFormat) {
    case "s":
      textDate += ` ${NL_months_short[month]}`;
      break;

    case "l":
      textDate += ` ${NL_months[month]}`;
      break;
  }

  textDate += ` ${year}`;

  if (time) {
    let time = date.match(/\d\d:\d\d:\d\d/)[0];
    textDate += ` ${time}`;
  }
  return textDate;
};

export { NL_date };
