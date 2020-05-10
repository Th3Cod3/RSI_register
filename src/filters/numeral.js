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
    symbol: "Afl. "
  }
});

numeral.locale("aw");

const dollarFilter = function(value) {
  if (!value) {
    return "Afl. 0.00";
  }

  return numeral(value).format("$0.00");
};

export { dollarFilter };
