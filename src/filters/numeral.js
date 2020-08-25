import numeral from "numeral";

numeral.register("locale", "aw", {
  delimiters: {
    thousands: ",",
    decimal: "."
  },
  abbreviations: {
    thousand: "k",
    million: "m",
    billion: "b",
    trillion: "t"
  },
  ordinal: function(number) {
    return number === 1 ? "st" : "de";
  },
  currency: {
    symbol: "Afl."
  }
});

numeral.locale("aw");

const dollarFilter = function(value) {
  if (!value) {
    return numeral(0).format("0.00 $");
  }

  return numeral(value).format("0.00 $");
};

const dollarRoundFilter = function(value) {
  if (!value) {
    return numeral(0).format("0.00 $");
  } else {
    value = Number(value);
  }
  let complement = value % 0.05;
  if (complement > 0.025) {
    value += 0.05 - complement;
  } else {
    value -= complement;
  }

  return numeral(value).format("0.00 $");
};

const roundFilter = function(value) {
  if (!value) {
    return numeral(0).format("0,0.0");
  }

  return numeral(value).format("0,0.0");
};

export { dollarFilter, dollarRoundFilter, roundFilter };
